"use strict";

function initMap() {

    var jasonUrl = "http://apis.is/earthquake/is"; //Json string
    $.getJSON(jasonUrl, function (data) {
        var earthquakeInfo = []; //Array init

        console.log(earthquakeInfo); //Testing purposes
        console.log(data);

        for (var i = 0; i < data.results.length; i++) { //Loop through json
            earthquakeInfo.push({ //Initializing callable array elements
                earthquakeDepth: data.results[i].depth,
                timeStamp: data.results[i].timestamp,
                xcoordinate: data.results[i].latitude,
                ycoordinate: data.results[i].longitude,
                earthquakeSize: data.results[i].size,
                location: data.results[i].humanReadableLocation
            });

        }

        //Map
        var map = new google.maps.Map(document.getElementById('map'), {
            center: {lat: 65, lng: -18},
            zoom: 6,
            mapTypeId: 'terrain'
        });


        //Circles created
        for (var key in earthquakeInfo) {
            //Circle
            var quakeCircle = new google.maps.Circle({
                strokeColor: '#FF0000',
                strokeOpacity: 0.8,
                strokeWeight: 2,
                fillColor: '#FF0000',
                fillOpacity: 0.35,
                map: map,
                center: {
                    lat: earthquakeInfo[key].xcoordinate,
                    lng: earthquakeInfo[key].ycoordinate
                },
                radius: Math.sqrt(earthquakeInfo[key].earthquakeDepth) * 1500
            });


            //Info box
            var infowindow = new google.maps.InfoWindow({
                content: '<p>Upplýsingar um skjálfta.</p><br><p>Staðsetning: ' + earthquakeInfo[key].location + '</p>' + '<p>Stærð: ' + earthquakeInfo[key].earthquakeSize + ' á Richter</p>' + '<p>Dýpt: ' + earthquakeInfo[key].earthquakeDepth + 'KM</p>' + '</p>' + '<p>Tími: ' + earthquakeInfo[key].timeStamp + '</p>' + '<p> X ás: ' + earthquakeInfo[key].xcoordinate + '</p>' + '<p>Y ás: ' + earthquakeInfo[key].ycoordinate + '</p>'
            });
            infowindow.close();
            //Markers created
            var marker = new google.maps.Marker({
                position: {
                    lat: earthquakeInfo[key].xcoordinate,
                    lng: earthquakeInfo[key].ycoordinate
                },
                map: map,
                title: 'Info'
            });

            //Listener for info windows
            google.maps.event.addListener(marker, 'click', (function (marker, infowindow) {
                if (!infowindow) infowindow.close();
                else  {
                    return function () {
                        infowindow.open(map, marker, this);
                    };
                }
            })(marker, infowindow, this));


        }

        //Slider control - unfinished.
        var $min = $('#value-min');
        var $max = $('#value-max');

        function update(min, max) {
            if (earthquakeInfo[key].earthquakeDepth >= min && earthquakeInfo[key].earthquakeDepth <= max && quakeCircle) { // If in range
                quakeCircle.setMap(null);
            } else {

            }
        }
        //Slider init
        function init() {                     // Tasks when script first runs
            $('#slider').noUiSlider({           // Set up the slide control
                range: [0.0, 9.0], start: [3.0, 9.0], min: 0.0, max: 9.0, step: 0.1, handles: 2, margin: 20, connect: true,
                serialization: {to: [$min, $max], resolution: 1}
            }).change(function () {
                update($min.val(), $max.val());
            });
            update($min.val(), $max.val());     // Update table to show matches
        }
        $(init);
    });
}



