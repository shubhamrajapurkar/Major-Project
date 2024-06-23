const User=require("../models/user")

module.exports.signup=(req,res)=>{
    res.render("users/signup.ejs")
}

module.exports.createUser=async(req,res)=>{
    try{
        let{name,username,email,password}=req.body;
        const newUser=new User({email,name,username});
        const user=await User.register(newUser,password);
        // console.log(user);
        req.login(user, (err) => {
            if (err) {
                return next(err);
            }
            req.flash("success",`Welcome ${name}`);
            res.redirect("/listings");
        });
          
    }
    catch(err){
        req.flash("error",err.message);
        res.redirect("./signup")
    }
}

module.exports.login=(req,res)=>{
    res.render("users/login.ejs");
}

module.exports.createLogin=async(req,res)=>{
    req.flash("success","User logged in successfully");
    let redirectUrl=res.locals.redirectUrl || "/listings"
    res.redirect(redirectUrl);
}

module.exports.logout=(req,res,next)=>{
    req.logout((err)=>{
        if(err){
            return next(err);
        }
        req.flash("success","User logged out successfully");
        res.redirect("/listings");
    })
}