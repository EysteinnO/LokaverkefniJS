"use strict";

function initMap() {

    var jasonUrl = "http://apis.is/earthquake/is";
    $.getJSON(jasonUrl, function (data) {
        var earthquakeInfo = [];
        console.log(data);
        for(var i = 0; i < data.results.length; i++)
        {
            earthquakeInfo.push({
                earthquakeDepth: data.results[i].depth,
                time: data.results[i].timestamp,
                xcordinate: data.results[i].latitude,
                ycordinate: data.results[i].longitude,
                earthquakeSize: data.results[i].size,
                location: data.results[i].humanReadableLocation
            });


            //Earthquake Cordinates


            var earthquakeLocX = earthquakeInfo[i].xcordinate;
            var earthquakeLocY = earthquakeInfo[i].ycordinate;
            var earthquakeCenter = [
                {lat: earthquakeLocX, lng: earthquakeLocY}
            ];
            //Time of earthquakes
            var earthquakeTimestamp = earthquakeInfo[i].time;


            //EarthquakeDepth
            var earthquakeDepth = earthquakeInfo[i].depth;
            console.log(earthquakeDepth);
            //EarthquakeSize
            var earthquakeSize = earthquakeInfo[i].size;
            //Location description
            var locDescript = earthquakeInfo[i].location;
        }

        console.log(earthquakeInfo[0].earthquakeDepth);


    var map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 64.9631, lng: -19.0208},
        zoom: 7
    });

    for(var quakes in earthquakeInfo)
    {
        var quakeCircle = new google.maps.Circle({
            strokeColor: '#FF0000',
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: '#FF0000',
            fillOpacity: 0.35,
            map: map,
            center: earthquakeCenter.center,
            radius: Math.sqrt(earthquakeSize) * 100
        });
    }


    var infowindow = new google.maps.InfoWindow();
    var service = new google.maps.places.PlacesService(map);

    service.getDetails({
        placeId: 'ChIJN1t_tDeuEmsRUsoyG83frY4'
    }, function(place, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
            var marker = new google.maps.Marker({
                map: map,
                position: place.geometry.location
            });
            google.maps.event.addListener(marker, 'click', function() {
                infowindow.setContent('<div><strong>' + place.name + '</strong><br>' +
                    'Place ID: ' + place.place_id + '<br>' +
                    place.formatted_address + '</div>');
                infowindow.open(map, this);
            });
        }
    });

    });
}



