const express = require("express");
const router = express.Router();
const {getWeatherData} = require("../utils/getWeather.js");

router.get("/get-update",async(req,res)=>{
 try{
    const {weather,error} = await getWeatherData();
    if(weather){
        const weatherData = {
            location : weather.name,
            humidity : weather.main.humidity,
            temperature : weather.main.temp,
            status : weather.weather[0].description
        };
        res.json(weatherData);
    }else{
        throw new error;
    }

  }catch(error){
      console.log(error);
      res.status(504).json({error : "Some error occured "});
  }
});
router.get("/",async(req,res)=>{
    if(req.isAuthenticated()){
        try{
            const { weather, error } = await getWeatherData();
            res.render("Home.ejs",{weather,error});
        }catch(err){
            res.redirect("/error.ejs");
        }
    }else{
        
        res.redirect("/login");
    }
})

module.exports = router;