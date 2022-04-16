
var cityname;
var lon;
var lat;
var error;

function home(){
  window.location.href = '/index.html'; 
}

document.getElementById("form").addEventListener("submit", function () {
  event.preventDefault();
  cityname = document.getElementById("cityname").value;
  fectchdata(cityname);
  document.getElementById("cityname").value = "";
});

async function fectchdata(cityname) {
  const URL = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${cityname}&appid=bd8a6ff2c2d193e1ce4bf9b5787bc054`
  );
  const data = await URL.json();

  if (data.base == "stations") {
    buildTodaysDOM(data);
    buildMapDOM(cityname);
    lon = data.coord.lon;
    lat = data.coord.lat;
  } else if (data.cod == "404") {
    error = "Wrong city input";
    lon = error;
    lat = error;
    alert("Wrong city input");
    buildTodaysDOM(error);
    buildMapDOM(error);
  }
}

function buildTodaysDOM(obj) {
  //BUILD DOM FOR TOP SECTION
  if (obj === error) {
      document.getElementById('left').innerHTML = null;
      let lostCity = document.createElement('img');
      lostCity.setAttribute('id', 'lostcity')
      lostCity.src = 'https://cdn.dribbble.com/users/1537480/screenshots/7199901/media/04f1bc09a3a16f5efc155fe9ea829cbc.png?compress=1&resize=1200x900&vertical=top'
      document.getElementById('left').append(lostCity)

  } 
  else {
    document.getElementById("left").innerHTML = null;

    let temp = Math.round(obj.main.temp - 273.12); 

    let box = document.createElement("div");
    box.setAttribute("class", "box");
    if(temp < 0){
        box.style.backgroundImage = "url('https://cdn.dribbble.com/users/2703034/screenshots/6029024/media/ae48f62ee28a4a1d5efdca500fd1d1ae.gif')";
        box.style.color = '#505050';
    }
    else if(temp > 0 && temp < 10){
        box.style.backgroundImage = "url('https://cdn.dribbble.com/users/110792/screenshots/16347149/media/259221a2a2eebe28a88bf7b8a6d9e538.png?compress=1&resize=1200x900&vertical=top')";
        box.style.color = '#f5f5f5';
    }
    else if(temp > 10 && temp < 20){
        box.style.backgroundImage = "url('https://cdn.dribbble.com/users/1072657/screenshots/4091812/media/5979073459141a0ca4dd457d5e4db8a2.gif')";
        box.style.color = '#ffff';
    }
    else if(temp > 20 && temp < 40){
        box.style.backgroundImage = "url('https://cdn.dribbble.com/users/2643208/screenshots/8214155/media/cef00a115120e7f27e9d57bb0c031301.gif')";
        box.style.color = '#ffff';
    }
    else if(obj.weather[0].main === 'Rain'){
        box.style.backgroundImage = "url('https://cdn.dribbble.com/users/568868/screenshots/14965476/media/5b9b31c6ca8b27aad4c556aa92f80a77.gif')";
        box.style.color = '#505050';
    }
    else if(obj.weather[0].main === 'Thunderstorm'){
        box.style.backgroundImage = "url('https://cdn.dribbble.com/users/1884981/screenshots/4633011/media/7c8759e92e54c9c7090c96076cbb5f9b.gif')";
        box.style.color = '#505050';
    }
    else {
        box.style.backgroundImage = "url('https://cdn.dribbble.com/users/2576691/screenshots/15115092/media/1bdd24f080037733b4dd0bcb9a4460ca.jpg?compress=1&resize=1200x900&vertical=top')";
        box.style.color = '#fff';
    }
 
    let upper = document.createElement("div");
    upper.setAttribute("class", "upper");
    let cloudLogo = document.createElement("div");
    let cloud = document.createElement("img");
    cloud.src = "/cloudLogo.png";
    let per = document.createElement("h6");
    per.textContent = `${obj.clouds.all}%`;
    cloudLogo.append(cloud, per);
    let weatherP = document.createElement("p");
    let sp1 = document.createElement("span");
    sp1.textContent = `What's the`;
    let sp2 = document.createElement("span");
    sp2.textContent = "weather today!";
    weatherP.append(sp1, sp2);
    let location = document.createElement("div");
    let city = document.createElement("h4");
    city.textContent = obj.name;
    let icon = document.createElement("i");
    icon.setAttribute("class", "fa-solid fa-location-dot");
    location.append(icon, city);
    upper.append(cloudLogo, weatherP, location);

    let middle = document.createElement("div");
    middle.setAttribute("class", "middle");
    let mLeft = document.createElement("div");
    let mh1 = document.createElement("h1");
    mh1.textContent = `${Math.round(obj.main.temp - 273.12)}˚C`;
    let mp1 = document.createElement("p");
    mp1.textContent = obj.weather[0].main;
    mLeft.append(mh1, mp1);

    let mRight = document.createElement("div");
    let mtop = document.createElement("h3");
    mtop.textContent = `${Math.round(obj.main.temp_max - 273.12)}˚C`;
    let mbottom = document.createElement("h3");
    mbottom.textContent = `${Math.round(obj.main.temp_min - 273.12)}˚C`;
    mRight.append(mtop, mbottom);
    middle.append(mLeft, mRight);

    let condition = document.createElement("div");
    condition.setAttribute("class", "coniditon");
    let cleft = document.createElement("h4");
    var sunrise = obj.sys.sunrise;

    var date = new Date(sunrise * 1000);
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var formatTime = hours + ":" + minutes.toString().padStart(2, "0");
    cleft.textContent = `🌤  Sunrise : ${formatTime}`;

    let cright = document.createElement("h4");
    var sunset = obj.sys.sunset;
    var date2 = new Date(sunset * 1000);
    var hours2 = date2.getHours();
    var minutes2 = date2.getMinutes();
    var formatTime2 = hours2 + ":" + minutes2.toString().padStart(2, "0");
    cright.textContent = `🌘 Sunset : ${formatTime2}`;
    condition.append(cleft, cright);

    let bottom = document.createElement("div");
    bottom.setAttribute("class", "bottom");
    let bleft = document.createElement("div");
    let blP1 = document.createElement("p");
    blP1.textContent = "Pressure";
    let blh3 = document.createElement("h3");
    blh3.textContent = `${obj.main.pressure}mb`;
    bleft.append(blP1, blh3);

    let bmiddle = document.createElement("div");
    let bmP1 = document.createElement("p");
    bmP1.textContent = "Visibility";
    let bmh3 = document.createElement("h3");
    bmh3.textContent = `${obj.visibility / 1000} km`;
    bmiddle.append(bmP1, bmh3);

    let bright = document.createElement("div");
    let brP1 = document.createElement("p");
    brP1.textContent = "Humidity";
    let brh3 = document.createElement("h3");
    brh3.textContent = `${obj.main.humidity}%`;
    bright.append(brP1, brh3);
    bottom.append(bleft, bmiddle, bright);

    box.append(upper, middle, condition, bottom);
    document.getElementById("left").append(box);
  }
}

