// check off items by clicking on li
// we use ul because it exists on page load and
// will add listeners to any new li unside of a ul
$('ul').on('click', 'li', function(){
	// if li is black, gray out, else turn back black
	$(this).toggleClass('completed');
});


// click on X to delete item
$('ul').on('click','span', function(event){
	$(this).parent().fadeOut(500, function() {
		$(this).remove();
	});
	event.stopPropagation();
});

$("input[type='text']").keypress(function(key) {
	if(key.which === 13){
		// get input text
		var newItem = $(this).val();
		// clear input
		$(this).val('');
		// create new li and add to ul
		$('ul').append('<span><i class="fas fa-trash-alt"></i> ' + newItem + '</li>');
	}
});

$("#toggle-form").on('click', function(){
	$("input[type='text']").fadeToggle();
});
