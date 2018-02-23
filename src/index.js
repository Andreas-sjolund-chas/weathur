import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter as Router} from "react-router-dom";

//         --------------------  WHAT TODO  --------------------

// * Kunna se temperatur och andra väderförhållanden för sin nuvarande position
// **** Vindstyrka
// **** Luftfuktighet
// **** Soluppgång och nedgång (klockslag)
// **** Välja mellan Farenheit och Celsius

// * Kunna få en väderleksprognos för väderförhållanden över ett visst intervall av dagar (1 vecka)
// **** Kort översikt för veckan
// **** Varje timme för nuvarande dygn
// **** 10 dagars prognos

//         --------------------  DEMANDS  --------------------

// *Implementera SMHI, YR.NO, OpenWeatherMaps API:er
// *Implementera positionering via geolocation i webbläsaren
// *Design/färg & form baserad på weather.com eller liknande applikationer/appar


//    --------------------  HOW TO ACHIEVE IT  --------------------

// Find me button (my position)
// Today
// Hours
// Weekly
// 10 days



ReactDOM.render(
    <Router>
        <App />
    </Router>
    , document.getElementById('root'));
registerServiceWorker();
