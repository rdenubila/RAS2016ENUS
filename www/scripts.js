// JavaScript Document



var isIE = false;

if (navigator.userAgent.match(/msie/i) || navigator.userAgent.match(/trident/i) ){

    isIE = true;

	// function stopError() {
	// return true;
	// }
	// window.onerror = stopError;

} 




//idioma = "en";



//isIE = true;



var swiperCapitulos;

var xmlCont;

var local = true;

var touch = true;

var carregaTotal = false;

var extensao = ".php";

var include_dir = "includes/";

var completo = true;

if(localStorage.getItem("completo")!=null){
	completo = localStorage.getItem("completo")=="true";
}

/*

if(isIE){

	include_dir = "includes/ie/";

	touch = true;

} else {

	include_dir = "includes/padrao/";

}*/


if(extensao==".php"){

	include_dir = "";

}

//alert($(window).width());
if( $(window).width()<690 ){
	$('meta[name=viewport]').attr('content','width=device-width initial-scale=0.6, maximum-scale=0.6, minimum-scale=0.6, user-scalable=no, minimal-ui=1');
}


function abreIcones(){

	w = 0;

	$("#menu_esquerdo li").each(function(index, el) {

		w += $(this).width();

	});

	$("#menu_esquerdo").stop().animate({width: w+"px"}, "fast");

}



function fechaIcones(){

	w = $("#menu_esquerdo .menu").width();

	$("#menu_esquerdo").stop().animate({width: w+"px"}, "fast");

}



var ultimoClicado = "";

function abreSub(area){



	if(area!=ultimoClicado){

		$(".menos").removeClass('menos');

		$("#menu_principal ul").slideUp('fast');

	}



	if($("#mais_"+area).hasClass('menos')){

		$("#mais_"+area).removeClass('menos');

		$("#sub_"+area).slideUp('fast');

	} else {

		$("#mais_"+area).addClass('menos');

		$("#sub_"+area).slideDown('fast');

	}



	ultimoClicado = area;

}



function abreMenu(){

	$("#wrapper_menu").removeClass('fechado');

	$("#wrapper").addClass('aberto');

	$(".menu").addClass('aberto');



	$( "#wrapper" ).bind( "mousedown", function() {

		fechaMenu();

	});

}



function fechaMenu(){

	$("#wrapper_menu").addClass('fechado');

	$("#wrapper").removeClass('aberto');

	$(".menu").removeClass('aberto');



	$( "#wrapper" ).unbind( "mousedown" );



	fechaBusca();

}



function menuSobre(){



	if($("#menu_sobre").is(":visible")){

		fechaSobre();

	} else {

		abreSobre();

	}



	

}



function abreSobre(){

	$("#menu_sobre").slideDown();

	$( "#wrapper" ).bind( "mousedown", function() {

		fechaSobre();

	});

}



function fechaSobre(){

	$("#menu_sobre").slideUp();

	$( "#wrapper" ).unbind( "mousedown" );

}



var dirAtual = "";

function selDiretoria(area){



	h = $(".diretores").height();





	$(".btn_diretoria").each(function( index ) {

		//console.log($(this).outerHeight());

		h -= $(this).outerHeight();

	});



	$('#'+dirAtual).animate({height: '0px'}, 'normal');





	if(area!=dirAtual){

		$('#'+area).stop().animate({height: h+'px'}, 'normal');

		dirAtual = area;

	} else {

		dirAtual = "";

	}



	

}



var ultimaNota = "";

function mostra_nota(id_nota){



	$(".nota").fadeOut();



	if(ultimaNota!=id_nota){

		o = $("#"+id_nota);

		p = $("#link_"+id_nota).offset();

		

		atual = $(swiperCapitulos.activeSlide()).find('.conteudo_capitulo');



		if( o.parents(".tabela").length==0 ){

			l = p.left - o.width()/2 + 5;

			t = p.top - o.height() - 90 + 3 + atual.scrollTop();

		} else {

			p = $("#link_"+id_nota).position();

			l = p.left - o.width()/2;

			t = p.top - o.height() - 40;

			if(t<50){

				s = $("#"+id_nota).find('.seta_nota');

				s.css("margin-top", -o.height()-8 );

				$("#"+id_nota).addClass('nota_baixo');

				t = p.top + 35;

			}



			if(l<0){

				s = $("#"+id_nota).find('.seta_nota');

				s.css("margin-left", -20+l);

				//.addClass('nota_baixo');

				l = 0;

			}

		}



		$("#"+id_nota).css( 'left', l);

		$("#"+id_nota).css( 'top', t);



		$("#"+id_nota).fadeIn();



		ultimaNota = id_nota;

	} else {

		ultimaNota = "";

	}

}



function abreFoto(id){



	if($("#thumb_"+id).find(".link_thumb").hasClass('menos')){

		fechaFoto(id);

	} else {



		var hmax = $("#container").height() * 0.9;

		var wmax = $("#container").width() * 0.75;



		var o = $("#"+id);



		var p1 = hmax/o.attr('data-alt');

		var p2 = wmax/o.attr('data-larg');

		var p = Math.min(p1,p2)



		o.html("<img src='fotos/"+o.attr('data-file')+"' width='100%' />");

		o.append("<div class='legenda' >"+o.attr('data-legenda')+"</div>");



		o.css({opacity: 0});

		o.show();

		o.animate({width: o.attr('data-larg')*p, height: o.attr('data-alt')*p, opacity: 1});

		



		$("#thumb_"+id).find(".img").animate({opacity: 0});



		$("#thumb_"+id).find(".link_thumb").addClass('menos');

		$("#thumb_"+id).find(".link_thumb").css("z-index", '3');



		pos_scroll = $("#thumb_"+id).position().top + $(swiperCapitulos.activeSlide()).find('.conteudo_capitulo').scrollTop() - $("#container").height() + 130;

		

		$(swiperCapitulos.activeSlide()).find('.conteudo_capitulo').animate({scrollTop: pos_scroll} );



	}

}



function fechaFoto(id){

	var o = $("#"+id);

	$("#thumb_"+id).find(".link_thumb").removeClass('menos');

	$("#thumb_"+id).find(".link_thumb").css("z-index", '1');

	o.animate({width: 0, height: 0, opacity: 0});

	$("#thumb_"+id).find(".img").animate({opacity: 1});

}



