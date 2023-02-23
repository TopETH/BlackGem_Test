const express = require("express");
const UserController = require("./app/controllers/UserController");

const router = new express.Router();

router.get("/api", UserController.authMiddleware, UserController.index);

router.post("/api", UserController.authMiddleware, UserController.create);

router.put("/api/:id", UserController.authMiddleware, UserController.update);

router.delete(
  "/api/:id",
  UserController.authMiddleware,
  UserController.destroy
);

router.patch("/api", UserController.login);

module.exports = router;
