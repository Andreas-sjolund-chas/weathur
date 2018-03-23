import React, { Component } from 'react';
import { Home, Header, Content, Footer, Form, Hourly, FiveDays } from './components';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import './App.css';


class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
            <ul className="App-router">
                <li className="App-router-item" key="Home"><Link to="/" className="App-router-link">Home</Link></li>
                <li className="App-router-item" key="Today"><Link to="/today" className="App-router-link">Today</Link></li>
                <li className="App-router-item" key="Hourly"><Link to="/hourly" className="App-router-link">24-hours</Link></li>
                <li className="App-router-item" key="FiveDays"><Link to="/days" className="App-router-link">5 Days</Link></li>
            </ul>

          <Content>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/today" component={Form} />
              <Route path="/hourly" component={Hourly} />
              <Route path="/days" component={FiveDays} />
            </Switch>
          </Content>
        <Footer />
      </div>
    )
  }
}

export default App;