function topo(){

	$(swiperCapitulos.activeSlide()).find('.conteudo_capitulo').animate({scrollTop: 0}, 'fast' );

}



var ultimoGRI = "";

function mostraGRI(id, elem){

	//console.log($("#info_"+id));

	//console.log($(elem).position().top);

	obj = $(elem).parents('.gri_grupo').find('.gri_info').eq(id);



	if(obj.attr('id')!=ultimoGRI){

		fechaGRI();



		obj.css("margin-top", $(elem).position().top+"px")

		obj.fadeIn();

		obj.addClass("gri_aberto");



		$( "#wrapper" ).bind( "mousedown", function() {

			fechaGRI();

		});



		ultimoGRI = obj.attr('id');

	

	} else {

		fechaGRI();

	}

}



function fechaGRI(){

	$(".gri_aberto").removeClass("gri_aberto").fadeOut("slow" , function () {

		ultimoGRI = "";

 	});

	$( "#wrapper" ).unbind( "mousedown" );

	

}



function ajustaGRI(){

	$(".txt_gri").each(function( index ) {

		

		h = $(this)[0].scrollWidth;



		$(this).parent().height( h );

		$(this).css('margin-top', (h-26-3)+'px');



		/*

		h = $(this).width()+20;

		$(this).parent().height( h );

		$(this).parent().width(26);

		$(this).width(26);

		//$(this).css('top', h/2+'px');

		*/



	});

}



function verGRI(gri){



	id = 14;

	area = gri;



	atual = $(swiperCapitulos.activeSlide()).find('.conteudo_capitulo');



	location.hash = "#/"+swiperCapitulos.activeIndex+"/scr-"+atual.scrollTop();



	location.hash = "#/"+id+"/gri-"+area;



}



function mostraBusca(){

	if($("#resultado_busca").is(":visible")){

		fechaBusca();

	} else {

		abreBusca();

	}

	

}



function fechaBusca(){

	$("#busca").addClass("fechado");

	$("#btn_busca").removeClass("icon-voltar");

	$("#btn_busca").addClass("icon-busca");

	$("#resultado_busca").fadeOut();

}



function abreBusca(){



	$("#resultado_busca .conteudo").html("");

	$("#busca_txt").val("");



	$("#busca").removeClass("fechado");

	$("#btn_busca").addClass("icon-voltar");

	$("#btn_busca").removeClass("icon-busca");

	$("#resultado_busca").fadeIn();

}



result_enc = 0;

function buscar(){

	palavra = $("#busca_txt").val().toLowerCase();



	iCap = 0;



	$("#resultado_busca .conteudo").html("");

	$(".destaque_busca").removeClass("destaque_busca");



	if(palavra.length>2){

		qtdResultado = 0;



		q = removerAcentos(palavra);

		console.log(q);


		for(i=0; i<xmlCont.length; i++){



			c = $(xmlCont[i]).find('subconteudo');


			



			for(j=0; j<c.length; j++){

				tit = removerAcentos($(c[j]).attr("titulo")).toLowerCase();

				if( tit.indexOf(q)>=0 ){

						qtdResultado++;

						txt = "<a href='javascript: void(0);' onClick='mostraResultado("+(i+1)+", "+$(c[j]).attr("id")+", this);'>"

						txt += "<h2>"+$(c[j]).attr("titulo")+"</h2>";

						txt += "<hr />";

						txt += "</a>";


						$("#resultado_busca .conteudo").append(txt);

				}

				t = ajustaBusca( $(c[j]).text() );

				t2 = $(c[j]).text();



				t = $($.parseHTML(t)).filter("p");

				t2 = $($.parseHTML(t2)).filter("p");





				for(k=0; k<t.length; k++){



					p = t[k].outerHTML;
				

					if( p!=undefined && p.indexOf(q)>=0 ){

						qtdResultado++;



						r = strip_tags( t2[k].outerHTML , "");



						position = strip_tags(p).indexOf(q);

						r = [r.slice(0, position+q.length), '</span>', r.slice(position+q.length)].join('');

						r = [r.slice(0, position), '<span class="destaque_busca">', r.slice(position)].join('');



						txt = "<a href='javascript: void(0);' onClick='mostraResultado("+(i+1)+", "+$(c[j]).attr("id")+", this);'>"

						txt += "<h2>"+$(c[j]).attr("titulo")+"</h2>";

						txt += "<p>"+ r +"</p>";

						txt += "<hr />";

						txt += "</a>";



						$("#resultado_busca .conteudo").append(txt);		



					}



				}



				



			}



		}



		/*

		$("#container .conteudo").each(function( index ) {

			iCap++;



			paragrafos = $( this ).find("p:contains('"+palavra+"')" );



			paragrafos.each(function( index ) {

				qtdResultado++;

				result_enc++;



				paragrafo = $( this );

				paragrafo.attr("id", "titulo_res_"+result_enc);

				

				//paragrafo.css("text-decoration", 'underline');

				paragrafo.html( paragrafo.html().replace(palavra, "<span class='destaque_busca'>"+palavra+"</span>"));



				h1 = paragrafo;



				if(h1.prev().length>0){

					h1 = h1.prev();

				} else {

					h1 = h1.parent();

				}



				limiteParagrafo = 0;

				while( !(h1.is('H1') || h1.is('H2') ) && limiteParagrafo<100 ){

					if(h1.prev().length>0){

						h1 = h1.prev();

					} else {

						h1 = h1.parent();

					}

					limiteParagrafo++;

				}



				//h1.css("text-decoration", 'underline');



				txt = "<a href='javascript: mostraResultado("+iCap+", "+result_enc+"); void(0);'>"

				txt += "<h2>"+h1.html()+"</h2>";

				txt += "<p>"+strip_tags(paragrafo.html(), "")+"</p>";

				txt += "<hr />";

				txt += "</a>";



				txt = txt.replace(palavra, "<span class='destaque_busca'>"+palavra+"</span>")



				$("#resultado_busca .conteudo").append(txt);

			});



		});



		*/



		if(qtdResultado==0){

			$("#resultado_busca .conteudo").html("<h2>Sua busca não retornou nenhum resultado.</h2>");

		}



	} else {

		alert("Sua busca deve ter 3 ou mais caracteres.");

	}

}





