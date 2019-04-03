$(document).ready(function () {

    $('#inputName').on('input', function () {
        let inputName = $(this).val();

        if (inputName.length == "") {
            $('#message').text('This field is required').show();
        } else {
            $('#message').hide();
            let testExp = new RegExp(/[a-zA-Z0-9]+$/);
            if (!testExp.test(inputName)) {
                $('#message').text('No special characters').show();
            } else {
                $('#message').hide();
                if (inputName.length < 5 || inputName.length > 30) {
                    $('#message').text('At least 5 characters but no more than 30').show();
                } else {
                    $('#message').hide();
                }
            }
        }
    })


    $('#inputEmail').on('input', function () {
        let inputEmail = $(this).val();

        if (inputEmail.length == "") {
            $('#msgEmail').text('This field is required').show();
        } else {
            $('#msgEmail').hide();
            let testExp = new RegExp(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/);
            if (!testExp.test(inputEmail)) {
                $('#msgEmail').text('Must be a valid e-mail').show();
            } else {
               /*  $('#msgEmail').hide();
                if (inputEmail.length < 3 || inputEmail.length > 30) {
                    $('#msgEmail').text('At least 3 characters but no more than 7').show();
                } else {
                    $('#msgEmail').hide();
                } */
            }
        }
    })
}); // end ready







/* $('body').hide(); */

/*         $(document).ready(function() {
            // 1. Välj alla inputfält som har attributet required
            // Tips: Använd keyup för att validera medans man skriver
            $("input[required]").keyup(validate);
            // 2. Vid blur testa om fältet innehåller minst 3 tecken
            function validate() {
                $(this).val().length < 3 ? // 3. Visa meddelandet som ligger efter det aktuella fältet
                    $(this)
                    .siblings(".message")
                    .show(500) : // 4. Dölj meddelandet om fältet innehåller minst 3 tecken
                    $(this)
                    .siblings(".message")
                    .hide(500);
            }
        }); // ready */