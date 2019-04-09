$(document).ready(function() {

    $('#inputEmail').on('input', function(){
    let inputEmail = $(this).val();
    
    if (inputEmail.length <1){
        $('#message').text('This field is required').show();
    } else{
        $('#message').hide();
        let testExp = new RegExp(/[a-zA-Z0-9]+$/);
        if (!testExp.test(inputEmail)){
            $('#message').text('No special characters').show();
        } else{
            $('#message').hide();
            if(inputEmail.length <3 || inputEmail.length >7){
                $('#message').text('At least 3 characters but no more than 7').show();
            }
            else{
                $('#message').hide();
            }
        }
    }
})

}); // end ready