busca_palavra = "";

function mostraResultado(id, area, obj){



	busca_palavra = $(obj).find("span").html();



	//area = "res_"+area;

	location.hash = "#/"+id+"/"+area;

	

	/*

	if(swiperCapitulos.activeIndex != id ){

		swiperCapitulos.swipeTo(id);

		tempo = 400;

	} else {

		tempo = 0;



	}



	atual = $(swiperCapitulos.activeSlide()).find('.conteudo_capitulo');





	if($("#titulo_"+area).length>0){

		dest = ( atual.scrollTop()  + $("#titulo_"+area).position().top ) - 50;



	} else {

		dest = atual[0].scrollHeight;

	}



	atual.delay(tempo).animate({scrollTop: dest }, 'slow' );

	*/



	fechaMenu();

	fechaBusca();



}



function linkTarget(){

	$('.conteudo a').each(function(index, el) {

		if( $(this).attr('href')!=undefined && $(this).attr('href').indexOf("http")>=0 ){

			$(this).attr('target', '_blank');

		}

	});

}



function carregaConteudo(){

	//xmlCont = $.parseXML( xml );

	//console.log("carregando conteudo");

	urlFile = local ? 'includes/dados.xml' : 'includes/dados'+extensao+"?idioma="+idioma;

	$.ajax({

		url: urlFile,

		type: "GET",

		dataType: "xml"

	}).done(function (result) {

		xmlCont = $(result).find("conteudo");

		trocaCompleto(completo, false);
		carregaMenu();

		carregaConteudoSlider(13);



	}).fail( function(xhr, textStatus, errorThrown) {

        console.log(errorThrown);

    });



    //$(".hide .gri").load("includes/tabelas/tabela.php?id=430");



}



function carregaMenu(){

	$("#menu_principal").html("");



	for(i=0; i<xmlCont.length; i++){

		cont = $(xmlCont[i]).find('subconteudo');


		if(!impressao){
			$(".barra_topo").eq(i+1).html( $(xmlCont[i]).attr('titulo') );
			$(".capa_capitulo").eq(i-3).find(".titulo").html( $(xmlCont[i]).attr('titulo') );
		}



		$("#menu_principal").append('<li><a href="#" id="mais_'+i+'" onclick="abreSub(\''+i+'\'); return false;" class="mais"></a><a href="#" onclick="moveCapitulo('+(i+1)+'); return false;">'+$(xmlCont[i]).attr('titulo')+'</a></li>');



		html = ('<ul id="sub_'+i+'">');



		for(j=0; j<cont.length; j++){

			d = $(cont[j]);

			if(completo || d.attr('completo')=='s'){

				html += ('<li><a href="#" onclick="moveSubCapitulo('+(i+1)+', \''+d.attr('id')+'\'); return false;">'+d.attr('titulo')+'</a></li>');

			}


		}



		html += ('</ul>');



		$("#menu_principal").append(html);

		

	}



}



function atualizaScrollTabela(){

	/*

	if(touch){

		$('.conteudo_capitulo, .conteudo_mensagem_scroll, .fotos_diretoria, #menuScroll').css({

			'overflow-y': 'scroll',

			'-webkit-overflow-scrolling': 'touch'

		});



		$('.tabela').css({

			'overflow-x': 'scroll',

			'-webkit-overflow-scrolling': 'touch'

		});



	} else {

		$('.conteudo_capitulo, .conteudo_mensagem_scroll, .fotos_diretoria, #menuScroll').perfectScrollbar({

			wheelSpeed: 50

			//suppressScrollX: true

		});



		$('.tabela').perfectScrollbar({

			wheelSpeed: 50

		});

	}

	*/

}



function carregaConteudoSlider(contAtual){



	permite_carregar = true;

	if(contAtual==13){

		if( $("#cont-outros").attr("data-loaded")=="true" ){

			permite_carregar = false;

		} else {

			$("#cont-outros").attr("data-loaded", "true");

		}

	}



	if(contAtual!=undefined && permite_carregar){

		

		//$(swiperCapitulos.activeSlide());

		//$(swiperCapitulos.activeSlide()).find('.conteudo_capitulo').get(0).focus();



		cont = $(xmlCont[contAtual]).find('subconteudo');



		if(contAtual==13){

			obj = $("#cont-outros").find('.conteudo').last();

		} else {

			obj = $(swiperCapitulos.activeSlide()).find('.conteudo').last();

		}



		html = "";

		mostrar_titulo = $(xmlCont[contAtual]).eq(0).attr('mostrar_titulo')=="1";

		for(i=0; i<cont.length; i++){

			if( completo || $(cont[i]).attr('completo') == 's') {

				//if(i>0 || $(cont[i]).attr('dma')=='s' ){
				if(i>0 || mostrar_titulo || $(cont[i]).attr('dma')=='s'){

					c = $(cont[i]).attr('dma')=='s' ? 'dma' : '';

					html += ( "<h1 class='"+c+"' id='titulo_"+$(cont[i]).attr('id')+"' >"+$(cont[i]).attr('titulo')+"</h1>" );

				} else {

					html += ("<a id='titulo_"+$(cont[i]).attr('id')+"' ></a>" );

				}

				html += ( $(cont[i]).text() );

			}
			

		}



		//console.log(html);



		obj.html(html);


		/*//PEGA LEGENDA

		console.log( $(".swiper-slide-active .barra_topo").html() );

		$(".foto_grande").each(function(i,e){
			//console.log( (i+1)+" - "+$(this).attr('data-legenda') );
			//console.log( (i+1)+" - "+$(this).find("img").attr('src') );
			console.log( $(this).attr("data-file") );
		})*/

		


		initImg();

		initLnk();

		initTabela(obj);

		iniGRI(obj);

		atualizaScrollTabela();

		initCharts();

		

		initBusca();



		moveScrollHash();



	}



}


