import { View, Text, FlatList, Image,ScrollView,StyleSheet ,TouchableOpacity,SafeAreaView} from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from '../Components/Header'

import { Card } from 'react-native-paper';
import Metrics from '../Constants/Metrics';
import { useNavigation } from '@react-navigation/native';
import { API_BASE_URL } from '../api/ApiClient';
import Loader from '../Components/Loader';
import { Calendar } from 'react-native-calendars';

function CustomCalendar(props) {
  return (
    <Calendar
      initialDate={new Date()}
      minDate={new Date()}
      // maxDate="2023-01-30"
      disableAllTouchEventsForDisabledDays={true}
      {...props}
    />
  );
}

const Home = (props) => {
  const navigation = useNavigation();

  const[loading,setLoading]=useState(false)

 
  
  return (
    <SafeAreaView>
        <Loader loading={loading}></Loader>
      <Header name={'Home '} Language={''} bellIcon={true} />
      <View>
      <TouchableOpacity style={{backgroundColor:'white', width:60,height:60,borderRadius:10,}}
        onPress={()=>{
          setselectedItem(item)
          }} >
      <Image
          style={{
             width:40,height:40,margin:10,borderRadius:10,
            }}
           source={require('../assets/images/image3.jpg')}
         />
         </TouchableOpacity>
      </View>
     <Text style={{fontSize:25,fontWeight:'bold',marginLeft:Metrics.rfv(30),color:'black'}}>Hello, <Text style={{color:'#00B0FF'}}>Satish</Text></Text>
     <Text style={{marginLeft:Metrics.rfv(30),color:'black'}}>Mushio greets you good morning</Text>
      <View>
      {/* <CustomCalendar onDayPress={(day) => console.log(`Date pressed: ${day.dateString}`)} /> */}
      </View>
    


    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  }
})

export default Home;
