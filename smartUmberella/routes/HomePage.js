const express = require("express");
const router = express.Router();
const boddyParser =  require("body-parser");
const axious = require("axios");
const city = 'Pimpri';
const key = '92417092e62695ac743e5bcfcbec90c7';
const url =  `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${key}`


router.get("/get-update",async(req,res)=>{
 try{
    const response = await axious.get(url);
    const weatherData = {
        location : response.data.name,
        humidity : response.data.main.humidity,
        temperature : response.data.main.temp,
        status : response.data.weather[0].description
    };
    res.json(weatherData);
  }catch(error){
      console.log(error);
      res.status(504).json({error : "Some error occured "});
  }
});
router.get("/",async(req,res)=>{
    let weather;
    let error = null;
    try{
        const response = await axious.get(url);
        weather = response.data;
        error = null;
    }catch(error){
        console.log(error);
        error = "some error occured";
        weather = null;
    }
    res.render("Home.ejs",{weather,error});
})

module.exports = router;