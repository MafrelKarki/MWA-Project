/*
* @Author: Mafrel
*
*/


const express = require("express");
const {
  check
} = require('express-validator/check');
const UserController = require("../controllers/user");
const router = express.Router();

router.post("/signup", UserController.createUser);
router.post("/login",  UserController.userLogin);
router.get("", UserController.getAllUser);
router.get("/:userid", UserController.getUser);
// router.put("/:userid", [
  // password must be at least 5 chars long
  // check('mafrel').isLength({ min: 5 }),
// ], UserController.updateUser);
router.put("/:userid", UserController.updateUser);
router.patch("/:userid/deactivate", UserController.deactivateUser);

module.exports = router;
