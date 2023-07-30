//JAVASCRIPT, OBJETO XMLHTTPREQUEST, AJAX, JSON
window.addEventListener("load", inicio);

function inicio() {
  document.getElementById("boton").addEventListener("click", cargaDatos);
}

function cargaDatos() {
    var apikey ="API_KEY";//hay que acceder a la pagina para conseguir tu apikey
    var nombre=document.getElementById("nombreCiudad").value;
    var xhr = new XMLHttpRequest();

    //Si existe el objeto xhr
    xhr.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            //cargamos un json
            cargarJSON(this);
        }
    };
    /*url de la pagina openweathermap, utilizo los siguientes parametros:
        q=nombre (que será el nombre que el usuario pone en el input text nombreCiudad
        lang=es
        appid= mi apikey
        units=metric*/
    var url="https://api.openweathermap.org/data/2.5/weather?q="+ nombre + "&lang=es&appid="+apikey+"&units=metric"; //por defecto devuelve json
    xhr.open("GET",url,true);
    xhr.send();
}
function cargarJSON(json){
    //capturar la respuesta de la solicitud
    console.log(json);
    var docJSON = JSON.parse(json.responseText);//json.responseText es una cadena que paso a formato json
    console.log(docJSON);

    //ciudad
    document.getElementById("ciudad").innerHTML=docJSON.name

    //Temperatura
    document.getElementById("temperatura").innerHTML="Temp: "+docJSON.main.temp + "°C";

    //Descripcion
    document.getElementById("desc").innerHTML=docJSON.weather[0].description;//weather es un array

    //Humedad
    document.getElementById("humedad").innerHTML="Humedad: "+docJSON.main.humidity+"%";

    //Viento
    document.getElementById("viento").innerHTML="Viento: "+docJSON.wind.speed+"m/s";

    //Img
    var icon=docJSON.weather[0].icon;
    document.getElementById("imgn").setAttribute("src","http://openweathermap.org/img/wn/"+icon+"@2x.png")


}

