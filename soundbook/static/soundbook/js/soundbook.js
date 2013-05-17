var soundbook = (function($){ var state = 'home'; // home = start, list = caætegory items 
	var currentCategory = -1; 
	var currentMedia = -1; 
	var isHuman = 0; 
	
	$(document).ready( function(){ 
		
		$(".read").click(onReadMore); 
		$(".listen").click( function(){showCol(1,2)} ); 
		showCol(0,0); 
		showCol(1,2); 
		showCol(2,0); 
		$('.contactSlider .handle').draggable( { containment: "parent", snap: ".contactSlider", stop:onContactSlider });
		$('#contact').css({top:-$("#quickSlip").position().top}); 
		onResize(); 
		ko.applyBindings(new SoundbookViewModel()); 
	}) 
	
	/*sets positioning after resize * */ 
	function onResize( e ) { 
		var w = $(window).width(); 
		var h = $(window).height(); 
		$("#contact").css({ left: .5*( w - $("#contact").width() ) }); 
		$("#cache").css({ left: .5*( w - $("#cache").width() ) }); 
	} 
	
	/* *ShowContactForm and set human factor */ 
	function onContactSlider(e) { 
	    isHuman = 1; 
	    var offset = $("#quickSlip").position().top; 
	    var pos = parseInt( $(this).css('left').replace('px')); 
	    if ( pos>10 ) { 
		$('#contact').animate({top:0},300,'easeInOutCubic'); 
		$('body').one('click',function(e){ 
		    if (e.target.nodeName == "BODY"){ 
			$('#contact').animate({top:-offset},300,'easeInOutCubic'); 
			$('.handle').css({left:0}); 
		    } 
		}) 
	    } 
	    else{ 
		$('#contact').animate({top:-offset},300,'easeInOutCubic');
		} 
	} 
			
	/* * Show Bio */ 
	function onReadMore(e) {
		showCol(0,1); 
		$("#readMore .back").one('click',function(e){ showCol(0,0); }) 
	} 
	
	/*moves row to show a specific column *iRow= index of Row, iCol=index of column; */ 
	function showCol(iRow,iCol) { 
	    var row = $(".row:eq("+ iRow + ")") 
	    var col = row.children( ".col").eq( iCol ); //height: col.height(); 
	    row.animate( {left: -col.position().left},300,'easeInOutCubic' ); 
	}
	

	function SoundbookViewModel() { //Data 
	    var self = this; 
	    self.mediaRoot = 'media/'; 
	    self.genres = ko.observableArray(); 
	    self.chosenGenre = ko.observable(); 
	    self.samples = ko.observableArray(); 
	    self.chosenSample = ko.observable(); 
	    self.videoServer = 'http://player.vimeo.com/video/'; 
	    self.videoParams = '?title=1&byline=0&portrait=0&badge=0&autoplay=1'; 
	    self.videoUrl = ko.computed( function(){ return this.chosenSample() ? this.videoServer + this.chosenSample().fields.mediaId + this.videoParams : ''; },self); 
	    self.playSample = function( item ){ 
		if (self.chosenSample() == item ) { 
			$("#portfolio audio")[0].pause(); self.chosenSample( null ); 
		} 
		else{
		    self.chosenSample( item ); 
		    if ( item.fields.mediaId )//play Video
			showCol(1,0); 
		    else 
			    $("#portfolio audio")[0].play(); //play Audio 
		}
	    } 
		
		self.loadGenre = function( genre ){ 
			self.chosenGenre = genre; 
			$.getJSON("soundbook/samples/", {pk:genre.pk}, function( data) { 
				self.samples( data ); showCol(1,1) });
		} 
					
		$.getJSON("soundbook/genres/", function(data) { 
			self.genres( data ); 
		}); 

} }(jQuery));