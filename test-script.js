const newLocal = '.summary';
window.addEventListener('load', () => {
    let lat;
    let long;

    function time() {
        const refresh = 1000;

        function currentTime() {
            today = new Date();
            time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
            document.querySelector('.time').innerHTML = time;
            setTimeout(currentTime, refresh);
        }

        currentTime();
    }

    function darksky() {
        document.querySelector('.server').innerHTML = "darksky";

        var proxy = "https://cors-anywhere.herokuapp.com/";
        var api = `${proxy}https://api.darksky.net/forecast/8763c747e005243c042e988b881328f6/${lat},${long}`;
        //calling api
        fetch(api)
            .then(response => {
                //parsing string to json
                return response.json();
            })

            .then(data => {
                var location = data.timezone;
                var temp = data.currently.temperature;
                temp = (temp - 32) * 5 / 9;
                temp = Number(temp).toFixed(2);
                var summary = data.currently.summary;
                var today = new Date();
                //displaying result in window
                document.querySelector('.location').innerHTML = location;
                document.querySelector('.temp').innerHTML = temp + " C";
                document.querySelector('.time').innerHTML = time();
                document.querySelector(newLocal).innerHTML = summary;
            })
    }

    function openweather() {
        document.querySelector('.server').innerHTML = "openweather";

        const proxy = "https://cors-anywhere.herokuapp.com/";
        const api = `${proxy}api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&APPID=b33d3c6dbe5a3a4cde65619771f5bfdb`;
        //calling api
        fetch(api)
            .then(response => {
                //parsing string to json
                return response.json();
            })

            .then(data => {
                let location = data.name;
                let temp = data.main.temp;
                let summary = data.weather[0].description;
                //displaying result in window
                document.querySelector('.location').innerHTML = location;
                document.querySelector('.temp').innerHTML = temp + " C";
                document.querySelector('.time').innerHTML = time();
                document.querySelector('.summary').innerHTML = summary;
            })
    }
    //getting position
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            //getting position
            lat = position.coords.latitude;
            long = position.coords.longitude;
        })
        //calling openWeather as default server
        openweather();
    }
    //on demand server
    document.querySelector(".darksky").addEventListener('click', darksky);
    document.querySelector(".openweather").addEventListener('click', openweather);
})