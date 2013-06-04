var soundbook = ( function($){
    
	var module = {mediaRoot:"",csrfToken:""}
	
	var currentCategory = -1; 
	var currentMedia = -1; 
	var isHuman = 0; 
	var _players;
    
	
	module.init = function init(mediaRoot,csrfToken) {
	    module.mediaRoot = mediaRoot;
	    module.csrfToken = csrfToken;
	}

	$(document).ready( function(){ 
	    showCol(0,1); 
    
	    ko.applyBindings(new SoundbookViewModel());
	    $('#contact').on("submit", "form", onContact );

	    $( '#showreelPlayer' ).bind( 'click', function(e){ alert('ddd') } );
	   // $( '#player' ).click('click', pauseShowreel );
		
		
	});
	
		    
	
	/*moves row to show a specific column
	iRow= index of Row
	iCol=index of column
	onComplete = complete callback
	*/ 
	function showCol(iRow,iCol,onComplete) {
	    pauseShowreel();
	    pauseSample();
	    var row = $(".row").eq( iRow ) 
	    var col = row.children( ".col").eq( iCol );
	    var h = Math.max( 300, col.height() );
	    row.animate( {left: -col.position().left,height:h },400,'easeInOutCubic', function(){
		if (onComplete) onComplete();
	    });
	}
	
    
	function pauseShowreel(e){
	     var f = $('#showreelPlayer'),
		url = f.attr('src').split('?')[0];
	    f[0].contentWindow.postMessage( JSON.stringify( { method: "pause" } ),url );
	}
	
	function pauseSample(e){
	    if (!self.chosenSample)
		return 
	    if (self.chosenSample.fields.mediaId ){
		var f = $('#samplePlayer'),
		    url = f.attr('src').split('?')[0];
		f[0].contentWindow.postMessage( JSON.stringify( { method: "pause" } ),url );
	    }
	    else{
		$("#samples audio")[0].pause();
	    }
	}
	
	function onContact( e ){
	    e.preventDefault;
	    $.ajax({type:'POST', url: 'contact/', data:$(this).serialize(), success: function(response) {
		$('#contact form').replaceWith(response);
	    }});
	    return false;
	}
	

	function SoundbookViewModel() { //Data 
	    var self = this;
	    
	    self.mediaRoot = ko.computed( function(){ return soundbook.mediaRoot } ); 
	    
	    self.genres = ko.observableArray(); 
	    self.chosenGenre = ko.observable(); 
	    
	    self.samples = ko.observableArray(); 
	    self.chosenSample = ko.observable(); 
	    
	    self.videoServer = 'http://player.vimeo.com/video/';
	    self.videoParams = '?autoplay=1&amp;player_id=samplePlayer&amp;title=1&amp;byline=0&amp;portrait=0&amp;badge=0&amp;api=1&amp;color=565A56'; 
	    self.videoUrl = ko.computed( function(){ return this.chosenSample() ? this.videoServer + this.chosenSample().fields.mediaId + this.videoParams : ''; },self); 
	    self.isAudio = ko.computed( function(){ return this.chosenSample() && !this.chosenSample().fields.mediaId},self); 
	    
		
	    self.playSample = function( item ){
		
		self.chosenSample( item );
		if ( item.fields.mediaId ){ //play Video
		    var load = function(){
			$('#samplePlayer').attr( 'src', self.videoUrl() );
		    }
		    showCol(1,0, load );
		}
		else{
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
		$('.menu li').show();
		$('.menucontact').hide();
		pauseShowreel();
		showCol(0,0);
	    }
	    
	    self.toAbout = function(){
		$('.menu li').show();
		$('.menuabout').hide();
		pauseShowreel();
		showCol(0,2); 
	    }
	    
	    self.toShowReel = function(){
		$('.menu li').show();
		$('.menureel').hide();
		showCol(0,1); 
	    }
	    
	
	    
	}
	
    
	
	function csrfSafeMethod(method) {
	    // these HTTP methods do not require CSRF protection
	    return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
	}
	function sameOrigin(url) {
	    // test that a given url is a same-origin URL
	    // url could be relative or scheme relative or absolute
	    var host = document.location.host; // host + port
	    var protocol = document.location.protocol;
	    var sr_origin = '//' + host;
	    var origin = protocol + sr_origin;
	    // Allow absolute or scheme relative URLs to same origin
	    return (url == origin || url.slice(0, origin.length + 1) == origin + '/') ||
		(url == sr_origin || url.slice(0, sr_origin.length + 1) == sr_origin + '/') ||
		// or any other URL that isn't scheme relative or absolute i.e relative.
		!(/^(\/\/|http:|https:).*/.test(url));
	}
	$.ajaxSetup({
	    beforeSend: function(xhr, settings) {
		if (!csrfSafeMethod(settings.type) && sameOrigin(settings.url)) {
		    // Send the token to same-origin, relative URLs only.
		    // Send the token only if the method warrants CSRF protection
		    // Using the CSRFToken value acquired earlier
		    xhr.setRequestHeader("X-CSRFToken", soundbook.csrftoken);
		}
	    }
	});
	
	return module;	

 }(jQuery));