const mymap = L.map('checkinMap').setView([0,0],1);
const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const tiles = L.tileLayer(tileUrl , {});
tiles.addTo(mymap);



getData();

async function getData(){
const response = await fetch('/api');
const data = await response.json();
for ( item of data){
    const marker = L.marker([item.lat, item.lon]).addTo(mymap);
    
    let txt=`The weather here in ${item.weather.location.name} with latitude: ${item.lat}° 
    longitude: ${item.lon} is  with a temprature of  ${item.weather.current.temp_c} C°.`
    
    if(item.air.value<0){
        txt += `No air quality reading.`
    }else{
        txt += `Air quality is ${item.air.id}${item.air.name}.`
    }

    marker.bindPopup(txt);
    
    // const root= document.createElement('p');
    // const date = document.createElement('div');
    // const geo = document.createElement('div');
    

    // geo.textContent=`${item.lat}°,${item.lon}°`;
    // const dateString = new Date(item.timestamp).toLocaleString();
    // date.textContent=dateString;
    
    // root.append( geo, date);
    // document.body.append(root);
}
console.log(data);
}