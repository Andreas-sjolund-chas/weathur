import React, { Component } from 'react';
import { searchForecastByCity, searchForecastByPosition } from '../Api/Api.js';
import { Day } from '../';

import './FiveDays.css';

class FiveDays extends Component {
    constructor() {
        super();
        this.state = {
            name: [],
            forecast: [],
            temps: [],
            unit: [],
            farenheit: false,
            error: []
        }
      }

    componentWillMount() {
        this.getPosition();
    }

    componentDidMount() {
        this.setUnit();
       }

    setUnit() {
        this.setState({
            unit: 'C'
        })
    }

    sortByDay(list) {
        return list.reduce((group, item) => {
            const valueToAdd = item['dt_txt'].substring(0, 10);

            group[valueToAdd] = group[valueToAdd] || [];
            group[valueToAdd].push(item);

            return group;
        }, {});
    }

    groupHighestTemperature(day) {
        return day.reduce((group, item) => {

            group.push(item.main.temp_max);

            return group;
        }, []);
    }

    groupLowestTemperature(day) {
        return day.reduce((group, item) => {

            group.push(item.main.temp_min);

            return group;
        }, []);
    }

    groupWind(day) {
        return day.reduce((group, item) => {

            group.push(item.wind.speed);

            return group;
        }, []);
    }

    groupHumidity(day) {
        return day.reduce((group, item) => {

            group.push(item.main.humidity);

            return group;
        }, []);
    }

    getPosition() {
        fetch('https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyDAnA_6ms6_TqaD-hDt_XarCkCAaCDjWuI',
        {
            method: 'POST'
        })
        .then(res => res.json())
        .then(res => {
            searchForecastByPosition(res.location.lat, res.location.lng, 40).then(res => {
                if(!res.error) {

                    let days = this.sortByDay(res.list); // Sorts each day to an array with index of the date

                    days = Object.keys(days).map(key => days[key]); // Converts the array to object

                    let lowTemp = [];
                    let highTemp = [];
                    let lowHumidity = [];
                    let highHumidity = [];
                    let lowWind = [];
                    let highWind = [];

                    days.map(day => {
                        const highestTemp = this.groupHighestTemperature(day);
                        const lowestTemp = this.groupLowestTemperature(day);
                        const wind = this.groupWind(day);
                        const humidity = this.groupHumidity(day);
                        
                        highTemp.push(Math.max(...highestTemp));
                        lowTemp.push(Math.min(...lowestTemp));
                        highWind.push(Math.max(...wind));
                        lowWind.push(Math.min(...wind));
                        highHumidity.push(Math.max(...wind));
                        lowHumidity.push(Math.min(...wind));
                    });

                    this.setState({
                        name: res.city.name,
                        forecast: days,
                        temperature: {
                            low: lowTemp,
                            high: highTemp
                        },
                        humidity: {
                            low: lowHumidity,
                            high: highHumidity
                        },
                        wind: {
                            low: lowWind,
                            high: highWind
                        },
                        error: null
                    });
                    } else {
                        this.setState({
                            error: res.error 
                    });
                }
            });
        });
        this.setUnit();
    }

    searchByCityName(e) {
        e.preventDefault();
        const cityname = e.nativeEvent.target.elements[0].value;

        searchForecastByCity(cityname, 40)
            .then(res => {
                if(!res.error) {

                    let days = this.sortByDay(res.list); // Sorts each day to an array with index of the date

                    days = Object.keys(days).map(key => days[key]); // Converts the array to object

                    let lowTemp = [];
                    let highTemp = [];
                    let lowHumidity = [];
                    let highHumidity = [];
                    let lowWind = [];
                    let highWind = [];

                    days.map(day => {
                        const highestTemp = this.groupHighestTemperature(day);
                        const lowestTemp = this.groupLowestTemperature(day);
                        const wind = this.groupWind(day);
                        const humidity = this.groupHumidity(day);
                        
                        highTemp.push(Math.max(...highestTemp));
                        lowTemp.push(Math.min(...lowestTemp));
                        highWind.push(Math.max(...wind));
                        lowWind.push(Math.min(...wind));
                        highHumidity.push(Math.max(...wind));
                        lowHumidity.push(Math.min(...wind));
                    });

                    this.setState({
                        name: res.city.name,
                        forecast: days,
                        temperature: {
                            low: lowTemp,
                            high: highTemp
                        },
                        humidity: {
                            low: lowHumidity,
                            high: highHumidity
                        },
                        wind: {
                            low: lowWind,
                            high: highWind
                        },
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

    switchCondition() {
        
        this.setState(prevState => ({
            farenheit: !prevState.farenheit
        }), function() {
            if(this.state.farenheit) {

                let highTemperatures = [];

                this.state.temperature.high.map((temperature, index) => {

                    let highFarenheitTemp = (temperature * 9 / 5) + 32;

                    highFarenheitTemp = highFarenheitTemp.toFixed(2);

                    highTemperatures.push(highFarenheitTemp);
                });

                let lowTemperatures = [];

                this.state.temperature.low.map((temperature, index) => {

                    let lowFarenheitTemp = (temperature * 9 / 5) + 32;

                    lowFarenheitTemp = lowFarenheitTemp.toFixed(2);

                    lowTemperatures.push(lowFarenheitTemp);
                });

                this.setState({
                    unit: 'F',
                    temperature: {
                        high: highTemperatures,
                        low: lowTemperatures
                    }
                })

            } else {

                let highTemperatures = [];

                this.state.temperature.high.map((temperature, index) => {

                    let highCelsiusTemp = (temperature - 32) * 5 / 9;

                    highCelsiusTemp = highCelsiusTemp.toFixed(2);
                    
                    highTemperatures.push(highCelsiusTemp);
                });

                let lowTemperatures = [];

                this.state.temperature.low.map((temperature, index) => {

                    let lowCelsiusTemp = (temperature - 32) * 5 / 9;

                    lowCelsiusTemp = lowCelsiusTemp.toFixed(2);

                    lowTemperatures.push(lowCelsiusTemp);
                });

                this.setState({
                    unit: 'C',
                    temperature: {
                        high: highTemperatures,
                        low: lowTemperatures
                    }
                });
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
                { this.state.forecast && this.state.forecast.length > 0 ? 
                    <div>    
                        <div className="row">
                            <table className="table">
                                <caption><p>Next few days in {this.state.name}</p></caption>
                                <thead>

                                    <tr>
                                        <td colSpan="2"></td>
                                        <th colSpan="2">Temperature</th>
                                        <th colSpan="2">Wind</th>     
                                        <th colSpan="2">Humidity</th>       
                                    </tr>
                                    <tr>
                                        <th>Timestamp</th>
                                        <th>Description</th>
                                        <th>Low</th>
                                        <th>high</th>
                                        <th>low</th>
                                        <th>high</th>
                                        <th>low</th>     
                                        <th>high</th>       
                                    </tr>
                                </thead>
                                <tbody>
                            {
                                this.state.forecast.map((interval, index) => {
                                    
                                    return <Day 
                                        temperature={this.state.temperature} 
                                        wind={this.state.wind}
                                        humidity={this.state.humidity}
                                        unit={this.state.unit}
                                        index={index} 
                                        key={index} 
                                        interval={interval} 
                                    /> 
                                }) 
                            }
                                </tbody>
                            </table>
                        </div>
                    </div>
                :

                ''}
            </div>
        )
    }
}

export default FiveDays;