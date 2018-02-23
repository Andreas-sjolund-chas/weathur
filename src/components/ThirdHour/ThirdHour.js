import React, { Component } from 'react';
import './ThirdHour.css';

class Day extends Component {
  constructor(props) {
    super(props);
    this.state = {
        class: []
    }
  }

condition() {
    if(this.props.index % 2 === 0) {
        var condition = 'odd';
        this.setState({
            class: condition
        });
    } else {
      condition = 'even';
      this.setState({
          class: condition
        });
    }
}

componentDidMount() {
    this.condition();
}

  render() {
        return (
            
                <tr className={ this.state.class }>
                    <td>{this.props.interval.dt_txt.substring(10, 16)}</td>
                    <td className="table-description">
                    {this.props.interval.weather[0].description}
                    <img 
                        src={`http://openweathermap.org/img/w/${this.props.interval.weather[0].icon}.png`} 
                        title="Title goes here" 
                        alt="A weather icon, describing the... weather" />
                    </td>
                    
                    <td>{this.props.temps[this.props.index]} &deg;{this.props.unit}</td>
                    <td>{this.props.interval.wind.speed} m/s</td>
                    <td>{this.props.interval.main.humidity} %</td>
                </tr>
        )
    }
}

export default Day;