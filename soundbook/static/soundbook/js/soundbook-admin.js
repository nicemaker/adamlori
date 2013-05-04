var soundbookAdmin = (function($){

    
    
    $(document).ready( function(){
	    Dropzone.options.dropzone = {paramName:'image'};
	    $(document.body).append( getEditBox() );
	    
	    edit('samples','4');
	    

    })
    
    function edit( model,id ) {
	$.ajax({
	    url:model+'/'+id+'/',
	    context:document.body
	}).done( function( data ){
	    getEditBox().append( data );
	    getEditBox().show();
	    })
    }
    
    var _editBox;
    function getEditBox() {
	if (!_editBox) {
	    _editBox = $('<div/>');
	    _editBox.addClass('editBox');
	    _editBox.attr('id','editBox');
	    _editBox.click( onEditBox );
	    _editBox.hide();
	}
	return _editBox
    }
    
    function onEditBox( e ) {
	if ( e.target == getEditBox()[0] ) {
	    getEditBox().hide();
	}
    }
    
    
    

}(jQuery));