const sendMail = require("./utils/mail");

module.exports.saveRedirectUrl = (req,res,next)=>{
    if(req.session.redirectUrl){
        res.locals.redirectUrl = req.session.redirectUrl;
    }
    next();
};
module.exports.isLoggedIn = (req,res,next)=>{if(!req.isAuthenticated()){
    // console.log(req.user);
    req.session.redirectUrl = req.originalUrl;
    req.flash("error","You must be logged in first");
    return res.redirect("/login");
    }
    next();
};

module.exports.sendMailOnTime = async(req,res)=>{
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    console.log("Cheking the time");
    if(hours === 2 && minutes === 19){
        console.log("Sending mail");
        try{
            
                
                await sendMail();
                console.log("Mail is sended");
            

        }catch(error){
            console.log(error);
            res.redirect("error.ejs");
        }
    }else{
        console.log(`the current time is ${hours} : ${minutes} not 8 : 00`);
    }
}


