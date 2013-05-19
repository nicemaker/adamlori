var soundbook = (function($){ var state = 'home'; // home = start, list = caætegory items 
	var currentCategory = -1; 
	var currentMedia = -1; 
	var isHuman = 0; 
	
	$(document).ready( function(){ 
		showCol(0,0); 
		showCol(1,2); 
		$('#contact').css({top:-$("#contact").height()}); 
		ko.applyBindings(new SoundbookViewModel());
		onResize(); 
	}) 
	
	/*sets positioning after resize * */ 
	function onResize( e ) { 
		var w = $(window).width(); 
		var h = $(window).height(); 
		$("#alignWrapper").css({ left: .5*( w - $("#cache").width() ) }); 
	} 
	

		    
	
	/*moves row to show a specific column *iRow= index of Row, iCol=index of column; */ 
	function showCol(iRow,iCol,onComplete) { 
	    var row = $(".row").eq( iRow ) 
	    var col = row.children( ".col").eq( iCol ); //height: col.height();
	    row.animate( {left: -col.position().left,height: col.height()},300,'easeInOutCubic' );
	    if (onComplete) onComplete();
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
		self.chosenGenre( genre ); 
		$.getJSON("soundbook/samples/", {pk:genre.pk}, function( data) { 
			self.samples( data ); showCol(1,1) });
	    } 
				    
	    $.getJSON("soundbook/genres/", function(data) { 
		    self.genres( data ); 
	    });
	    	    
	    /* Show Contact Form */
	    var _isOpen=false;
	    self.switchContact = function(){
		_isOpen = !_isOpen;
		var y = _isOpen ? 0 : -$("#contact").height();
		
		$('#contact').animate({top:y},300,'easeInOutCubic'); 
	    }
	    

	    self.toGenres = function(){
		showCol(1,2, function(){self.chosenGenre(null)}); 
	    }

	    self.toSamples = function(){
		showCol(1,1, function(){self.chosenSample( null )} ); 
	    }
	    
	    self.toReadMore = function(){
		showCol(0,1); 
	    }
	    
	    self.toShowReel = function(){
		showCol(0,0); 
	    } 
		

} }(jQuery));