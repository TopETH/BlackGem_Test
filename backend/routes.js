const express = require("express");
const UserController = require("./app/controllers/UserController");
const { authMiddleware } = require("./app/middleware/AuthMiddleware");

const router = new express.Router();

router.get("/api", authMiddleware, UserController.index);

router.post("/api", authMiddleware, UserController.create);

router.put("/api/:id", authMiddleware, UserController.update);

router.delete("/api/:id", authMiddleware, UserController.destroy);

router.patch("/api", UserController.login);

module.exports = router;
