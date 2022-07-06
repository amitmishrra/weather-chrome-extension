
const box = document.querySelector(".box");
input = box.querySelector(".inp");
inf = input.querySelector(".inf");
inf = input.querySelector(".inf");
inputField = input.querySelector("input");
locationBtn = input.querySelector(".btn");
WIcon = document.querySelector(".weather-part img");

// arrow = box.querySelector("header i");

let api;

inputField.addEventListener("keyup", e=>{
    if(e.key=="Enter" && inputField.value != ""){
       requestApi(inputField.value); 
    }
});


locationBtn.addEventListener("click", ()=>{
   if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(onSuccess, onError);
   } 
   else{
       alert("Your Browser does not support geolocation api");
   }
})

function onSuccess(position){
    const{ latitude, longitude}= position.coords;
    api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${"c29049d28c28d48ad357295e904b8bde"}`;
    fetchData();
}


function onError(error){
    inf.innerHTML = error.message;
    inf.classList.add("error")
}



function requestApi(city){
    api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${"c29049d28c28d48ad357295e904b8bde"}`
    fetchData();
}

function fetchData(){
    inf.innerHTML = "Getting weather details...."
    inf.classList.add("pending");
    fetch(api).then(response => response.json()).then(result => weatherDeatails(result));
}


function weatherDeatails(info){
 
    if(info.cod=="404"){
        inf.innerHTML =`${inputField.value} is'nt valid city name;`
         inf.classList.replace("pending","error");;  
    }
    else{
      const city = info.name; 
      const country = info.sys.country; 
      const {description, id} = info.weather[0]; 
      const {feels_like, humidity, temp} = info.main; 


if(id==800){
       WIcon.src= "icons/clear.svg"
}

else if(id>= 200 && id <= 232){
    WIcon.src= "icons/storm.svg"
}
else if(id>= 600 && id <= 622){
    WIcon.src= "icons/snow.svg"
}
else if(id>= 701 && id <= 781){
    WIcon.src= "icons/haze.svg"
}
else if(id>= 801 && id <= 804){
    WIcon.src= "icons/cloud.svg"
}
else if((id>= 300 && id <= 321) || (id>= 500 && id <= 531) ){
    WIcon.src= "icons/rain.svg"
}



    box.querySelector(".temp .numb").innerText= Math.floor(temp);
    box.querySelector(".weather ").innerText= description;
    box.querySelector(".location span").innerText= `${city}, ${country}`;
    box.querySelector(".temp .numb-2").innerText= Math.floor(feels_like);
    box.querySelector(".humidity span").innerText= `${humidity}%`;

     




        inf.classList.remove("pending","error");
        box.classList.add("active")
    }
    console.log(info);
}

// arrow.addEventListener("click", ()=>{
//     box.classList.remove("active");
// });