function buildMapDOM(x) {
  if (x === cityname) {
    document.getElementById("right").innerHTML = null;
    let map = document.createElement("iframe");
    map.src = `https://maps.google.com/maps?q=${cityname}&t=&z=13&ie=UTF8&iwloc=&output=embed`;
    document.getElementById("right").append(map);
  } else if (x === error) {
    document.getElementById("right").innerHTML = null;
    let locationlost = document.createElement("img");
    locationlost.src =
      "https://cdn.dribbble.com/users/1600801/screenshots/3305058/media/ff1e7d87851f5ce92a5997da93d9da34.gif";
    document.getElementById("right").append(locationlost);
  }

  // // below isn't a api but rather just an url
  // let ifram = document.querySelector('iframe');
  // ifram.src = `https://maps.google.com/maps?q=${cityname}&t=&z=13&ie=UTF8&iwloc=&output=embed`;
}

function sevendays() {
  if (lat === undefined && lon === undefined) {
    alert("Please enter cityname");
  } else if (lat === error && lon === error) {
    alert(error);
    cityname = "";
    lat = undefined;
    lon = undefined;
    document.getElementById('allReports').innerHTML = null; 
  } else {
    //HERE DATA IS PRESENT TP BUILD THE DOM
    // CALL THE 2ND API FROM HERE
    fetchseven(); 
    async function fetchseven(){
        let URL =  await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=bd8a6ff2c2d193e1ce4bf9b5787bc054`); 
        let data = await URL.json(); 

        document.getElementById('allReports').innerHTML = null; 
        let weatherBox = document.createElement('div');
        weatherBox.setAttribute('id', 'weatherBox'); 
        let top = document.createElement('div')
        top.setAttribute('id', 'top')
        let bottom = document.createElement('div');
        bottom.setAttribute('id', 'bottom')
        let text = document.createElement('h1'); 
        text.textContent = `The weather forcast for seven days of ${cityname}`; 
        top.append(text); 
        weatherBox.append(top);

        data.daily.map(function(ele){
            const weekDay = new Date(ele.dt * 1000).toLocaleString("en-us", {
                weekday: "long"
            });

            let forcastBox = document.createElement('div'); 
            forcastBox.setAttribute('class', 'forcastBox'); 

            let day = document.createElement('h2');
            day.textContent = weekDay; 

            let status = document.createElement('img'); 
            status.src = `http://openweathermap.org/img/wn/${ele.weather[0].icon}@2x.png`;

            let maxTemp = document.createElement('p'); 
            maxTemp.textContent =  `${Math.round(ele.temp.max - 273.12)}˚C`;

            let minTemp = document.createElement('p');
            minTemp.textContent = `${Math.round(ele.temp.min - 273.12)}˚C`; 

            let todayaHumidity = document.createElement('p'); 
            todayaHumidity.textContent = `💧 ${ele.humidity}%`; 

            forcastBox.append(day, status, maxTemp, minTemp, todayaHumidity); 
            
            bottom.append(forcastBox); 

        });

        weatherBox.append(bottom); 
        document.getElementById('allReports').append(weatherBox); 

        
         
    }
  }
}

