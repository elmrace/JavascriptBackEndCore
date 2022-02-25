const httpstatus = require('http-status');
const { select, selectAll, insert, edit, remove } = require('../services/ProjectsService');

const index = (req, res) => {
    selectAll().then((response) => {
        res.status(httpstatus.OK).send(response);
    });
}

const show = (req, res) => {
    select(req.params.id).then((response) => {
        res.status(httpstatus.OK).send(response);
    });
}

const store = (req, res) => {
    insert(req.body)
        .then((response) => res.status(httpstatus.OK).send(response))
        .catch((e) => res.status(httpstatus.INTERNAL_SERVER_ERROR).send(e));
}

const update = (req, res) => {
    edit(req.params.id, req.body)
        .then((response) => res.status(httpstatus.OK).send(response))
        .catch((e) => res.status(httpstatus.INTERNAL_SERVER_ERROR).send(e));
}

const destroy = (req, res) => {
    remove(req.params.id)
        .then((response) => res.status(httpstatus.NO_CONTENT).send(response))
        .catch((e) => res.status(httpstatus.INTERNAL_SERVER_ERROR).send(e));
}

module.exports = {
    index, show, store, update, destroy
}