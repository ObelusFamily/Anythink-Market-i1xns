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
const { sendEvent } = require("../lib/event");

mongoose.connect(process.env.MONGODB_URI);

const user = User.findOne()
  .then((user) => {
    var data = {
      title: "seed item",
    };
    var item = new Item(data);

    item.seller = user;

    return item.save().then(function () {
      sendEvent("item_created", { item: data });
    });
  })
  .then(function () {
    process.exit(0);
  });

async function generateUsers() {
  const users = [];
  for (let i = 0; i < 100; i++) {
    
    const user = new User({
      username: faker.name.firstName() + faker.name.lastName(),
      email: faker.internet.email(),
    });
    user.setPassword("1234");
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
      seller: user
    });
    await item.save();


    const comment = new Comment({
      body: faker.lorem.sentence(),
      seller: user,
      item,
    })
    comment.save();
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
