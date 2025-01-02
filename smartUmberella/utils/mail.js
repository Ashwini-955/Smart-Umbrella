const nodemailer = require("nodemailer");
const city = 'Pimpri';
const key = '92417092e62695ac743e5bcfcbec90c7';
const url =  `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${key}`
const axious = require("axios");

const getWeatherData = async()=>{
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
  return {weather,error};
}


const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, 
  auth: {
    user: "mishraraunak117@gmail.com",
    pass: "jvep otef zlvm tbtp",
  },
});


const sendMail = async function main() {
  const { weather, error } = await getWeatherData();
  if(weather){
      const mailOptions =   {
      from: '"Smart Umberella " <mishraraunak117@gmail.com>', 
      to: "kumbharkartik150@gmail.com,ashwinirm05@gmail.com,smartumbrella123@gmail.com", 
      subject: "Today'weather condition", 
      text: `Todays weather update : \n\nLocation : ${weather.name} \n Temprature : ${weather.main.temp}°F\nHumidity : ${weather.main.humidity}\ndescription : ${weather.weather[0].description}`, 
      html:         
        `<b>Hello,</b><br><br>
         <b>Here is the weather update for today:</b><br><br>
         <b>Location:</b> ${weather.name}<br>
         <b>Temperature:</b> ${weather.main.temp}°F<br>
         <b>Humidity:</b> ${weather.main.humidity}%<br>
         <b>Weather:</b> ${weather.weather[0].description}<br>`
    }
    try{
      const info = await transporter.sendMail(mailOptions);
      console.log("Message sent: %s", info.messageId);
    }catch(error){
      console.log(error);
    }
  
  }else{
    console.log("Weather data not available, email not sent.");
  }
}


module.exports = sendMail;