$(document).ready(function() {
    var endpoints = ['/api/sectors_company', '/api/layout_company']

    // parte dfe empresa e setor
    $( "#company" ).change(function() {
        if ($('#company').val() == '0'){
            resetSectors()
        }
        else{
            getSectors($('#company').val())
        }
    })
    
    function getSectors(company){
        $.ajax({
            method: "GET",
            url: endpoints[0]+'?company='+company,
            success: function(data){
                populateSectors(data)
            },
            error: function(error_data){},
        });
    }
    
    function resetSectors(){
        $('#sector').empty()
        $('#sector').append('<option value="0">Selecione uma empresa</option>')
    }
    
    function populateSectors(data){
        $('#sector').empty()
        $('#sector').append('<option value="0">Selecione um setor</option>')
        $.each(data.sectors, function(i, item) {
            $('#sector').append(
                $('<option>', {
                    value: item.id,
                    text : item.description
                }, '</option>')
            );
        });
    }
        
    $( "#update_layout_company" ).click(function() {
        if ($('#sector').val() == '0'){
            alert('Selecione um setor')
        }
        else{
            getLayout($('#sector').val())
            $("#reset").click();
        }
    });
        
    function getLayout(sector){
        $.ajax({
            method: "GET",
            url: endpoints[1]+'?sector='+sector,
            success: function(data){
                populateLayout(data)
            },
            error: function(error_data){
                console.log(error_data.error)
            },
        });
    }
        
    function populateLayout(data){
        $("#svg_container").children().first().replaceWith(data.svg);
        $("#svg_container").children().first().attr('id', 'svg_layout');
        $("#svg_layout").attr('viewBox', '0 0 600 600');

        getActions();        
    }
    
    function getActions(){
        var span = document.querySelectorAll('.NameHighlights');
        console.log(span);
        for (var i = span.length; i--;) {
            (function () {
                var t;
                
                span[i].onmouseover = function () {
                    clearTimeout(t);
                    this.setAttribute('class', 'NameHighlightsHover');
                    console.log('entrou no mouseover');
                };
    
                span[i].onmouseout = function () {
                    var self = this;
                    t = setTimeout(function () {
                        self.setAttribute('class', 'NameHighlights');
                    }, 300);
                    console.log('entrou no click');
                };
            })();
        }
    }
   
})