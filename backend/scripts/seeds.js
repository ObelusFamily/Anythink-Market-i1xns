require("dotenv").config();
require("../models/User");
require("../models/Item");
require("../models/Comment");
require("../config/passport");

const mongoose = require("mongoose");
const { faker } = require("@faker-js/faker");

var Item = mongoose.model("Item");
var Comment = mongoose.model("Comment");
var User = mongoose.model("User");

mongoose.connect(process.env.MONGODB_URI);

async function generateUsers() {
  const users = [];
  for (let i = 0; i < 100; i++) {
    const username = faker.internet.userName().replace("_", "").replace(".", "")
    const user = new User({
      username,
      email: faker.internet.email(),
    });
    user.setPassword(username);
    await user.save();
    users.push(user);
  }
  return users;
}

async function generateItems(users) {
  for (const user of users) {
    const item = new Item({
      title: faker.commerce.productName(),
      description: faker.lorem.paragraph(),
      image: faker.image.image(),
      seller: user,
    });
    await item.save();

    const comment = new Comment({
      body: faker.lorem.sentence(),
      seller: user,
      item,
    });
    await comment.save();
  }
}

// main async function
async function main() {
  try {
    const users = await generateUsers();
    await generateItems(users);
  } catch (error) {
    console.log(error);
  }
}

main().then(() => {
  console.log("done");
  process.exit(0);
});
