import {userAction} from './script'

export const setLatitudeLongitudeAndCallUserAction = () => {
    let latitude = null;
    let longitude = null;
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function showPosition(position){
      latitude = position.coords.latitude;
      longitude = position.coords.longitude;
      userAction(latitude,longitude);
      });
    } else { 
      alert("location search is not supported by this browser");
    }
  }
  