const Model = require("../models/Project");

const select = async (id) => {
  return await Model.findById(id).populate("user_id");
};

const selectAll = async () => {
  return await Model.find({});
};

const insert = async (data) => {
  const instance = new Model(data);
  return await instance.save();
};

const edit = async (id, data) => {
  console.log(id);
  data._id = id;
  await Model.updateOne(data);
  return await Model.findOne(data);
};

const remove = async (id) => {
  return await Model.deleteOne({ _id: id });
};

module.exports = {
  select,
  selectAll,
  insert,
  edit,
  remove,
};
