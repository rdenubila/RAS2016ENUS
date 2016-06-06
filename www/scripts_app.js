
var deviceReady = false;
var jqueryReady = false;

var urlVideo = "http://2015report.cemig.com.br/video/en/";

console.log("Script App");

$(document).ready(function($) {
	
	console.log("Pront Jquery");

	jqueryReady = true;
	checkReady();

});


document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {

	console.log("Pront Device");

    deviceReady = true;
	checkReady();

	setTimeout(function() {
		navigator.splashscreen.hide();
	}, 1000);

}

function checkReady(){

	if(jqueryReady && deviceReady){

		init();

	}

	init();

}

function init(){

	$("#video_intro").html('<video id="video_player" width="100%" height="100%" autoplay="false" webkit-playsinline><source src="'+urlVideo+'video.mp4" type="video/mp4"><source src="'+urlVideo+'video.webm" type="video/webm"><source src="'+urlVideo+'video.ogg" type="video/ogg"></video>');

	//$('body').prepend("<a href='javascript: void(0)' id='play_btn' onClick='$(this).fadeOut(); $(\"#video_player\")[0].play();' style='display: block; position: absolute; width: 100%; height: 100%; background: url(images/bgs/"+idioma+"/capa_play.jpg) center center; background-size: cover; z-index: 100;'></a>");

	iniciaVideo();

	//FECHAR VIDEO SE NAO ESTIVER NA WIFI
	//fechaVideo();
	
	if(navigator.connection!=undefined && navigator.connection.type!=Connection.WIFI){
		fechaVideo();
		$("#play_btn").hide();
	}


}


