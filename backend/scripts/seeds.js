require("dotenv").config();
require("../models/User");
require("../models/Item");
require("../models/Comment");
require("../config/passport");

const mongoose = require("mongoose");

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
    process.exit(0)
  });
