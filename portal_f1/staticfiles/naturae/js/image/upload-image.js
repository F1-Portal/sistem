document.getElementById('upload').addEventListener('change', handleFileSelect, false);
function handleFileSelect(evt) {

    var crsf = document.getElementsByName('csrfmiddlewaretoken')[0].value;
    let files = evt.target.files;
    var count_files = files.length;

    var form_data = new FormData();
    form_data.append("csrfmiddlewaretoken", crsf);
    form_data.append("specie_id", specie_id);

    for (var x = 0; x < count_files; x++) {
        form_data.append("path", files[x]);
    }

     var modal = $('#myModal');
     modal.modal();

    $.post({
        url: '/image/upload/',
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
