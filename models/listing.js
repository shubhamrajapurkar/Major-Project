const mongoose=require("mongoose");
const Review = require("./review");
const { string } = require("joi");
const schema=mongoose.Schema;


const listingSchma =new schema({
    title: {
        type: String,
        require: true,
    },
    description:String,
    image:{
        url: String,
        filename: String
    },
    price:Number,
    location:String,
    country:String, 
    
    review:[
        {
            type: schema.Types.ObjectId,
            ref:"Review",
        },
    ],
    owner: {
        type:schema.Types.ObjectId,
        ref:"User"
    }
});

listingSchma.post("findOneAndDelete",async(listing)=>{
    if(listing){
        await Review.deleteMany({_id:{$in:listing.review}});
    }
});

const Listing=mongoose.model("Listing",listingSchma);
module.exports=Listing;