var soundbookAdmin = (function($){

    
    
    $(document).ready( function(){
	    Dropzone.options.dropzone = {paramName:'image'};
	    $(document.body).append( getEditBox() );
	    
	    //edit('samples','4');
	    
	    $(document).on('submit','form',onSave);
	    $( ".sortable" ).sortable({
		stop:onSorted
		});
	    
	    
	    

    })
    
    function onSave(e) {
	event.preventDefault();
	var formData = new FormData( this );
	 $.ajax({  
	    url: this.getAttribute('action'),  
	    type: "POST",  
	    data: formData,  
	    processData: false,  
	    contentType: false,  
	    success: onSuccess, 
	});  
	var xhr = new XMLHttpRequest();
    }
    
    function onSuccess(data) {
	getEditBox().html('');
	getEditBox().append(data);
    }
    
    
    
    
    function edit( model,id ) {
	$.ajax({
	    url:model+'/'+id+'/',
	    context:document.body
	}).done( function( data ){
	    getEditBox().append( data );
	    getEditBox().show();
	    })
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
    
    
    

}(jQuery));