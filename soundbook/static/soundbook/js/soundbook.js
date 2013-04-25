var soundbook = (function($){
    var state = 'home'; // home = start, list = category items
    
    var currentCategory = -1;
    var currentMedia = -1;
    var isHuman = 0;
    
    $(document).ready( function(){
	$(".interactive").click(onInteractive);
	$(".read").click(onReadMore);
	$(".listen").click( function(){showCol(1,2)} );
	$("#categories .item").click(onCategory);
	showCol(0,0);
	showCol(1,2);
	showCol(2,0);
	$('.contactSlider .handle').draggable( {
	    containment: "parent",
	    snap: ".contactSlider",
	    stop:onContactSlider });
	
	$('#contact').css({top:-$("#quickSlip").position().top});
	onResize();
    })
    
    
    /*sets positioning after resize
     *
     */
    function onResize( e ) {
	var w = $(window).width();
	var h = $(window).height();
	$("#contact").css({
	    left: .5*( w - $("#contact").width() )
	    });
	$("#cache").css({
	    left: .5*( w - $("#cache").width() )
	    });
    }
    /*
     *ShowContactForm and set human factor
     */
    
    function onContactSlider(e) {
	isHuman = 1;
	var offset = $("#quickSlip").position().top;
	var pos = parseInt( $(this).css('left').replace('px'));
	if ( pos>10 ) {
	    $('#contact').animate({top:0},200);
	}
	else{
	    $('#contact').animate({top:-offset},200);
	}
	
	
    }
    /*
     * Show Bio
     */
    function onReadMore(e) {
	showCol(0,1);
	$("#readMore .back").one('click',function(e){
	    showCol(0,0);
	})
    }
    
    /*
     *Show all items in a category
     */
    function onCategory( e ){
	var i = $(this).parent().index();
	showCol(1,1);
	$("#portfolio .back").one('click',function( e ) {
	    showCol(1,2);
	})
    }
    
    /*
     * All interaction gathered here for tracking
     */
    function onInteractive(e) {
	var t = e.currentTarget;
	var id = $(t).attr('id');
	var className = t.className;
	
    }
    
    /*
     *moves row to show a specific column
     *iRow= index of Row, iCol=index of column;
     */
    function showCol(iRow,iCol) {
	var row = $(".row:eq("+ iRow + ")")
	var col = row.children( ".col:eq("+ iCol + ")").first();
	row.animate( {left: -col.position().left,height: col.height() },200 );
    }
    
    function setState( name ){
     
    }	

}(jQuery));