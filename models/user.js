const mongoose=require("mongoose");
const schema=mongoose.Schema;
const passportlocalmongoose=require("passport-local-mongoose");

const userSchema=new schema({
    email:{
        type:String,
        require:true,
    },
    name:{
        type:String,
        require:true,
    }
});

userSchema.plugin(passportlocalmongoose);

module.exports = mongoose.model('User', userSchema);