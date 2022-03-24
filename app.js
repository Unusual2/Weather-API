const express = require("express");
const { STATUS_CODES } = require("http");
const https = require("https");
const { dirname } = require("path");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req , res){
    res.sendFile(__dirname+"/index.html");
    // res.send("The server is running");
} );

app.post("/", function(req,res){
    // console.log(req.body.cityname);
    const query=req.body.cityname;
const appikey = "130ea6c6795fcfbd8f304fa82d793036";
const units = "metric"
const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+appikey+"&units="+units;
https.get(url, function(response){
    console.log(response.statusCode);

    response.on("data", function(data){
        const weatherData = JSON.parse(data);
        const temp = weatherData.main.temp;
        const weatherDescription = weatherData.weather[0].description;
        const icon = weatherData.weather[0].icon
        const imageURL ="http://openweathermap.org/img/wn/"+icon+"@2x.png"; 
        res.write("<p> The Weather is currently "+weatherDescription+"</p>");
        res.write( "<h1> The Current temperature in "+ query +" is "+ temp +"</h1>");
        res.write("<img src="+imageURL+">");
        res.send();
    });
});
});




app.listen(3000, function(){
    console.log("The server is running at port ::3000")
});