function initLnk(){

	$('.swiper-slide-active .conteudo a').each(function(index, el) {

		if($(this).attr('href')!=undefined){

			if($(this).attr('href').charAt(0)=="#"){
				$(this).removeAttr("target");

				d = $(this).attr('href').split("/");
				if(d.length==2){
					$(this).attr('href', "javascript: moveCapitulo("+d[1]+")");
				} else if (d.length==3){
					$(this).attr('href', "javascript: moveSubCapitulo("+d[1]+", "+d[2]+")");
				}

			} else {
				if($(this).attr('href').charAt(0)!="j"){
					$(this).attr("target", "_blank");
				}
			}

		}

	});

}



function initBusca(){

	if(busca_palavra!=""){



		$(".conteudo p:contains('"+busca_palavra+"')").each(function(index, el) {

			$(el).html( $(el).html().replace(busca_palavra, '<span class="destaque_busca">'+busca_palavra+'</span>') );

		});



	}

}



function initImg(){

	$(".conteudo_capitulo p img").each(function(index, el) {

		$(this).attr("id", "img_"+index );

		if( $(this).attr('width').indexOf("%")<0 ){

			$(this).attr("width", "100%");

			$(this).removeAttr("height");

		}

		/*$(this).click(function(){
			abreZoom( $(this), 'img' );
		})*/

		if($(this).attr("width") == "100%") {

			$( "<p class='expand'><a href='javascript: abreZoom( $(\"#img_"+ index  +"\"), \"img\" ); void(0);' class='icon-expand'></a></p>" ).insertBefore( $(this) );

		}

		

		$(this).parent().css("text-align", "center");

	});



	

}



function initTabela(obj){



	obj.find(".tabela").each(function( index ) {

		$(this).attr("data-loaded", "0");

		$(this).html("");

		urlFile = local ? 'includes/tabelas/'+$(this).data('id')+".html" : "includes/tabelas/tabela.php?id="+$(this).data('id')+"&idioma="+idioma;

		$(this).load(urlFile, function(){

			//console.log( "w: "+ $(this)[0].scrollWidth + " - " + $(this).width() );

			/*if(isIE && $(this)[0].scrollWidth > $(this).width()){
				$(this).addClass("scroll");
			}*/

			if($(this)[0].scrollWidth > $(this).width()){
				$(this).append("<div class='overflow_gradient'></div>");
			}

			/*$(this).click(function(){
				abreZoom( $(this), 'html' );
			})*/

			$(this).find('table').attr( {
				'border': "0",
				'cellspacing':"0",
				'cellpadding':"0"
			});

			$(this).attr("id", "tbl_"+$(this).attr("data-id") );

			//if(!isIE){
				$( "<p class='expand'><a href='javascript: abreZoom( $(\"#tbl_"+ $(this).attr("data-id")  +"\"), \"html\" ); void(0);' class='icon-expand'></a></p>" ).insertBefore( $(this) );
			//}

			$(this).attr("data-loaded", "1");

			if(checkTabela()){
				moveScrollHash();
			}

		});



	});



}

function checkTabela(){

	tblLoaded = true;

	$(".swiper-slide-active .tabela").each(function(index, el) {
		if($(this).attr("data-loaded")=="0" ) tblLoaded = false;
	});

	//if(tblLoaded) moveScrollHash();
	return tblLoaded;
}


function iniGRI(obj){

	$(".gri").each(function( index ) {

		gri_n = $(this).text();

		ln = $(".tabela_GRI tr:contains('"+gri_n+"')");



		$("#info_"+$(this).attr("id")).html( ln.eq(0).find('td').eq(1).html() );

		$(this).addClass('gri_'+gri_n);



		//$(this).height( $(this).find(".txt_gri").width() );

	});

}



var paletaGrafico;

function initCharts(){



	switch(swiperCapitulos.activeIndex){

		case 5: paletaGrafico = cemig; break;

		case 6: paletaGrafico = governanca; break;

		case 7: paletaGrafico = estrategia; break;

		case 8: paletaGrafico = clientes; break;

		case 9: paletaGrafico = resultados; break;

		case 10: paletaGrafico = publico; break;

		case 11: paletaGrafico = fornecedores; break;

		case 12: paletaGrafico = comunidade; break;

		case 13: paletaGrafico = meioambiente; break;



		default: paletaGrafico = neutro; break;

	}





	atual = $( swiperCapitulos.activeSlide() ).find('.conteudo_capitulo');

	atual.find('.grafico').each(function(index, el) {

		if( $(el).attr("data-visto")==undefined ){

			$(el).attr("data-visto", "0");

			$(el).html("");

		}

	});



	h = $(".swiper-capitulos").height();

	checkScrollContent(atual);


	atual.find('.grafico_externo').each(function(index, el) {

		$(el).html("");
		jQuery.getScript("includes/graficos/"+$(el).attr("id")+".js");

	});
	

}



function checkScrollContent(obj){



	obj.find('.grafico').each(function(index, el) {



		if( ($(el).position().top - h < -100) && $(el).attr("data-visto")=='0' ) {

			$(el).attr("data-visto", "1");

			loadGrafDiv($(el), $(el).data("id"));

		}



	});



}



function isNumeric(value) {
    return /^[0-9,]+$/.test(value);
}

