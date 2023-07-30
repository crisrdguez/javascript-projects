//JAVASCRIPT, OBJETO XMLHTTPREQUEST, AJAX, XML
window.addEventListener("load", inicio);

function inicio() {
  console.log("Entra en inicio");
  document.getElementById("boton").addEventListener("click", cargaDatos);
}

function cargaDatos() {
    var apikey ="API_KEY";
    var nombre=document.getElementById("nombreCiudad").value;
    var xhr = new XMLHttpRequest();

    //Si existe el objeto xhr
    xhr.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            //cargamos un xml
            cargarXML(this);
        }
    };
    /*url de la pagina openweathermap, utilizo los siguientes parametros:
        q=nombre (que será el nombre que el usuario pone en el input text nombreCiudad
        lang=es
        appid= mi apikey
        mode=xml
        units=metric*/
    var url="https://api.openweathermap.org/data/2.5/weather?q="+ nombre + "&lang=es&appid="+apikey+"&mode=xml&units=metric";
    
    //procesamos la solicitud
    xhr.open("GET",url,true);//Abrimos la url, true=ASINCRONA 
    xhr.send();//send envia la solicitud al servidor
}

function cargarXML(xml){
    //capturar la respuesta de la solicitud
    var docXML = xml.responseXML;
    console.log(docXML);

    var ciudades = docXML.getElementsByTagName("city");
    var city = ciudades[0].getAttribute("name");
    document.getElementById("ciudad").innerHTML=city;

    //Temperatura
    var temperatura = docXML.getElementsByTagName("temperature");
    var temp = temperatura[0].getAttribute("value");
    document.getElementById("temperatura").innerHTML=temp + "°C";

    //Descripcion
    var descripcion = docXML.getElementsByTagName("weather");
    var desc = descripcion[0].getAttribute("value");
    document.getElementById("desc").innerHTML=desc;

    //Humedad
    var humedad = docXML.getElementsByTagName("humidity");
    var hum = humedad[0].getAttribute("value") + " "+humedad[0].getAttribute("unit");
    document.getElementById("humedad").innerHTML="Humedad: "+hum;

    //Viento
    var viento = docXML.getElementsByTagName("wind")[0].childNodes;
    var vi = viento[0].getAttribute("value")+viento[0].getAttribute("unit");
    document.getElementById("viento").innerHTML="Viento: "+vi;

    //Img
    var icon=descripcion[0].getAttribute("icon");
    document.getElementById("imgn").setAttribute("src","http://openweathermap.org/img/wn/"+icon+"@2x.png")

}