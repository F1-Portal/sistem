$(document).ready(function(){
    var endpoint_line = '/device/position/data/'

    updateChart();

    var map = L.map("map",{
          wheelPxPerZoomLevel: 100,
          zoomDelta: 1,
          zoomSnap: 1,
        });

    var greenIcon = new L.Icon({
        iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
    });

    var redIcon = new L.Icon({
        iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
    });


    $( "#atualizar_mapa" ).click(function() {
        updateChart();
    })

    function updateChart() {
        var markers = []
        $.ajax({
            method: "GET",
            url: endpoint_line+'?device='+$("#device").val(),

            success: function(data){

                if (map){
                    map.eachLayer(function (layer) {
                        map.removeLayer(layer);
                    });
                }
                for (device in data.devices){
                    var popup = '<b>Dispositivo: '+data.devices[device]['device_name']+'</b><br>Bateria: '+data.devices[device]['battery']+'%<br>Humidade: '+data.devices[device]['humidity']+'%<br>Temperatura: '+data.devices[device]['temperature']+'°C<br>Data: '+data.devices[device]['published_date']

                     markers.push(L.marker([data.devices[device]['latitude'], data.devices[device]['longitude']]).bindPopup(popup))
                }

                for (device in data.antennas){
                     markers.push(L.marker([data.antennas[device]['latitude'], data.antennas[device]['longitude']],  {icon: greenIcon}).bindPopup(data.antennas[device]['antenna_name']))
                }

                var group = L.featureGroup(markers).addTo(map);

                map.fitBounds(group.getBounds().pad(0.4));

                L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                  attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors', maxZoom: 19.5
                }).addTo(map);

            },
            error: function(error_data){
                console.log(error_data)
            }
        })
    }



})
