import {checkWindDeg} from '../Converters/WindDegConverter.js';
import {convertUnixDate} from '../Converters/UnixConverter.js';

export function searchWeatherByPosition(lat, long) {

    return fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&APPID=51beb393332affa2fdce7c9b4477d227`)
      .then(res => res.json())
      .then(res => {

        let object = {};

        const sunrise = convertUnixDate(res.sys.sunrise, true);
        const sunset = convertUnixDate(res.sys.sunset, true);
        const date = convertUnixDate(res.sys.sunrise, false);
        

          object.weather = res.weather;
          object.name = res.name;
          object.main = res.main;
          object.sys = res.sys;
          object.wind = res.wind;
          object.sun = {
              sunrise: sunrise,
              sunset: sunset
          };
          object.date = date;
          object.error = null;
          object.windDeg = checkWindDeg(res.wind.deg);

          return object;
      });
  }


export function searchWeatherByCity(cityname) {

  return fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityname}&units=metric&APPID=51beb393332affa2fdce7c9b4477d227`)
    .then(res => res.json())
    .then(res => {
        if(+res.cod === 200) {

            let object = {};

            const sunrise = convertUnixDate(res.sys.sunrise, true);
            const sunset = convertUnixDate(res.sys.sunset, true);
            const date = convertUnixDate(res.sys.sunrise, false);

            object.weather = res.weather;
            object.name = res.name;
            object.main = res.main;
            object.sys = res.sys;
            object.wind = res.wind;
            object.sun = {
                sunrise: sunrise,
                sunset: sunset
            };
            object.date = date;
            object.error = null;
            object.windDeg = checkWindDeg(res.wind.deg);
      
          return object;

        } else {
            let object = {};
            object.error = [`No results for ${cityname} found, please try to search again`];


            return object;
        }
    });
}

export function searchForecastByCity(cityname, count) {

    return fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${cityname}&units=metric&cnt=${count}&APPID=51beb393332affa2fdce7c9b4477d227`)
        .then(res => res.json())
        .then(res => {
            
            if(+res.cod === 200) {
                return res;
            } else {
                let object = {};
                object.error = [`No results for ${cityname} found, please try to search again`];
    
    
                return object;
            }
        });
}
    export function searchForecastByPosition(lat, lng, count) {

        return fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lng}&units=metric&cnt=${count}&APPID=51beb393332affa2fdce7c9b4477d227`)
            .then(res => res.json())
            .then(res => {
                if(+res.cod === 200) {
                    return res;
                } else {
                    let object = {};
                    object.error = [`No results found, please try again`];
        
        
                    return object;
                }
            });
}