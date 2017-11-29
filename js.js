"use strict";
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

        //Map
        var map = new google.maps.Map(document.getElementById('map'), {
            center: {lat: 64.128288, lng: -21.827774},
            zoom: 10,
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
                title: 'Info'
            });
            marker.addListener('click', function() {
                infowindow.open(earthquakeInfo[key].location, marker);
            });

            console.log(earthquakeInfo[key].location);

        }

        //Slider

        function update(min, max) {           // Update the table content
            rows.forEach(function(row) {        // For each row in the rows array
                if (row.person.rate >= min && row.person.rate <= max) { // If in range
                    row.$element.show();            // Show the row
                } else {                          // Otherwise
                    row.$element.hide();            // Hide the row
                }
            });
        }

        function init() {                     // Tasks when script first runs
            $('#slider').noUiSlider({           // Set up the slide control
                range: [0, 150], start: [65, 90], handles: 2, margin: 20, connect: true,
                serialization: {to: [$min, $max],resolution: 1}
            }).change(function() { update($min.val(), $max.val()); });
            makeRows();                           // Create table rows and rows array
            appendRows();                         // Add the rows to the table
            update($min.val(), $max.val());     // Update table to show matches
        }









    });
}



