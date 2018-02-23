export function convertUnixDate(unixDate, type) {
    var date = new Date(unixDate*1000);
    if(type) {
        var hours = ('0' + date.getHours()).slice(-2);
        var minutes = ('0' + date.getMinutes()).slice(-2);
        var formattedTime = hours + ':' + minutes;

        return formattedTime;
    } else {
        var year = date.getFullYear();
        var month = ('0' + (date.getMonth() + 1)).slice(-2);
        var day = ('0' + date.getDate()).slice(-2);
        var formattedDate = year + '-' + month + '-' + day;

        return formattedDate;
    }
}