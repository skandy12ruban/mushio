import { View, Text, FlatList, Image,ScrollView,StyleSheet ,TouchableOpacity} from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from '../Components/Header'
import { Card } from 'react-native-paper';
import Metrics from '../Constants/Metrics';
import { useNavigation } from '@react-navigation/native';
import { API_BASE_URL } from '../api/ApiClient';
import Loader from '../Components/Loader';



const Graphs = () => {

  const navigation = useNavigation();

  const[loading,setLoading]=useState(false)

 


useEffect(()=>{
 
},[])


  return (
    <View style={styles.container}>
        <Loader loading={loading}></Loader>
      <Header name={' '} Language={''} bellIcon={true} />
      <Text>shopping</Text>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,

  }
})
export default Graphs;