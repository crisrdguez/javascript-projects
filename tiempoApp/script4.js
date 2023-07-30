//JAVASCRIPT, JQUERY, JSON
$(document).ready(inicio);

function inicio(){
    $("#boton").click(function(){
        var nombre=$("#nombreCiudad").val();

        var parametros ={
            "q":nombre,
            "appid":"API_KEY",           
            "units":"metric",
            "lang":"es"
        }
        $.ajax({
            url:"https://api.openweathermap.org/data/2.5/weather",
            data: parametros,
            success: function(respuesta){//ya me devuelve la respuesta en formato json
                console.log(respuesta);
                cargarJSON(respuesta);
            },
            error: function(){
                alert("ha ocurrido un error");
            }
        });
    });
}
function cargarJSON(json){
    //ciudad
    $("#ciudad").text(json.name);

    //Temperatura
    $("#temperatura").text("Temp: "+json.main.temp + "°C");

    //Descripcion
    $("#desc").text(json.weather[0].description);

    //Humedad
    $("#humedad").text("Humedad: "+json.main.humidity+"%");

    //Viento
    $("#viento").text("Viento: "+json.wind.speed+"m/s");

    //Img
    var icon=json.weather[0].icon;
    $("#imgn").attr("src","http://openweathermap.org/img/wn/"+icon+"@2x.png");

    //animo el icono para practicar jquery
    $("#imgn").animate({marginLeft:"300px"},2000);
    $("#imgn").animate({marginLeft:"0px"},2000);
}