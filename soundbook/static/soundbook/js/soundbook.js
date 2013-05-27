var soundbook = (function($){ var state = 'home'; // home = start, list = caætegory items 
	var currentCategory = -1; 
	var currentMedia = -1; 
	var isHuman = 0; 
	
	$(document).ready( function(){ 
		showCol(0,1); 
		//$('#contact').css({top:-$("#contact").height()}); 
		ko.applyBindings(new SoundbookViewModel());
		onResize(); 
	}) 
	
	/*sets positioning after resize * */ 
	function onResize( e ) { 
		var w = $(window).width(); 
		var h = $(window).height(); 
		//$("#alignWrapper").css({ left:161  });//.5*( w - $("#cache").width()) 
	} 
	

		    
	
	/*moves row to show a specific column
	iRow= index of Row
	iCol=index of column
	onComplete = complete callback
	*/ 
	function showCol(iRow,iCol,onComplete) { 
	    var row = $(".row").eq( iRow ) 
	    var col = row.children( ".col").eq( iCol );
	    var h = Math.max( 300, col.height() );
	    row.animate( {left: -col.position().left,height:h },300,'easeInOutCubic', function(){
		if (onComplete) onComplete();
	    });//height: col.height()
	    if (iRow == 0) {
		$('#menu').animate( { top: h }, 300,'easeInOutCubic' );
	    }
	    
	}
	
	function pauseShowreel(){
	    var f = $('#showreelPlayer'),
	    url = f.attr('src').split('?')[0];

	    f[0].contentWindow.postMessage( JSON.stringify( { method: "pause" } ),url );
	}
	

	function SoundbookViewModel() { //Data 
	    var self = this;
	    self.mediaRoot = 'static/uploads/'; 
	    self.genres = ko.observableArray(); 
	    self.chosenGenre = ko.observable(); 
	    self.samples = ko.observableArray(); 
	    self.chosenSample = ko.observable(); 
	    self.videoServer = 'http://player.vimeo.com/video/'; 
	    self.videoParams = '?title=1&amp;byline=0&amp;portrait=0&amp;badge=0&amp;api=1&amp;color=565A56'; 
	    self.videoUrl = ko.computed( function(){ return this.chosenSample() ? this.videoServer + this.chosenSample().fields.mediaId + this.videoParams : ''; },self); 
	    
		
	    self.playSample = function( item ){ 
		if (self.chosenSample() == item ) { 
			$("#samples audio")[0].pause(); self.chosenSample( null ); 
		} 
		else{
		    self.chosenSample( item ); 
		    if ( item.fields.mediaId )//play Video
			showCol(1,0); 
		    else 
			    $("#samples audio")[0].play(); //play Audio 
		}
	    } 
		
	    self.loadGenre = function( genre ){ 
		self.chosenGenre( genre ); 
		$.getJSON("soundbook/samples/", {pk:genre.pk}, function( data) { 
			self.samples( data ); showCol(1,1) });
	    } 
				    
	    $.getJSON("soundbook/genres/", function(data) { 
		    self.genres( data );
		    showCol(1,2);
	    });
	    	    



	    self.toGenres = function(){
		showCol(1,2, function(){self.chosenGenre(null)}); 
	    }

	    self.toSamples = function(){
		showCol(1,1, function(){self.chosenSample( null )} ); 
	    }
	    
	    self.toContact = function(){
		$('#menu li').show();
		$('.menucontact').hide();
		pauseShowreel();
		showCol(0,0);
	    }
	    
	    self.toAbout = function(){
		$('#menu li').show();
		$('.menuabout').hide();
		pauseShowreel();
		showCol(0,2); 
	    }
	    
	    self.toShowReel = function(){
		$('#menu li').show();
		$('.menureel').hide();
		showCol(0,1); 
	    }
	    
	    
	
		

} }(jQuery));