var soundbookAdmin = (function($){

    var   csrftoken;
    
    $(document).ready( function(){
	   
	    csrftoken = $( "input[name='csrfmiddlewaretoken']")[0].value;
	    
	    $(document.body).append( getEditBox() );
	   //$(document.body).append( getEditWidget() );
	    
	    $(document).on('submit','form',onSave);
	    $( ".sortable" ).sortable({
		stop:onSorted
	    });
	        
	    $( "ul.editable").each( function(){
		li = $( "<li/>" );
		li.html( "<span>Add +</span>" );
		$(this).append( li)
	    })
	    
	    $( document ).on( 'dblclick','.editable li', onEditable)
	    
    })
    
    function onEditable( e ) {
	var i = $(this).index();
	var model = $(this).parent().data( "model").split( "." );
	var url  = model[0] + '/edit/' + model[1] + '/';
	var type = 'GET';
	if ( i+1 < $(this).parent().children().length){
	    url+=$(this).attr("id").split(':')[1];
	    type = 'GET';
	}
	    
	$.ajax({
		url:url,
		type: type,
		context:document.body
	    }).done( showEditBox)		   
	
    }
    
    function onSave(e) {
	event.preventDefault();
	var formData = new FormData( this );
	 $.ajax({  
	    url: this.getAttribute('action'),  
	    type: "POST",  
	    data: formData,  
	    processData: false,  
	    contentType: false,  
	    success: showEditBox, 
	});  
	var xhr = new XMLHttpRequest();
    }
      
      
      

    
    
    
    function onEditBox( e ) {
	if ( e.target == getEditBox()[0] )
	    closeEditBox()
    }
    

    
    function onSorted( e ) {
	
	var order = [];
	$(this).children().each(function(i){
		order.push( $(this).attr("id") );
	    })
	    
	$.ajax({
	    url:'sort/',
	    method:'POST',
	    context:document.body,
	    data: JSON.stringify( order ),
	    contentType:"application/json; charset=utf-8",
	    dataType:"json",
	}).done( function( data ){
	    alert( data.type )
	    })
    }
    

    function showEditBox( data ) {
	getEditBox().html( data );
	getEditBox().show();
    }
    
    function closeEditBox(e) {
	getEditBox().html('');
	getEditBox().hide();
    }
    
    var _editBox;
    function getEditBox() {
	if (!_editBox) {
	    _editBox = $('<div/>');
	    _editBox.addClass('editBox');
	    _editBox.attr('id','editBox');
	    _editBox.click( onEditBox );
	    _editBox.on("keydown",function(e){
		if(e.keyCode==27)
		    closeEditBox()
		    });	
	    _editBox.hide();
	}
	return _editBox
    }
    
    var _editWidget;
    function getEditWidget(args) {
	if (!_editWidget) {
	    _editWidget = $('<div/>');
	    _editWidget.addClass('editWidget');
	    _editWidget.attr('id','editWidget');
	    _editWidget.hide();
	}
	return _editWidget
    }
    
  
    $.ajaxSetup({
	beforeSend: function(xhr, settings) {
	    if (!csrfSafeMethod(settings.type) && sameOrigin(settings.url)) {
		xhr.setRequestHeader("X-CSRFToken", csrftoken);
	    }
	}
    });
    
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
    
    

}(jQuery));