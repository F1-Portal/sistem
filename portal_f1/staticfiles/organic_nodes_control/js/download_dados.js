$(document).ready(function(){
    var endpoint = '/nocs/download_dados/api/'

    $( "#baixar" ).click(function() {
        $.ajax({
            method: 'GET',
            success: function(data){
                window.location = endpoint+'?data_inicio='+$("#data_inicio_download").val()+'&data_final='+$("#data_final_download").val()
            },
            error: function(error_data){
                console.log("error")
            }
        })
    })

})