window.addEventListener('load', () =>{
    let lat;
    let long;

    function time(){
        const refresh = 1000;
        
        function currentTime(){
            today = new Date();
            time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
            document.querySelector('.currentTime').innerHTML=time;
            setTimeout(currentTime, refresh);
        }
        
        currentTime();
    }

    document.querySelector('.currentTime').innerHTML=time();

    function darkSky(){
        document.querySelector(".darkSky").classList.toggle('active');
        document.querySelector(".openWeather").classList.toggle('active');

        var proxy = "https://cors-anywhere.herokuapp.com/";
        var api = `${proxy}https://api.darksky.net/forecast/240a0e65cbe0b24e907f6b1eb0655235/${lat},${long}`;
        //calling api
        fetch(api)
        .then(response =>{
            //parsing string to json
            return response.json();
        })

        .then(data =>{
            console.log(data);
            var location = data.timezone;
            var temp = data.currently.temperature;
            temp = (temp - 32)*5/9;
            temp = Number(temp).toFixed(2);
            var summary = data.currently.summary;
            var today = new Date();
            //displaying result in window
            document.querySelector('.currentLocation').innerHTML=location;
            document.querySelector('.currentTemp').innerHTML=temp + " C";
            document.querySelector('.summary').innerHTML=summary;
        })
    }

    function openWeather(){
        document.querySelector(".darkSky").classList.toggle('active');
        document.querySelector(".openWeather").classList.toggle('active');

        const proxy = "https://cors-anywhere.herokuapp.com/";
            const api = `${proxy}api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&APPID=99b452ff7f185125eb45f460029fd177`;
        //calling api
        fetch(api)
        .then(response =>{
            //parsing string to json
            return response.json();
        })

        .then(data =>{
            console.log(data);
            let location = data.name;
            let temp = data.main.temp;
            let summary = data.weather[0].description;
            //displaying result in window
            document.querySelector('.currentLocation').innerHTML=location;
            document.querySelector('.currentTemp').innerHTML=temp + " C";
            document.querySelector('.summary').innerHTML=summary;
        })       
    }
    //getting position
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position =>{
            //getting position
            lat=position.coords.latitude;
            long=position.coords.longitude;
        })
        //calling openWeather as default server
        openWeather();
    }
    //on demand server
    document.querySelector(".darkSky").addEventListener('click', darkSky);
    document.querySelector(".openWeather").addEventListener('click', openWeather);
})