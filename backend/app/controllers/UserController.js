const jwt = require("jsonwebtoken");

const { User } = require("../models");

const SECRET_KEY = "my-secret-key";

module.exports = {
  index(req, res) {
    User.findAll({})
      .then((users) =>
        res.json({
          error: false,
          data: users,
        })
      )
      .catch((error) =>
        res.status(500).json({
          data: [],
          error: error,
        })
      );
  },

  login(req, res) {
    const { email, password } = req.body;
    User.findOne({ where: { email: email } })
      .then((user) => {
        // Check if the username and password are valid.
        if (user !== null && password === "password") {
          // Generate a JWT token using the secret key.
          const token = jwt.sign({ user }, SECRET_KEY);

          // Send the token back to the client.
          res.json({ token });
        } else {
          // Send an HTTP 401 unauthorized response if the credentials are invalid.
          res.status(401).send("Invalid username or password");
        }
      })
      .catch((error) =>
        res.status(500).json({
          data: [],
          error: error,
        })
      );
  },

  create(req, res) {
    const { username, email, info } = req.body;
    User.create({
      username,
      email,
      info,
    })
      .then((user) =>
        res.status(201).json({
          error: false,
          data: user,
          message: "new user has been created",
        })
      )
      .catch((error) =>
        res.status(500).json({
          data: [],
          error: error,
        })
      );
  },

  update(req, res) {
    const user_id = req.params.id;

    const { username, email, info } = req.body;

    User.update(
      {
        username,
        email,
        info,
      },
      {
        where: {
          id: user_id,
        },
      }
    )
      .then((user) =>
        res.status(201).json({
          error: false,
          data: user,
          message: "user has been updated",
        })
      )
      .catch((error) =>
        res.status(500).json({
          error: error,
        })
      );
  },

  destroy(req, res) {
    const user_id = req.params.id;

    User.destroy({
      where: {
        id: user_id,
      },
    })
      .then((status) =>
        res.status(201).json({
          error: false,
          message: "user has been deleted",
        })
      )
      .catch((error) =>
        res.status(500).json({
          error: error,
        })
      );
  },
};
