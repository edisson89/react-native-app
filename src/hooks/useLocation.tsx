import {useEffect, useRef, useState } from 'react';

import Geolocation from '@react-native-community/geolocation';
import { Location } from '../interfaces/appinterfaces';


export const useLocation = () => {

const [hashLocation, sethashLocation] = useState(false);
const [routeLines, setRouteLines] = useState<Location[]>([]);
const [initialPosition, setInitialPosition] = useState<Location>({
    longitude: 0,
    latitude:0,
});

const [userLocation, setUserLocation] = useState<Location>({
    longitude: 0,
    latitude:0,
});

const watchId = useRef<number>();
const isMounted = useRef(true);

useEffect(() => {
 isMounted.current = true;
 return ()=>{
    isMounted.current = false;
 };
}, []);

    useEffect(() => {

        if ( !isMounted.current) {return;}
        getCurrentLocation()
        .then(location =>{
          setInitialPosition(location);
          setUserLocation(location);
          setRouteLines( routes => [...routes, location]);
          sethashLocation(true);
        });
          }, []);

    const getCurrentLocation = (): Promise<Location>=>{
        return new  Promise( (resolve, reject) => {
            Geolocation.getCurrentPosition(
                ({coords}) => {
                 resolve({
                  latitude:  coords.latitude,
                  longitude: coords.longitude,
                 });

                },
                (err) => reject({err}),{enableHighAccuracy:true}
                );
        });
};

const followUserLocation = () =>{
      watchId.current = Geolocation.watchPosition(
            ({coords}) => {
                if ( isMounted.current) {return;}

                const location: Location = {
                    latitude: coords.latitude,
                    longitude: coords.longitude,
                };
                console.log({coords});
            setUserLocation(location);
            setRouteLines( routes => [...routes, location ]);
            },
            (err) => ({err}),{enableHighAccuracy:true,  distanceFilter: 10}

    );
};

const stopFollowUserLocation = () =>{
    if (watchId.current)
   {Geolocation.clearWatch( watchId.current );}
};

return {
    hashLocation,
    initialPosition,
    getCurrentLocation,
    followUserLocation,
    userLocation,
    stopFollowUserLocation,
    routeLines,
};
};

