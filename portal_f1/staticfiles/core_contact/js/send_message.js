function sendMessage() {
    var crsf = document.getElementsByName('csrfmiddlewaretoken')[0].value;
    var name = document.getElementById('name_contact').value;
    var email = document.getElementById('email_contact').value;
    var message = document.getElementById('message_contact').value;
    var div_send_message = document.getElementById("send-button").value;

    if (valida_form()){
        div_send_message = '<i class="fa fa-spinner fa-spin"></i> Sending';
        $.ajax({
            url: '/send/message/',
            type: "POST",
            dataType: "json",
            data: {
                'csrfmiddlewaretoken': crsf,
                'name': name,
                'email': email,
                'message': message,
            },
            success: function(data){
                $("#modal-mensagem").modal();
                div_send_message.innerHTML = 'Send';
                name='';
                email='';
                message='';
                window.alert("Mensagem enviada com sucesso!");
            },
            error: function(error_data){
                console.log(error_data)
            }
        });
    }
}

function valida_form(){
    if (document.getElementById("name_contact").value == ""){
        document.getElementById("name_contact").focus();
        document.getElementById("name_contact").setCustomValidity("Favor nos informar seu nome.");
//        document.getElementById("text-error").innerHTML = "Enter your name.";
        return false
    } else if (document.getElementById("email_contact").value == ""){
        document.getElementById("email_contact").focus();
        document.getElementById("email_contact").setCustomValidity("Favor nos informar um endereço de e-mail válido.");
        return false
    } else if (document.getElementById("message_contact").value == ""){
        document.getElementById("message_contact").focus();
        document.getElementById("message_contact").setCustomValidity("Favor preencher o campo com a mensagem.");
        return false
    } else if (document.getElementById("email_contact").value != ""){
        if (validationEmail(document.getElementById("email_contact"))){
            //document.getElementById("text-error").innerHTML = "";
            //window.alert("4");
            document.getElementById("name_contact").setCustomValidity("");
            document.getElementById("email_contact").setCustomValidity("");
            document.getElementById("message_contact").setCustomValidity("");
            return true
        } else {
            //window.alert("5");
            document.getElementById("email_contact").focus();
            document.getElementById("email_contact").setCustomValidity("Favor nos informar um endereço de e-mail válido.");
            return false
        }
    } else {
        //window.alert("6");
        //document.getElementById("text-error").innerHTML = "";
        document.getElementById("name_contact").setCustomValidity("");
        document.getElementById("email_contact").setCustomValidity("");
        document.getElementById("message_contact").setCustomValidity("");
        return true
    }
}


function validationEmail(field) {
    usuario = field.value.substring(0, field.value.indexOf("@"));
    dominio = field.value.substring(field.value.indexOf("@")+ 1, field.value.length);

    if ((usuario.length >=1) &&
        (dominio.length >=3) &&
        (usuario.search("@")==-1) &&
        (dominio.search("@")==-1) &&
        (usuario.search(" ")==-1) &&
        (dominio.search(" ")==-1) &&
        (dominio.search(".")!=-1) &&
        (dominio.indexOf(".") >=1)&&
        (dominio.lastIndexOf(".") < dominio.length - 1)) {
            document.getElementById("email_contact").innerHTML="E-mail válido";
            return true
    }
    else{
        document.getElementById("email_contact").innerHTML="<font color='red'>E-mail inválido </font>";
        return false
    }
}