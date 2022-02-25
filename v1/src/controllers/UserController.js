const httpstatus = require("http-status");
const {
  select,
  selectAll,
  insert,
  edit,
  remove,
  loginUser,
} = require("../services/UserService");
const {
  createPasswordToHash,
  generateAccessToken,
} = require("../scripts/utils/auth");

const index = (req, res) => {
  selectAll().then((response) => {
    res.status(httpstatus.OK).send(
      response.map((u) => {
        const user = u.toObject();
        delete user.password;
        return user;
      })
    );
  });
};

const show = (req, res) => {
  select(req.params.id).then((response) => {
    if (response) {
      const user = response.toObject();
      delete user.password;
      return res.status(httpstatus.OK).send(user);
    }
    response.status(httpstatus.NO_CONTENT);
  });
};

const store = (req, res) => {
  req.body.password = createPasswordToHash(req.body.password);
  insert(req.body)
    .then((response) => res.status(httpstatus.OK).send(response))
    .catch((e) => res.status(httpstatus.INTERNAL_SERVER_ERROR).send(e));
};

const update = (req, res) => {
  edit(req.params.id, req.body)
    .then((response) => res.status(httpstatus.OK).send(response))
    .catch((e) => res.status(httpstatus.INTERNAL_SERVER_ERROR).send(e));
};

const destroy = (req, res) => {
  remove(req.params.id)
    .then((response) => res.status(httpstatus.NO_CONTENT).send(response))
    .catch((e) => res.status(httpstatus.INTERNAL_SERVER_ERROR).send(e));
};

const login = (req, res) => {
  loginUser(req.body)
    .then((response) => {
      if (response) {
        console.log(response);
        const user = {
          ...response.toObject(),
          accessToken: generateAccessToken(response.toObject()),
        };
        delete user.password;
        delete user.createdAt;
        delete user.updatedAt;
        return res.status(httpstatus.OK).send(user);
      }
      return res
        .status(httpstatus.UNAUTHORIZED)
        .send({ error: "Invalid Credentials..." });
    })
    .catch((e) =>
      res.status(httpstatus.INTERNAL_SERVER_ERROR).send({ error: e })
    );
};

module.exports = {
  index,
  show,
  store,
  update,
  destroy,
  login,
};
