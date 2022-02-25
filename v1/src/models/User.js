const Mongoose = require("mongoose");
const logger = require("../scripts/logger/User");

const UserScheme = new Mongoose.Schema(
  {
    name: String,
    password: String,
    email: String,
    projects: [
      {
        type: Mongoose.Types.ObjectId,
        ref: "projects",
      },
    ],
  },
  { versionKey: false, timestamps: true }
);

UserScheme.pre("save", function (next) {
  var new_doc = this;
  this.constructor.findById(this.id, function (err, original) {
    logger.log({
      level: "info",
      message: new_doc,
    });
    next();
  });
});

module.exports = Mongoose.model("users", UserScheme);