function loadGrafDiv(div, id){

	urlFile = local ? 'includes/graficos/'+id+'.json' : "includes/graficos/grafico.php?id="+id;

	$.getJSON( urlFile, function(data) {

		

		dataSource = JSON.parse(data.datasource);


		//AJUSTA JSON

		for(var i = 0; i < dataSource.length; ++i) {

			var json = dataSource[i];

			for(var prop in json) {



				if(json[prop]=="null"){

					json[prop] = null;

				} else if( isNumeric(json[prop]) ){

					json[prop] = ajusta_float(json[prop]);

				} else {

					if(json[prop].indexOf("*")>0){

						json[prop] = GrafAjustaTxt(json[prop], idioma);

					} else {

						json[prop] = json[prop].replace("*", "");

					}

				}



			}

		}



		graf = {

			theme: 'cemig',



		    palette: paletaGrafico,

		    dataSource: dataSource,

		    commonSeriesSettings : {},

		    valueAxis : {
		    	label: {
			        customizeText: function (value) {
			            return ajustaNumGraf(this.valueText, data.casas_decimais, idioma)

			        }
			    }
		    },

		    resolveLabelOverlapping: "shift",

		    title: {
		    	text: (idioma=="en" ? data.titulo_eng : data.titulo ),
	            font: {
	                color: '#636467',
	                family: 'Roboto',
	                size: 18,
	                weight: 500
	            },
	            horizontalAlignment: 'left'
	        },

		    //animation: {enabled: false},



			legend: {

				visible: (data.mostrar_legenda=='s'),

				horizontalAlignment: data.legenda_h,

				verticalAlignment: data.legenda_v,

				margin: 0

			}

			

		}


		vars = data.legendas.split("|");

		argField = url(vars[0]);


		altera_tipo = data.altera_tipo.split("|");
		vertical_offset = data.vertical_offset.split("|");
		horizontal_offset = data.horizontal_offset.split("|");
		

		switch( data.tipo) {

		

			case "pizza":



				commonSeriesSettings = {};

				series = [{

			      axis: "percentAxis",

					type: "doughnut",

					argumentField: argField

				}]



				break;



			case "barra":



				commonSeriesSettings = {

			        argumentField: argField,

					type: "bar"

			    };


				series = [];

				for(i=1; i<vars.length; i++){

					d = vars[i];

					s = {

						valueField: url(d),

						name: GrafAjustaTxt(d, idioma)

					};

					l = {};

					if( data.percent_axis=="s" && i+1==vars.length){
						s.axis = 'percentAxis';
						l.customizeText = function(pointInfo){
							return ajustaNumGraf(this.valueText, data.casas_decimais, idioma) + "%";
						}

					}

				    if( altera_tipo[i] !="" ){
						s.type = altera_tipo[i];
					}
					

					if( vertical_offset[i]!=undefined && vertical_offset[i] !=0 && vertical_offset[i]!="" ){
						l.verticalOffset = parseFloat(vertical_offset[i]);
					}

					if( horizontal_offset[i]!=undefined && horizontal_offset[i] !=0 && horizontal_offset[i]!="" ){
					l.horizontalOffset = parseFloat(horizontal_offset[i]);
					}

					s.label = l;

					series.push(s);

				}



				break;



			case "barra_stacked":



				commonSeriesSettings = {

			        argumentField: argField,

					type: "stackedbar"

			    };



				series = [];



				for(i=1; i<vars.length; i++){

					d = vars[i];

					s = {

						valueField: url(d),

						name: GrafAjustaTxt(d, idioma)

					};

					if( altera_tipo[i] !="" ){
						s.type = altera_tipo[i];
					}

					l = {};

					if( vertical_offset[i]!=undefined && vertical_offset[i] !=0 && vertical_offset[i]!="" ){
						l.verticalOffset = parseFloat(vertical_offset[i]);
					}

					if( horizontal_offset[i]!=undefined && horizontal_offset[i] !=0 && horizontal_offset[i]!="" ){
					l.horizontalOffset = parseFloat(horizontal_offset[i]);
					}

					if( altera_tipo[i] !="" ){
						s.type = altera_tipo[i];
					}

					s.label = l;

					series.push(s);

				}



				break;



			case "linha":



				commonSeriesSettings = {

			        argumentField: argField,

					type: "line",

			        

				};



				series = [];



				for(i=1; i<vars.length; i++){

					d = vars[i];

					s = {

						valueField: url(d),

						name: GrafAjustaTxt(d, idioma)

					};

					l = {};

					if( vertical_offset[i]!=undefined && vertical_offset[i] !=0 && vertical_offset[i]!="" ){
						l.verticalOffset = parseFloat(vertical_offset[i]);
					}

					if( horizontal_offset[i]!=undefined && horizontal_offset[i] !=0 && horizontal_offset[i]!="" ){
					l.horizontalOffset = parseFloat(horizontal_offset[i]);
					}

					s.label = l;

					series.push(s);

				}



				break;



			case "spline":



				commonSeriesSettings = {

			        argumentField: argField,

					type: "spline"

				};



				series = [];



				for(i=1; i<vars.length; i++){

					d = vars[i];

					s = {

						valueField: url(d),

						name: GrafAjustaTxt(d, idioma)

					};

					l = {};

					if( vertical_offset[i]!=undefined && vertical_offset[i] !=0 && vertical_offset[i]!="" ){
						l.verticalOffset = parseFloat(vertical_offset[i]);
					}

					if( horizontal_offset[i]!=undefined && horizontal_offset[i] !=0 && horizontal_offset[i]!="" ){
					l.horizontalOffset = parseFloat(horizontal_offset[i]);
					}

					s.label = l;

					series.push(s);

				}



				break;

		}



		commonSeriesSettings.label = { 

			visible: true,

			connector: { visible: true },

			position: data.label_pos,

			customizeText: function() {

				return data.prefix + ajustaNumGraf(this.valueText, data.casas_decimais, idioma) + data.sufix;

			}

		};



		graf.tooltip = {

	        enabled: true,

	        customizeText: function() {

	            return data.prefix + ajustaNumGraf(this.valueText, data.casas_decimais, idioma) + data.sufix;

	        }

        };



        



        graf.series = series;

		graf.commonSeriesSettings = commonSeriesSettings;




		if(data.percent_axis=="s"){
			graf.valueAxis = [
				{ 
					name: 'valueAxis',
					label: {
						customizeText: function() {
				            return data.prefix + ajustaNumGraf(this.valueText, data.casas_decimais, idioma) + data.sufix;
				        }
				    }
		        },
				{
					name: 'percentAxis',
					position: 'right',
					label: { format: 'percent' },
					min: 0,
					max: 60,

					label: {
						customizeText: function() {
				            return this.valueText+" %";
				        }
			    	}
				}
			];
		}
		



		if( data.max !="" ) {

			graf.valueAxis.max = parseFloat( data.max );

			graf.valueAxis.maxValueMargin = 0;

		}



		if( data.min !="" ) {

			graf.valueAxis.min = parseFloat( data.min );

			graf.valueAxis.minValueMargin = 0;

		} 



		graf.rotated = data.girar=="s";






		switch( data.tipo) {



			case "pizza":

				div.dxPieChart(graf);

				break;



			default:

				div.dxChart(graf);

				break;

		}





	}).fail(function() {

		console.log( "error ao cerregar grafico: "+id );

	});

}







