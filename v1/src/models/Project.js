const Mongoose = require("mongoose");
const logger = require("../scripts/logger/Project");

const ProjectScheme = new Mongoose.Schema(
  {
    name: {
      type: String,
    },
    user_id: {
      type: Mongoose.Types.ObjectId,
      ref: "users",
    },
  },
  { versionKey: false, timestamps: true }
);

ProjectScheme.pre("save", function (next) {
  var new_doc = this;
  this.constructor // ≈ mongoose.model('…', FieldSchema).findById
    .findById(this.id, function (err, original) {
      logger.log({
        level: "info",
        message: new_doc,
      });
      next();
    });
});

module.exports = Mongoose.model("projects", ProjectScheme);
