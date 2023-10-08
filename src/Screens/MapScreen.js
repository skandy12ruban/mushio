import { View, Text, StyleSheet } from 'react-native'
import React, { useRef, useState } from 'react'
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import Metrics from '../Constants/Metrics';


const MapScreen = () => {
    
    const locations = [
      { id: 1, title: 'Location 1', latitude: 17.371679, longitude: 78.500776 },
      { id: 2, title: 'Location 2', latitude: 17.387734, longitude: 78.477243},
      { id: 3, title: 'Location 3', latitude: 17.436920, longitude: 78.457870},
      { id: 4, title: 'Location 4', latitude: 17.436838, longitude: 78.449820},
      { id: 5, title: 'Location 5', latitude: 17.446337, longitude: 78.479193},
      // Add more locations as needed
    ];
  return (
    <View style={styles.container}>
      
      <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          initialRegion={{
            latitude: 17.446337,
            longitude: 78.479193,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          showUserLocation={true} 
        >
           
              {locations.map(location => (
          <Marker
            key={location.id}
            coordinate={{
              latitude: location.latitude,
              longitude: location.longitude,
            }}
            title={location.title}
            pinColor="red"
          />
        ))}
     </MapView>
    </View>
  )
}
const styles = StyleSheet.create({
    container: {
      ...StyleSheet.absoluteFillObject,
      width: Metrics.rfv(290),marginLeft:4,marginTop:4, height: Metrics.rfv(140),
   
    },
    map: {
      ...StyleSheet.absoluteFillObject,
    },
  });
export default MapScreen