var renderOptions = {

    force: true

};





$(window).resize(function() {

	redimensiona_video();

	selDiretoria('diretoria_28');

});



function iniciaVideo() {



	redimensiona_video();



	$("#preloader").fadeOut();



	if( !isIE ){

		$("#video_player")[0].play();
		//$("#video_player")[0].pause();

	}



	$("#video_player").bind('ended', function(event) {

		fechaVideo();

	});



	$("#video_player").bind('click', function(event) {

		fechaVideo();

	});



}



function fechaVideo(){

	if( !isIE ){

		if($("#video_player")[0] != undefined)
			$("#video_player")[0].pause();

		$("#video_player").unbind('ended');

		$("#video_intro").stop().fadeOut(400, function() {

			$("#video_intro").html("");

		});

		$(".btn_pularvideo").stop().fadeOut();

	} else {

		$("#video_intro").remove();
		$(".btn_pularvideo").remove();

	}



}





//

var ultimoCapitulo = -1;

var lastDiv = null;

var ultimoLoad;

function trocaCapitulo(){



	atual = $(swiperCapitulos.activeSlide());



	if(lastDiv!=null){



		if(ultimoCapitulo!=undefined && ultimoCapitulo<13 && atual.closest(".swiper-slide").attr("id")!=$(lastDiv).closest(".swiper-slide").attr("id")){

			$(lastDiv).find(".conteudo").html('<div class="carregando"></div>');

			$(lastDiv).scrollTop(0);

		}

	}





	if( atual.attr("data-id") != ultimoCapitulo ){

		carregaConteudoSlider( atual.attr("data-id") );

	}



	ultimoCapitulo = $(swiperCapitulos.activeSlide()).attr("data-id");



	lastDiv = atual;

	

	

	

}


var $panzoom;
$(document).ready(function($) {

	/*if(idioma=="en"){
		$(".capa_capitulo").each(function(index, el) {
			$(this).css('background-image', $(this).css('background-image').replace("pt", "en"));
		});
	}*/

	$(".conteudo").last().html('<div class="carregando"></div>');


	carregaConteudo();


	$("#ajuda").click(function(){
		$(this).fadeOut();
	})
	//location.hash = "";


	


	/*if (location.hash=="" && (navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/Android/i) ) ){

	    $('body').prepend("<a href='javascript: void(0)' onClick='$(this).fadeOut(); $(\"#video_player\")[0].play();' style='display: block; position: absolute; width: 100%; height: 100%; background: url(images/bgs/"+idioma+"/capa_play.jpg) center center; background-size: cover; z-index: 100;'></a>");

	} */

	



	//iniciaVideo();

	//fechaVideo(); // PARA PULAR O VIDEO SEMPRE

	/*if(location.hash!="" || navigator.userAgent.match(/iPhone/i) ){
		fechaVideo();
	}*/



	$(".barra_topo").click(function() {

		topo();

	});



	//$(".capa_capitulo").html('<a href="javascript: proxCap(); void(0);" class="seta seta-dir"></a><a href="javascript: prevCap(); void(0);" class="seta seta-esq"></a><a href="javascript: abreCapitulo(); void(0);" class="seta seta-baixo"></a>');

	$(".capa_capitulo").each(function(index, el) {
			nome = $(this).parent().parent().find(".barra_topo").html();
			legenda = $(this).parent().parent().find(".barra_topo").attr("data-legenda");


			if(nome!=undefined){
				$(this).html('<div class="titulo">'+nome+'</div><a href="javascript: proxCap(); void(0);" class="seta seta-dir"></a><a href="javascript: prevCap(); void(0);" class="seta seta-esq"></a><a href="javascript: abreCapitulo(); void(0);" class="seta seta-baixo"></a>');
			} else {
				$(this).html('<a href="javascript: proxCap(); void(0);" class="seta seta-dir"></a><a href="javascript: prevCap(); void(0);" class="seta seta-esq"></a><a href="javascript: abreCapitulo(); void(0);" class="seta seta-baixo"></a>');
			}

			if(legenda!=undefined){
				$(this).append('<div class="legenda_capa">'+legenda+'</div>')
			}
	});



	$(".fim_capitulo").html('<a href="javascript: proxCap(); void(0);" class="seta seta-dir"></a><a href="javascript: prevCap(); void(0);" class="seta seta-esq"></a><a href="javascript: topo(); void(0);" class="seta seta-cima"></a>');



	$(".capa_capitulo:first .seta-esq").remove();

	$(".capa_capitulo:first .seta-baixo").remove();



	if(isIE){

		vars = {

			simulateTouch: false,

			onSlideChangeEnd: function(s, d){

				trocaCapitulo();

			},

			onTouchEnd: function(s){

				location.hash = "#/"+swiperCapitulos.activeIndex;

			}

		}

	} else {

		vars = {

			noSwiping: true,

			onSlideChangeEnd: function(s, d){

				trocaCapitulo();

			},

			onTouchEnd: function(s){

				location.hash = "#/"+swiperCapitulos.activeIndex;

			}

		}

	}

	

	swiperCapitulos = $('.swiper-capitulos').swiper(vars);



	//atualizaScrollTabela();







	$('.conteudo_capitulo').scroll(function(){



		h = $(".swiper-capitulos").height();



		if($(this).scrollTop() >= + h ) {

			$(this).parent().find('.barra_topo').addClass('mostra');

		} else {

			$(this).parent().find('.barra_topo').removeClass('mostra');

		}

		

		checkScrollContent($(this));



	});



	selDiretoria('diretoria_28');

	

	//trocaCapitulo();

	//atualizaScrollTabela();

	if(isIE){


	} else {

        (function() {
          var $section = $('#zoom');
          $panzoom = $section.find('.panzoom').panzoom({
            $zoomIn: $section.find(".zoom-in"),
            $zoomOut: $section.find(".zoom-out"),
            $reset: $section.find(".reset")
          });


          $panzoom.parent().on('mousewheel.focal', function( e ) {
            e.preventDefault();
            var delta = e.delta || e.originalEvent.wheelDelta;
            var zoomOut = delta ? delta < 0 : e.originalEvent.deltaY > 0;
            $panzoom.panzoom('zoom', zoomOut, {
				increment: 0.1,
				animate: false,
				focal: e
            });
          });
        })();
		
	}

	/*
	$(".conteudo").swipe( {

        pinchStatus:function(event, phase, direction, distance , duration , fingerCount, pinchZoom, fingerData) {


        	console.log("Pinch zoom " + pinchZoom + "  <br/>Distance pinched " + distance +" <br/>Direction " + direction);

        	dif = ( distance-lastPinch );

        	if(Math.abs(dif) < 15 ){

        		if( direction == "out") dif *= -1;

        		sel = ["p", "h1", "h2"];

        		for(i=0; i<sel.length; i++){

		        	o = $(this).find( sel[i] );

		        	fz = parseFloat(o.css("font-size")) + dif/10;

		        	fz = Math.max(fz, 12);
		        	fz = Math.min(fz, 60);

		        	o.css("font-size", fz + "px" );

		        }



        	}

        	lastPinch = distance;
        	

        	/*if( $(this).attr("data-size")==null ){
        		$(this).attr("data-size", $(this).css("font-size") );
        	}

        	if( $(this).find("p:first").attr("data-size")==null ){
        		$(this).find("p:first").attr("data-size", $(this).find("p:first").css("font-size") );
        	}

        	if( $(this).find("h1:first").attr("data-size")==null ){
        		$(this).find("h1:first").attr("data-size", $(this).find("h1:first").css("font-size") );
        	}

        	if( $(this).find("h2:first").attr("data-size")==null ){
        		$(this).find("h2:first").attr("data-size", $(this).find("h2:first").css("font-size") );
        	}


        	pz = $(this).find("p:first").attr("data-size");
        	h1z = $(this).find("h1:first").attr("data-size");
        	h2z = $(this).find("h2:first").attr("data-size");
          

          sum = (distance/50);

          if( direction == "out") sum *= -1;

          $(this).find("p").css("font-size", parseFloat(pz) + sum + "px" );*/ /*

        },
        fingers:2,  
        threshold:0  
      });
		*/

});
lastPinch = 0;


