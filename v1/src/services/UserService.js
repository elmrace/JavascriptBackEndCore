const Model = require('../models/User');
const { createPasswordToHash } = require('../scripts/utils/auth');

const select = async (id) => {
    return await Model.find({_id: id});
}

const selectAll = async () => {
    return await Model.find({});
}

const insert = async (data) => {
    
    const instance = new Model(data);
    return await instance.save();
}

const edit = async (id, data) => {
    console.log(id);
    data._id = id;
    await Model.updateOne(data);
    return await Model.findOne(data);
}

const remove = async (id) => {
    return await Model.deleteOne({ _id: id});
}

const loginUser = async (data) => {
    return await Model.findOne({email: data.email, password: createPasswordToHash(data.password)});
}

module.exports = {
    select, selectAll, insert, edit, remove, loginUser
}