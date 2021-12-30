/* defaultLocation: Marvin's restaurant in Cotati 
    lat 38.3288835,
    lng -122.708428
    zoom 16
*/
//this all needs to be contained within a function initMap so that the map rendering calls is
// the name can be changed but needs to match the string on the async script loading for Google Maps
   
//Step 1 defining geocoordinate (latitude and longitude)
let location1 = {
    lat: 38.3288835,
    lng: -122.708428
};

function initMap(){

    //Step 2 making Google Map object
    let myMap = new google.maps.Map(
        //place map inside of the element with ID #map
        document.getElementById('map'), {
        //centering map around first location
        center: location1,
        //setting zoom level
        zoom: 15,
        /*
        Zoom level range acording to documentation at https://developers.google.com/maps/documentation/javascript/overview#zoom-levels
        1: World
        5: Landmass/continent
        10: City
        15: Streets
        20: Buildings
        */
       // setting a style found at https://snazzymaps.com/style/18/retro
       styles: 
        [
            {
                "featureType": "administrative",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "poi",
                "stylers": [
                    {
                        "visibility": "simplified"
                    }
                ]
            },
            {
                "featureType": "road",
                "elementType": "labels",
                "stylers": [
                    {
                        "visibility": "simplified"
                    }
                ]
            },
            {
                "featureType": "water",
                "stylers": [
                    {
                        "visibility": "simplified"
                    }
                ]
            },
            {
                "featureType": "transit",
                "stylers": [
                    {
                        "visibility": "simplified"
                    }
                ]
            },
            {
                "featureType": "landscape",
                "stylers": [
                    {
                        "visibility": "simplified"
                    }
                ]
            },
            {
                "featureType": "road.highway",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "road.local",
                "stylers": [
                    {
                        "visibility": "on"
                    }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "geometry",
                "stylers": [
                    {
                        "visibility": "on"
                    }
                ]
            },
            {
                "featureType": "water",
                "stylers": [
                    {
                        "color": "#84afa3"
                    },
                    {
                        "lightness": 52
                    }
                ]
            },
            {
                "stylers": [
                    {
                        "saturation": -17
                    },
                    {
                        "gamma": 0.36
                    }
                ]
            },
            {
                "featureType": "transit.line",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#3f518c"
                    }
                ]
            }
        ]
    }
    );


    //Step 3 grab geolocations data
    fetch('geolocations.json') // getting file from server 
        .then ( myResponse => myResponse.json() ) // 
        .then ( // since this is happening asynchronously, render loop has to happen in here
            myData => {
                console.log(myData);


                //Step 4, loop through the data and:
                for( let counter=0; counter < myData.length; counter++){
                    //get the current geocoordinate

                    let currentCoordinate = {
                        lat: myData[counter].lat,
                        lng: myData[counter].lng
                    };

                    //set a new marker
                    let marker = new google.maps.Marker(
                        {
                            // 1 geocoordinate position of the marker
                            position: currentCoordinate,
                            // 2 which map object it is going into
                            map: myMap,
                            // 3 the name of the marker (from the object)
                            title: myData[counter].title
                        }
                    )
                    // Add an info window
                    let info = new google.maps.InfoWindow(
                        {
                            content: myData[counter].description
                        }
                    )
                    // make a click event on marker to open it
                    marker.addListener(
                        // 1 type of event as a string
                        'click',
                        // 2 what to do when the event happens
                        function(){
                            myMap.panTo(marker.position);
                            // tell the info window to open
                            
                            info.open(
                                // 1 the map to open inside of
                                myMap,
                                // 2 the geocoordinate / marker to open the window at
                                marker
                            ); // ending function statement
                        }
                    ); //ending addListener

                } // end for loop

            } // end myData arrow function
        );




    function geoFindMe() {
    /*
        const status = document.querySelector('#status');
        const mapLink = document.querySelector('#map-link');
      
        mapLink.href = '';
        mapLink.textContent = '';
      */
        function success(position) {
          const userLatitude  = position.coords.latitude;
          const userLongitude = position.coords.longitude;
      /*
          status.textContent = '';
          mapLink.href = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`;
          mapLink.textContent = `Latitude: ${latitude} °, Longitude: ${longitude} °`;
          */
            let location2 = {
                lat: userLatitude,
                lng: userLongitude
            };

            //make custom icon for the user
            // doc https://developers.google.com/maps/documentation/javascript/examples/icon-complex
            // scaledSize per https://stackoverflow.com/questions/15096461/resize-google-maps-marker-icon-image
            const userIcon = {
                url: "./images/computer-icon.png",
                scaledSize: new google.maps.Size(30, 30),
            }

            let marker2 = new google.maps.Marker(
                {
                    icon: userIcon,
                    // 1 geocoordinate position of the marker
                    position: location2,
                    // 2 which map object it is going into
                    map: myMap,
                    // 3 the name of the marker
                    title: "You are here"
                }
            )
            let info2 = new google.maps.InfoWindow(
                {
                    content: `<h2>You are here!</h2>
                    <p>   This is for class, we promise we're not saving your location </p>
                    `
                }
            )
            // Step 5 make a click event on marker to open it
            marker2.addListener(
                // 1 type of event as a string
                'click',
                // 2 what to do when the event happens
                function(){
                    // tell the info window to open
                    info2.open(
                        // 1 the map to open inside of
                        myMap,
                        // 2 the geocoordinate / marker to open the window at
                        marker2
                    ); // ending function statement
                }
            ); //ending addListener
        
            myMap.panTo(location2);
            myMap.setZoom(17);


        } // end success 
      
        function error() {
         window.alert('Unable to retrieve your location');

        }
      
        if(!navigator.geolocation) {
          window.alert('Geolocation is not supported by your browser');
        } else {
            navigator.geolocation.getCurrentPosition(success, error);
        }
      
    }
      
      document.querySelector('#find-user').addEventListener('click', geoFindMe);



}