ultimoHash = "";

clicouGRI = false;

$(window).on('hashchange', function() {

	if(location.hash!="#/zoom"){
		$('#zoom').fadeOut();
		moveScrollHash();
	}

	

});



function abreCapitulo(){

	h = $(".swiper-capitulos").height();

	$(swiperCapitulos.activeSlide()).find('.conteudo_capitulo').animate({scrollTop: h}, 'fast' );

}



function moveCapitulo(id){

	fechaMenu();

	atual = $(swiperCapitulos.activeSlide()).find('.conteudo_capitulo');
	location.hash = "#/"+swiperCapitulos.activeIndex+"/scr-"+atual.scrollTop();

	location.hash = "#/"+id;

}



function moveSubCapitulo(id, area){

	fechaMenu();

	atual = $(swiperCapitulos.activeSlide()).find('.conteudo_capitulo');
	location.hash = "#/"+swiperCapitulos.activeIndex+"/scr-"+atual.scrollTop();

	location.hash = "#/"+id+"/"+area;

}



function scrollHash(){

	//clicouGRI = true;

	atual = $(swiperCapitulos.activeSlide()).find('.conteudo_capitulo');

	location.hash = "#/"+swiperCapitulos.activeIndex+"/scr-"+atual.scrollTop();

}







function moveScrollHash(){



	fechaMenu();



	h = location.hash.split("/");



	id = h[1];

	area = h[2];



	if(id!=swiperCapitulos.activeIndex){

		swiperCapitulos.swipeTo( id );

		tempo = 400;

	} else {

		tempo = 0;

	}



	if(area!=undefined){



		atual = $(swiperCapitulos.activeSlide()).find('.conteudo_capitulo');



		if(area.indexOf("scr")>=0){

			dest = area.replace("scr-", "");



		} else if(area.indexOf("gri")>=0){

			area = area.replace("gri-", "");


			dest = atual.scrollTop() + $(".tabela_GRI").position().top + $(".tabela_GRI tr:contains('"+area+"')").position().top - 50;
			dest = atual.scrollTop() + $(".tabela_GRI tr:contains('"+area+"')").position().top - 100;



		} else if(area.indexOf("res")>=0){



			dest = ( atual.scrollTop()  + $("#titulo_"+area).offset().top ) - 150;



		} else if($("#titulo_"+area).length>0){

			if(checkTabela()){
				dest = ( atual.scrollTop() + $("#titulo_"+area).position().top ) - 50;
			} else {
				dest = null;
			}
			

		} else {

			dest = atual[0].scrollHeight-atual.height();

		}


		if(dest!=null)
			atual.stop().delay(tempo).animate({scrollTop: dest }, 'slow' );

	}

	

}



function proxCap(){



	h = location.hash.split("/");



	if(h[1]==undefined || h[1]=="" || h[1]=="NaN" || h[1]==NaN || h[1]==null){

		location.hash = "#/1";

	} else {

		location.hash = "#/"+(parseInt(h[1])+1);

	}



}



function prevCap(){



	h = location.hash.split("/");



	if(h[1]==undefined){

		location.hash = "#/0";

	} else {

		location.hash = "#/"+(parseInt(h[1])-1);

	}



}



function trim(e){ 

	espacos = /\s/g; 

	return e.replace(espacos, "");

} 



function removeCaracteres(e){ 

	remove = /á|é|í|ó|ú/g;  // adicione os caracteres indesejáveis

	return e.replace(remove, "");

}



function removerAcentos( newStringComAcento ) {

  var string = newStringComAcento;

	var mapaAcentosHex 	= {

		a : /[\xE0-\xE6]/g,

		e : /[\xE8-\xEB]/g,

		i : /[\xEC-\xEF]/g,

		o : /[\xF2-\xF6]/g,

		u : /[\xF9-\xFC]/g,

		c : /\xE7/g,

		n : /\xF1/g

	};

 

	for ( var letra in mapaAcentosHex ) {

		var expressaoRegular = mapaAcentosHex[letra];

		string = string.replace( expressaoRegular, letra );

	}

 

	return string;

}



