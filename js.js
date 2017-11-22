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
            center: {lat: 64.128288, lng: -21.827774},
            zoom: 10,
            mapTypeId: 'terrain'
        });

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
                radius: Math.sqrt(earthquakeInfo[key].earthquakeDepth) * 1000
            });

            //Info box

            var infowindow = new google.maps.InfoWindow({
                content: earthquakeInfo[key].location
            });

            var marker = new google.maps.Marker({
                position: {
                    lat: earthquakeInfo[key].xcoordinate,
                    lng: earthquakeInfo[key].ycoordinate
                },
                map: map,
                title: 'Test'
            });
            marker.addListener('click', function() {
                infowindow.open(earthquakeInfo[key].location, marker);
            });

        }






    });
}



