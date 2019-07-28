//gets the mapboxgl variable from the cdn up top.
mapboxgl.accessToken = 'pk.eyJ1IjoiaGVmZS0yNyIsImEiOiJjanlrN3p4dW4wYnFuM2RwYTVzN2hhdGZsIn0.rMocpwZN20tlucYvAQXc9A';
    
// instatiating a new map from the mapboxgl.Map constructor. 
var map = new mapboxgl.Map({
//the map in container is matched with the map id   
container: 'map',
//mapbox actually has a lot of styles
style: 'mapbox://styles/mapbox/light-v10',
center: post.coordinates,
zoom: 7
});

// create a HTML element for our post lcoation/marker
var el = document.createElement('div');
el.className = 'marker';

// make a marker for our location and add to the map
new mapboxgl.Marker(el)
    .setLngLat(post.coordinates)
    .setPopup(new mapboxgl.Popup({ offset: 25 }) // add popups
    .setHTML('<h3>' + post.title + '</h3><p>' + post.location + '</p>'))
    .addTo(map);
