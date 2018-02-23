import React, { Component } from 'react';
import { searchForecastByCity, searchForecastByPosition } from '../Api/Api.js';
import { ThirdHour } from '../';

import './Hourly.css';

class Hourly extends Component {
    constructor() {
        super();
        this.state = {
            name: [],
            forecast: [],
            temps: [],
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

    groupTemps(list) {
        return list.reduce((group, item) => {

            group.push(item.main.temp);

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
            searchForecastByPosition(res.location.lat, res.location.lng, 8).then(res => {
                if(!res.error) {

                    let temps = this.groupTemps(res.list); 

                    this.setState({
                        name: res.city.name,
                        forecast: res.list,
                        temps: temps,
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

        searchForecastByCity(cityname, 8)
            .then(res => {
                if(!res.error) {

                this.setState({
                    forecast: res.list,
                    name: cityname,
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
                let temperatures = [];
                this.state.temps.map((temperature, index) => {

                    let farenheitTemp = (temperature * 9 / 5) + 32;
                    
                    farenheitTemp = farenheitTemp.toFixed(2);

                    temperatures.push(farenheitTemp);
                });

                this.setState({
                    unit: 'F',
                    temps: temperatures
                })

            } else {
                let temperatures = [];
                this.state.temps.map((temperature, index) => {

                    let celsiusTemp = (temperature - 32) * 5 / 9;

                    celsiusTemp = celsiusTemp.toFixed(2);
                    
                    temperatures.push(celsiusTemp);
                });

                this.setState({
                    unit: 'C',
                    temps: temperatures
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
                                <caption><p>Todays weather in {this.state.name}</p></caption>
                                <thead>
                                    <tr>
                                        <th>Timestamp</th>
                                        <th>Description</th>
                                        <th>Temperature</th>
                                        <th>Wind</th>
                                        <th>Humidity</th>       
                                    </tr>
                                </thead>
                                <tbody>
                            {
                                this.state.forecast.map((interval, index) => {
                                    
                                    return <ThirdHour unit={this.state.unit} temps={this.state.temps} index={index} key={index} interval={interval} /> 
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

export default Hourly;