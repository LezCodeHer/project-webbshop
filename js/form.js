$(document).ready(function () {


    /*********** Name validation *************/

    $('#inputName').on('input', function () {
        let inputName = $(this).val();

        if (inputName.length == "") {
            $('#message').text('This field is required').show();
        } else {
            $('#message').hide();
            let testExp = new RegExp(/[a-zA-Z]+$/);
            if (!testExp.test(inputName)) {
                $('#message').text('No numbers or special characters').show();
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

    /*********** Email validation *************/

    $('#inputEmail').on('input', function () {
        let inputEmail = $(this).val();

        if (inputEmail.length == "") {
            $('#msgEmail').text('This field is required').show();
        } else {
            $('#msgEmail').hide();
            let testExp = new RegExp(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/);
            if (!testExp.test(inputEmail)) {
                $('#msgEmail').text('Must be a valid e-mail').show();
            }
        }
    })

    /*********** Phone validation *************/

    $('#inputTel').on('input', function () {
        let inputTel = $(this).val();

        if (inputTel.length == "") {
            $('#msgTel').text('This field is required').show();
        } else {
            $('#msgTel').hide();
            let testExp = new RegExp(/[0-9]+$/);
            if (!testExp.test(inputTel)) {
                $('#msgTel').text('Only numbers 0-9').show();
            } else {
                $('#msgTel').hide();
                if (inputTel.length < 10 || inputTel.length > 15) {
                    $('#msgTel').text('At least 10 numbers but no more than 14').show();
                } else {
                    $('#msgTel').hide();
                }
            }
        }
    })

    /*********** Street validation *************/

    $('#inputStreet').on('input', function () {
        let inputStreet = $(this).val();

        if (inputStreet.length == "") {
            $('#msgStreet').text('This field is required').show();
        } else {
            $('#msgStreet').hide();
        }
    })

    /*********** Zip validation *************/

    $('#inputZip').on('input', function () {
        let inputZip = $(this).val();

        if (inputZip.length == "") {
            $('#msgZip').text('This field is required').show();
        } else {
            $('#msgZip').hide();
            let testExp = new RegExp(/[0-9]+$/);
            if (!testExp.test(inputZip)) {
                $('#msgZip').text('Only numbers 0-9').show();
            } else {
                $('#msgZip').hide();
                if (inputZip.length < 5) {
                    $('#msgZip').text('Has to be at least 5 numbers').show();
                } else {
                    $('#msgZip').hide();
                }
            }
        }
    })

    /*********** City validation *************/

    $('#inputCity').on('input', function () {
        let inputCity = $(this).val();

        if (inputCity.length == "") {
            $('#msgCity').text('This field is required').show();
        } else {
            $('#msgCity').hide();
            let testExp = new RegExp(/[a-zA-Z]+$/);
            if (!testExp.test(inputCity)) {
                $('#msgCity').text('No numbers or special characters').show();
            } else {
                $('#msgCity').hide();
                if (inputCity.length < 2 || inputCity.length > 20) {
                    $('#msgCity').text('At least 2 characters but no more than 20').show();
                } else {
                    $('#msgCity').hide();
                }
            }
        }
    })

    /*********** Country validation *************/

    $('#inputCountry').on('input', function () {
        let inputCountry = $(this).val();

        if (inputCountry.length == "") {
            $('#msgCountry').text('This field is required').show();
        } else {
            $('#msgCountry').hide();
            let testExp = new RegExp(/[a-zA-Z]+$/);
            if (!testExp.test(inputCountry)) {
                $('#msgCountry').text('No numbers or special characters').show();
            } else {
                $('#msgCountry').hide();
                if (inputCountry.length < 4 || inputCountry.length > 46) {
                    $('#msgCountry').text('At least 4 characters but no more than 46').show();
                } else {
                    $('#msgCountry').hide();
                }
            }
        }
    })

}); // end ready