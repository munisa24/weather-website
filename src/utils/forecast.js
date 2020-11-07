const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=93e5524ace5d9b835e5f3e8e835839fd&query=' + latitude + ' , ' + longitude +'&units=m';


    request({ url, json: true}, (error, {body}) => {
        if(error){
            callback('Unable to connect to location services!', undefined);
        } else if(body.error){
            callback('Unable to find location.', undefined);
        } else {
            callback(undefined, body.current.weather_descriptions[0] + '. It is currently ' + body.current.temperature + ' degress out. Although, it feels like ' + body.current.feelslike + ' degress. And the humidity is ' + body.current.humidity + '.');
        }
    });


};

module.exports = forecast;