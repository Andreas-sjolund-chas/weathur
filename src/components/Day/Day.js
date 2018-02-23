import React, { Component } from 'react';
import './Day.css';

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

                    {this.props.index === 0 ?  
                    <td>Today</td>
                    : this.props.index === 1 ?
                    <td>Tomorrow</td>
                    :
                    <td>{this.props.interval[0].dt_txt.substring(0, 10)}</td>
                    }

                    <td className="table-description">
                    {this.props.interval[0].weather[0].description}
                    <img 
                        src={`http://openweathermap.org/img/w/${this.props.interval[0].weather[0].icon}.png`} 
                        title="Title goes here" 
                        alt="A weather icon, describing the... weather" />
                    </td>
                    
                    <td>{this.props.temperature.low[this.props.index]} &deg;{this.props.unit}</td>
                    <td>{this.props.temperature.high[this.props.index]} &deg;{this.props.unit}</td>
                    <td>{this.props.wind.low[this.props.index]} m/s</td>
                    <td>{this.props.wind.high[this.props.index]} m/s</td>
                    <td>{this.props.humidity.low[this.props.index]} %</td>
                    <td>{this.props.humidity.high[this.props.index]} %</td>
                </tr>
        )
    }
}

export default Day;