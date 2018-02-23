export function checkWindDeg(wind) {
    switch(true) {
        case (wind > 337.5 || wind < 22.5):
            return 'N';
        case (wind > 22.5 && wind < 67.5):
            return 'NE';
        case (wind > 67.5 && wind < 112.5):
            return 'E';
        case (wind > 112.5 && wind < 157.5):
            return 'SE';
        case (wind > 157.5 && wind < 202.5):
            return 'S';
        case (wind > 202.5 && wind < 247.5):
            return 'SW';
        case (wind > 247.5 && wind < 292.5):
            return 'W';
        case (wind > 292.5 && wind < 337.5):
            return 'NW';
        default:
            return 'N/a';                
    }
}