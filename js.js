"use strict";

//Slider

var slider = document.getElementById("myRange");
var output = document.getElementById("demo");
//output.innerHTML = slider.value; // Display the default slider value

// Update the current slider value (each time you drag the slider handle)
/*
slider.oninput = function() {
    output.innerHTML = this.value;
}
*/

function initMap() {

    var jasonUrl = "http://apis.is/earthquake/is";
    $.getJSON(jasonUrl, function (data) {
        var earthquakeInfo = [];


        console.log(data);

        for (var i = 0; i < data.results.length; i++) {
            earthquakeInfo.push({
                earthquakeDepth: data.results[i].depth,
                time: data.results[i].timestamp,
                xcoordinate: data.results[i].latitude,
                ycoordinate: data.results[i].longitude,
                earthquakeSize: data.results[i].size,
                location: data.results[i].humanReadableLocation
            });

            //Time of earthquakes
            var earthquakeTimestamp = earthquakeInfo[i].time;

            //EarthquakeDepth
            var earthquakeDepth = earthquakeInfo[i].depth;

            //EarthquakeSize
            var earthquakeSize = earthquakeInfo[i].size;
            //Location description
            var locDescript = earthquakeInfo[i].location;
        }

        //console.log(earthquakeInfo);


        var map = new google.maps.Map(document.getElementById('map'), {
            center: {lat: 65.124, lng: -16.288},
            zoom: 10,
            mapTypeId: 'terrain'
        });

        for (var depths in earthquakeInfo) {
            var quakeCircle = new google.maps.Circle({
                strokeColor: '#FF0000',
                strokeOpacity: 0.8,
                strokeWeight: 2,
                fillColor: '#FF0000',
                fillOpacity: 0.35,
                map: map,
                center: {
                    lat: earthquakeInfo[depths].xcoordinate,
                    lng: earthquakeInfo[depths].ycoordinate
                },
                radius: Math.sqrt(earthquakeInfo[depths].earthquakeDepth) * 1000
            });
            //console.log(earthquakeLocX);
        }

        var infowindow = new google.maps.InfoWindow();
        var service = new google.maps.places.PlacesService(map);

        service.getDetails({
            placeId: 'ChIJN1t_tDeuEmsRUsoyG83frY4'
        }, function (place, status) {
            if (status === google.maps.places.PlacesServiceStatus.OK) {
                var marker = new google.maps.Marker({
                    map: map,
                    position: place.geometry.location
                });
                google.maps.event.addListener(marker, 'click', function () {
                    infowindow.setContent('<div><strong>' + place.name + '</strong><br>' +
                        'Place ID: ' + place.place_id + '<br>' +
                        place.formatted_address + '</div>');
                    infowindow.open(map, this);
                });
            }
        });

    });
}



