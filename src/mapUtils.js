export const addZones = (map, center, theme) => {

  new window.google.maps.Circle({
    center: center,
    radius: 50, 
    fillColor: theme.palette.custom.circleMapSafe,
    fillOpacity: 0.35,
    strokeColor: '#40E0D0',
    strokeOpacity: 0.8,
    strokeWeight: 2,
    map: map});
  const dangerZoneCoords = [
    { lat: 36.836509854839775, lng: 10.205543639922904 },
    { lat: 36.837762, lng: 10.207443 },
    { lat: 36.836702, lng: 10.208513 },
    { lat: 36.83568854032278, lng: 10.206053250921252 }];
  new window.google.maps.Polygon({
    paths: dangerZoneCoords,
    fillColor: theme.palette.custom.DangerMap,
    fillOpacity: 0.35,
    strokeColor: '#FF0000',
    strokeOpacity: 0.8,
    strokeWeight: 2,
    map: map});
  dangerZoneCoords.forEach(coord => {
    new window.google.maps.Circle({
      center: coord,
      radius: 10, 
      fillColor: '#FF0000', 
      fillOpacity: 0.8,
      strokeColor: '#FF0000',
      strokeOpacity: 0.8,
      strokeWeight: 2,
      map: map }); });};
