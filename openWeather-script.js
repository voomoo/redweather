window.addEventListener('load', () =>{
    let lat;
    let long;

    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position =>{
            //getting position
            lat=position.coords.latitude;
            long=position.coords.longitude;
            //setting proxy for live server
            const proxy = "https://cors-anywhere.herokuapp.com/";
            const api = `${proxy}api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&APPID=b33d3c6dbe5a3a4cde65619771f5bfdb`;
            //calling api
            fetch(api)
                .then(response =>{
                    //parsing string to json
                    return response.json();
                })

                .then(data =>{
                    // console.log(data);
                    let location = data.name;
                    let temp = data.main.temp;
                    // temp = (temp - 32)*5/9;
                    let summary = data.weather[0].description;
                    
                    //displaying result in window
                    document.querySelector('.location').innerHTML=location;
                    document.querySelector('.temp').innerHTML=temp + " C";
                    document.querySelector('.time').innerHTML=time();
                    document.querySelector('.summary').innerHTML=summary;
                })
        })
    }
    function time(){
        const refresh = 1000;
        let today = new Date();
        let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        function currentTime(){
            today = new Date();
            time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
            document.querySelector('.time').innerHTML=time;
            setTimeout(currentTime, refresh);
        }
        currentTime();
    }
})