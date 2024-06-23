const express=require("express");
const router=express.Router();
const Listing=require("../models/listing.js");
const ExpressError=require("../utils/ExpressError.js");
const{listingSchema}=require("../schema.js");
const wrapAsync=require("../utils/wrapAsync.js");
const passport = require("passport");
const {isLoggedIn, isOwner, validateListing}=require("../middleware.js")

const listingController=require("../controllers/listing.js")
const multer  = require('multer')
const {storage}= require("../cloudConfig.js")
const upload = multer({ storage })


router.route("/")
    .get(wrapAsync(listingController.index))  //index route
    .post(isLoggedIn,
        upload.single('listing[image]'), 
        validateListing,
        wrapAsync(listingController.createListing)
    );  //create route

// new route 
router.get("/new",isLoggedIn,(listingController.newForm));

router.route("/:id")
    .get(wrapAsync(listingController.showListing))  //show route
    .put(isLoggedIn,upload.single('listing[image]'),validateListing,wrapAsync(listingController.updateListing))   //update route
    .delete(isLoggedIn,wrapAsync(listingController.deleteListing))     //destroy route


// edit route 
router.get("/:id/edit",isLoggedIn,wrapAsync(listingController.editListing));


module.exports=router;