function url(t){

	t = t.toLowerCase();

	t = trim(t);

	t = removeCaracteres(t);

	return t;

}



function ajustaBusca(t){

	t = t.toLowerCase();

	t = removerAcentos(t);

	return t;

}



function GrafAjustaTxt(txt, idioma){



	t = txt.split("*");



	if(t.length==1){

		return txt;

	} else {

		if(idioma=="en"){

			return t[1];

		} else {

			return t[0];

		}

	}



}



function ajustaNumGraf(num, dec, idioma){

	if(idioma=="en"){

		return number_format(num, dec, ".", ",")

	} else {

		return number_format(num, dec, ",", ".")

	}

}







function ajusta_float(num){



	if( num.indexOf(",")>=0 && num.indexOf(".")>=0 ){



		if(num.indexOf(".")<num.indexOf(",")){

			num = num.replace(".", "");

			num = num.replace(",", ".");

		} else {

			num = num.replace(",", "");

		}



		num = parseFloat(num);



	} else if(num.indexOf(",")>=0){



		num = num.replace(",", ".");

		num = parseFloat(num);



	} else {



		num = parseFloat(num);



	}



	return num;

}


function isInt(value) {
  return !isNaN(value) && (function(x) { return (x | 0) === x; })(parseFloat(value))
}


function number_format(number, decimals, dec_point, thousands_sep) {

	if( (number!=11 && isInt(number)) || isInt(number) ) {
		decimals = 0;
	}

  number = (number + '')

    .replace(/[^0-9+\-Ee.]/g, '');

  var n = !isFinite(+number) ? 0 : +number,

    prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),

    sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,

    dec = (typeof dec_point === 'undefined') ? '.' : dec_point,

    s = '',

    toFixedFix = function(n, prec) {

      var k = Math.pow(10, prec);

      return '' + (Math.round(n * k) / k)

        .toFixed(prec);

    };

  // Fix for IE parseFloat(0.55).toFixed(0) = 0;

  s = (prec ? toFixedFix(n, prec) : '' + Math.round(n))

    .split('.');

  if (s[0].length > 3) {

    s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);

  }

  if ((s[1] || '')

    .length < prec) {

    s[1] = s[1] || '';

    s[1] += new Array(prec - s[1].length + 1)

      .join('0');

  }

  return s.join(dec);

}





function full_bleed(boxWidth, boxHeight, imgWidth, imgHeight) 

{

	// Calculate new height and width

	var initW = imgWidth;

	var initH = imgHeight;

	var ratio = initH / initW;



	imgWidth = boxWidth;

	imgHeight = boxWidth * ratio;



	if(imgHeight < boxHeight){

		imgHeight = boxHeight;

		imgWidth = imgHeight / ratio;

	}



	//  Return new size

	return new Array(imgWidth, imgHeight);



}



function redimensiona_video(){

	

	t = full_bleed($("#video_intro").width(), $("#video_intro").height(), 640, 480);

	

	$("#video_player").width(t[0]);

	$("#video_player").height(t[1]);

	

	$("#video_intro").scrollTop( ($("#video_player").height()-$("#video_intro").height())/2 );

	$("#video_intro").scrollLeft( ($("#video_player").width()-$("#video_intro").width())/2 );

	

}



function strip_tags(input, allowed) {



  allowed = (((allowed || '') + '')

    .toLowerCase()

    .match(/<[a-z][a-z0-9]*>/g) || [])

    .join(''); // making sure the allowed arg is a string containing only tags in lowercase (<a><b><c>)

  var tags = /<\/?([a-z][a-z0-9]*)\b[^>]*>/gi,

    commentsAndPhpTags = /<!--[\s\S]*?-->|<\?(?:php)?[\s\S]*?\?>/gi;

  return input.replace(commentsAndPhpTags, '')

    .replace(tags, function($0, $1) {

      return allowed.indexOf('<' + $1.toLowerCase() + '>') > -1 ? $0 : '';

    });

}

function abreZoom(obj, tipo){

	//console.log(obj);

	location.hash = "#/zoom";

	if(tipo == "img"){
		$('.panzoom').html( "<img src='"+obj.attr("src")+"' />" );
	} else if(tipo == "html"){

		$('.panzoom').html( "<div class='tabela "+$(".swiper-slide-active").attr("id")+"'>" + obj.html() + "</div>" );

	}

	if(!isIE) {
		$panzoom.panzoom("reset");	
	} else {
		$("#zoom .parent").css("overflow", "auto");

		$("#zoom .zoom-in").hide();
		$("#zoom .zoom-out").hide();
		$("#zoom .reset").hide();
	}

	$("#zoom").fadeIn();

	//$('.panzoom img').attr({'src': 'http://cdn-careers.sstatic.net/careers/gethired/img/companypageadfallback-leaderboard-2.png?v=59b591051ad7', 'width': 728, 'height': 90 });

}


function trocaCompleto(valor, carrega){
	completo = valor;

	$(".tipo").removeClass("sel");

	if(valor){
		//$("#tipo_relatorio").html("Relatório<br />Completo");
		$("#completo").addClass("sel");
	} else {
		//$("#tipo_relatorio").html("Relatório<br />Resumido");
		$("#resumido").addClass("sel");
	}

	if(carrega){
		localStorage.setItem("completo", completo);

		$("#menu_completo").slideUp();

		location.hash = "#/0";
		carregaMenu();
	}

	
}


$(document).keydown(function(e) {
    switch(e.which) {
        case 34: // pgdown
        v = 250;
        break;

        case 33: // pgdown
        v = -250;
        break;

        case 38: // up
        v = -50;
        break;

        case 40: // down
        v = 50;
        break;

        default: return; // exit this handler for other keys
    }

    $(".swiper-slide-active .conteudo_capitulo").scrollTop( $(".swiper-slide-active .conteudo_capitulo").scrollTop()+v );

    e.preventDefault(); // prevent the default action (scroll / move caret)
});


function imprimir(idioma){
	if(completo){
		window.open("impressao_"+idioma+".pdf");
	} else {
		window.open("impressao_"+idioma+"_res.pdf");
	}
}