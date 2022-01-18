const request = require('request')

const forecast = (lat, long ,callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=92132a0d6ba8e13fa1c3c8c16237cc14&query='+lat+','+long
    request({url,json:true} , (error,response)=> {
           if(error){
       callback("Unable to connect to the weather service !",undefined)
   }
   else if(response.body.error){    
       callback("Unable to fetch location",undefined)
   }
   else{
    callback(undefined,{
        description:response.body.current.weather_descriptions[0],
        actualTemperature : response.body.current.temperature,
        precip : response.body.current.precip,
        location : response.body.location.region,
    })
   }
    })
}
module.exports = forecast
