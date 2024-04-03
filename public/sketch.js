
    
 

    if('geolocation' in navigator){
        console.log('geolocation available');
        //document.getElementById('permission').onclick = function(){
          //  alert("button was clicked");
        navigator.geolocation.getCurrentPosition(async position => {
    let lat, lon, weather, air;
            try{
            lat = position.coords.latitude;
    lon = position.coords.longitude;
    console.log(lat);
    console.log(lon);
     document.getElementById('latitude').textContent=lat.toFixed(2);
     document.getElementById('longitude').textContent=lon.toFixed(2);
    const api_url= `/weather/${lat},${lon}`;
    const response= await fetch(api_url);
    const json = await response.json();
     weather = json.weather; 
     air = json.air_quality.results[0].sensors[0]
    document.getElementById('summary').textContent=weather.current.condition.text;
    document.getElementById('temprature').textContent=weather.current.temp_c;
    document.getElementById('location').textContent=weather.location.name;
    document.getElementById('aq').textContent=air.id;
    document.getElementById('unit').textContent=air.name;
    

    }
    catch(error){
        console.log('something went wrong');
        console.error(error);
        document.getElementById('aq').textContent='No reading';
        air = {value:-1}
    }
    const data = {lat, lon, weather, air};
        
    const options={
       method:'POST',
       headers:{
           'Content-Type':'application/json'
       },
       body:JSON.stringify(data),
    }
    const res = await fetch('/api', options);
    const indata = await res.json();
    console.log(indata);

    
});
//};

    }else{
        console.log('geolocation is not available');
    }
    

    
