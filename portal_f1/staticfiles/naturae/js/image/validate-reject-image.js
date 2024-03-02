window.onload = (event) => {
    if (localStorage.getItem('status_valid') != null){
        var s = document.getElementById("change-situation");
        s.value = localStorage.getItem('status_valid');
    }
};

function validateRejectImage() {
    var crsf = document.getElementsByName('csrfmiddlewaretoken')[0].value;
    var form_data = new FormData();
    var change_situation = document.getElementById("change-situation").value;

    localStorage.setItem("status_valid", document.getElementById("change-situation").value);

    if (change_situation != 3){
        form_data.append("csrfmiddlewaretoken", crsf);
        form_data.append("is_validated", change_situation);

        $('.checkImage:checked').each(function() {
            form_data.append("id", this.id);
        });

        $.post({
        url: '/image/validated/',
        type: "POST",
        dataType: "json",
        cache: false,
        contentType: false,
        processData: false,
        data: form_data,
        success: function(data){
            document.location.reload(true);
        }
        });
    }
}



function check_uncheck_all(){
    var check_all = document.getElementById("check-all");

    var lst = document.getElementsByClassName("image-line");

    for(var i = 0; i < lst.length; ++i) {
        if(check_all.checked == true){
            if(lst[i].style.display == "block"){
                lst[i].getElementsByClassName("checkImage")[0].checked = true;
            }
        }
        else if(check_all.checked == false){
            if(lst[i].style.display == "block"){
                lst[i].getElementsByClassName("checkImage")[0].checked = false;
            }
        }
    }
}