const express=require("express");
const router=express.Router();
const wrapAsync=require("../utils/wrapAsync.js");
const User=require("../models/user.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");

const userController=require("../controllers/user.js")

router.route("/signup")
.get((userController.signup))
.post(wrapAsync(userController.createUser))


router.route("/login")
.get((userController.login))
.post(
    saveRedirectUrl,
    passport.authenticate("local",
    { failureRedirect:"/login",
    failureFlash:true}),
    (userController.createLogin)
);

router.get("/logout",(userController.logout))

module.exports=router;