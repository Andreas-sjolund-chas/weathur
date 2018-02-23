import React, { Component } from 'react';
import { searchWeatherByCity, searchWeatherByPosition } from '../Api/Api.js';
import './Form.css';

class Form extends Component {
    constructor() {
      super();
      this.state = {
        weather: [],
        name: [],
        main: [],
        sys: [],
        wind: [],
        windDeg: [],
        sun: [],
        date: [],
        farenheit: false,
        unit: [],
        error: []
      }
    }

    componentWillMount() {
        this.getPosition();
    }

    componentDidMount() {
        this.setUnit();
       }

    getPosition() {
        fetch('https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyDAnA_6ms6_TqaD-hDt_XarCkCAaCDjWuI',
        {
            method: 'POST'
        })
        .then(res => res.json())
        .then(res => {
            searchWeatherByPosition(res.location.lat, res.location.lng).then(res => {
                this.setState({
                    weather: res.weather,
                    name: res.name,
                    main: res.main,
                    sys: res.sys,
                    wind: res.wind,
                    sun: {
                        sunrise: res.sun.sunrise,
                        sunset: res.sun.sunset
                    },
                    date: res.date,
                    windDeg: res.windDeg,
                    error: null
                });
            });
        });
        this.setUnit();
    }

    searchByCityName(e) {
        e.preventDefault();
        const cityname = e.nativeEvent.target.elements[0].value;

        searchWeatherByCity(cityname)
            .then(res => {
                if(!res.error) {
                this.setState({
                    weather: res.weather,
                    name: res.name,
                    main: res.main,
                    sys: res.sys,
                    wind: res.wind,
                    sun: {
                        sunrise: res.sun.sunrise,
                        sunset: res.sun.sunset
                    },
                    date: res.date,
                    windDeg: res.windDeg,
                    error: null
                    });
                } else {

                    this.setState({
                        error: res.error 
                    });
                }
            });
            this.setUnit();
        }

    setUnit() {
        this.setState({
            unit: 'C'
        })
    }

    
    switchCondition() {
        this.setState(prevState => ({
            farenheit: !prevState.farenheit
        }), function() {

            if(this.state.farenheit) {
                let farenheitTemp = (this.state.main.temp * 9 / 5) + 32;
                let farenheitMinTemp = (this.state.main.temp_min * 9 / 5) + 32;
                let farenheitHighTemp = (this.state.main.temp_max * 9 / 5) + 32;

                farenheitTemp = farenheitTemp.toFixed(2);
                farenheitMinTemp = farenheitMinTemp.toFixed(2);
                farenheitHighTemp = farenheitHighTemp.toFixed(2);

                this.setState({
                    unit: 'F',
                    main: {
                        temp: farenheitTemp,
                        temp_min: farenheitMinTemp,
                        temp_max: farenheitHighTemp,
                        humidity: this.state.main.humidity
                    }
                })
            } else {
                let celsiusTemp = (this.state.main.temp - 32) * 5 / 9;
                let celsiusMinTemp = (this.state.main.temp_min - 32) * 5 / 9;
                let celsiusMaxTemp = (this.state.main.temp_max - 32) * 5 / 9;

                celsiusTemp = celsiusTemp.toFixed(2);
                celsiusMinTemp = celsiusMinTemp.toFixed(2);
                celsiusMaxTemp = celsiusMaxTemp.toFixed(2);
                
                this.setState({
                    unit: 'C',
                    main: {
                        temp: celsiusTemp,
                        temp_min: celsiusMinTemp,
                        temp_max: celsiusMaxTemp,
                        humidity: this.state.main.humidity
                    }
                })
            }
          });
    }
  
    render() {

      return (
          <div className="content">
            <div>
                <button onClick={this.getPosition.bind(this)}>Hitta min position <i className="fas fa-location-arrow"></i></button>     
            </div>
            <form onSubmit={this.searchByCityName.bind(this)}>
                <input type="text" placeholder="Type the city name here" name="city" />
                <button type="submit">Get weather</button>
            </form>
            <div className="switcher-container">
                <label className="switch">
                    <input id="switcher" type="checkbox" onClick={this.switchCondition.bind(this)} />
                    <span className="slider round"></span>
                </label>
                {this.state.farenheit ?
                    <p>Currently showing: Farenheit</p>
                :
                    <p>Currently showing: Celsius</p>
                }
            </div>
        <div className="error-msg"><p>{this.state.error}</p></div>
        { this.state.error === null ?
            <div className="App-weather">
                <div className="row">
                    <p>Right now in: </p><h4>{this.state.name}</h4>
                </div>

                <div className="row">
                    <p>Date: </p><h4>{this.state.date}</h4>
                </div>

                <div className="row">
                    <img src={`http://openweathermap.org/img/w/${this.state.weather[0].icon}.png`} title="Title goes here" alt="A weather icon, describing the... weather" />
                </div>

                <div className="row">
                    <h4>Status: </h4><p> {this.state.weather[0].description}</p>
                </div>

                <div className="compass">
                    <div className="direction">
                        <p>{this.state.windDeg}<span>{this.state.wind.speed} m/sec</span></p>
                    </div>
                    <div className="arrow" style={{transform: `rotate(${this.state.wind.deg}deg)`}}></div>
                </div>
             
                <div className="temperature">
                    <div className="row">
                        <h4>Temperature: </h4><p> {this.state.main.temp}&deg;{this.state.unit}</p>
                    </div>
                    <div className="row">
                        <h4>Min: </h4><p> {this.state.main.temp_min}&deg;{this.state.unit}</p>
                        <h4>Max: </h4><p> {this.state.main.temp_max}&deg;{this.state.unit}</p>
                    </div>

                </div>

                <div className="row">
                    <h4>Humidity: </h4><p> {this.state.main.humidity}%</p>
                </div>
                <div className="row">
                    <h4>Sunrise: </h4><p>{this.state.sun.sunrise}</p>
                    <p> | </p>
                    <h4>Sunset: </h4><p>{this.state.sun.sunset}</p>
                </div>
            </div>
            : <p>Search for a city/town or press <a onClick={this.getPosition.bind(this)} >here to get my position</a></p>
        }
        </div>
      );
    }
  }
  
  export default Form;