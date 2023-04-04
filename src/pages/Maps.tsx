/* eslint-disable no-return-assign */
/* eslint-disable react-native/no-inline-styles */
import React, { useRef,useEffect,useState } from 'react';
import MapView, {  Polyline } from 'react-native-maps';
import { Fab } from '../components/Fab';
import { useLocation } from '../hooks/useLocation';
import { LoadingScreen } from './LoadingScreen';





// interface Props {
//     markers?: Marker[];
// }

export const Maps = () => {

  const [showPolyline, setshowPolyline] = useState(true);

  const {hashLocation,
     initialPosition,
     getCurrentLocation,
     followUserLocation,
     userLocation,
     stopFollowUserLocation,
     routeLines,
    } = useLocation();

  const mapViewRef = useRef<MapView>();
  const following = useRef<boolean>(true);

useEffect(() => {
  followUserLocation();
  return () => {
   stopFollowUserLocation;
  };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);


  useEffect(() => {
    if (!following.current) {return;}
  const { longitude, latitude} = userLocation;
  mapViewRef.current?.animateCamera({
    center: {latitude,longitude},
  });
  }, [userLocation]);



  const centerPosition = async() => {
    const { latitude, longitude } = await getCurrentLocation();
    following.current = true;
    mapViewRef.current?.animateCamera({
      center: {latitude,longitude},
    });
  };



  if ( !hashLocation ){

    return <LoadingScreen />;
  }

  return (
    <>
    <MapView
      ref={ (el) => mapViewRef.current = el!}
        style={{flex: 1}}
        //provider={{ PROVIDER_GOOGLE}
        showsUserLocation
       initialRegion={{
         latitude: initialPosition.latitude,
         longitude: initialPosition.longitude,
         latitudeDelta: 0.015,
         longitudeDelta: 0.0121,
       }}
       onTouchStart={ () => following.current = false}
      >
        {showPolyline && (
          <Polyline
        coordinates={routeLines}
        strokeColor= "black"
        strokeWidth={ 3}
        />
        )
        }
        {/* <Marker
        image={ require('../assets/custom-marker.png')}
        coordinate={{
         latitude: 37.78825,
         longitude: -122.4324,
        }}
        title="Esto es un título"
        description="Esta es una descripción del marcador"
        /> */}

      </MapView>
      <Fab
      iconName="compass-outline"
      onPress={ centerPosition }
      style={{
        position:'absolute',
        bottom: 20,
        right:20,
            }}
      />
   <Fab
      iconName="git-network-outline"
      onPress={ () => setshowPolyline( !showPolyline)}
      style={{
        position:'absolute',
        bottom: 80,
        right:20,
            }}
      />
      </>
  );
};
