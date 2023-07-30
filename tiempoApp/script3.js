//JAVASCRIPT, JQUERY, XML
$(document).ready(inicio);

function inicio(){
    $("#boton").click(function(){
        var nombre=$("#nombreCiudad").val();

        var parametros ={
            "q":nombre,
            "appid":"API_KEY",
            "mode":"xml",//es necesario especificar mode si queremos xml
            "units":"metric",
            "lang":"es"
        }
        //$.ajax: tiene un conjunto completo de parametros - buscar en la api
        $.ajax({
            url:"https://api.openweathermap.org/data/2.5/weather",
            data: parametros,
            success: function(respuesta){//ya me devuelve la respuesta en formato xml, por lo que luego no hay que usar .responseXML
                cargarXML(respuesta);
            },
            error: function(){
                alert("ha ocurrido un error");
            }
        });
    });
}



function cargarXML(docXML){

    var city=$(docXML).find("city").attr("name");//con .find busco en city el atributo name y lo guardo en la variable city
    $("#ciudad").text(city);
    
    //Temperatura
    var temperatura = docXML.getElementsByTagName("temperature");
    var temp = temperatura[0].getAttribute("value");
    $("#temperatura").text(temp + "°C");

    //Descripcion
    var descripcion = docXML.getElementsByTagName("weather");
    var desc = descripcion[0].getAttribute("value");
    $("#desc").text(desc);

    //Humedad
    var humedad = docXML.getElementsByTagName("humidity");
    var hum = humedad[0].getAttribute("value") + " "+humedad[0].getAttribute("unit");
    $("#humedad").text("Humedad: "+hum);

    //Viento
    var viento = docXML.getElementsByTagName("wind")[0].childNodes;
    var vi = viento[0].getAttribute("value")+viento[0].getAttribute("unit");
    $("#viento").text("Viento: "+vi);

    //Img
    var icon=descripcion[0].getAttribute("icon");
    $("#imgn").attr("src","http://openweathermap.org/img/wn/"+icon+"@2x.png");
    //document.getElementById("imgn").setAttribute("src","http://openweathermap.org/img/wn/"+icon+"@2x.png")

}
