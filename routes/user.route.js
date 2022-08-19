const userController = require ("../controllers/user.controller");

const express = require("express");
const router = express.Router();

router.post("/register",userController.register);
router.post("/login",userController.login);
router.get("user-profile",userController.userProfile);

module.exports =router;
