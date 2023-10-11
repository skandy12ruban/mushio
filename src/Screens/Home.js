import { View, Text, FlatList, Image,ScrollView,StyleSheet ,TouchableOpacity,SafeAreaView} from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from '../Components/Header'
import {DateHelper} from '../utils/DateHelper'
import { Card } from 'react-native-paper';
import Metrics from '../Constants/Metrics';
import { useNavigation } from '@react-navigation/native';
import { API_BASE_URL } from '../api/ApiClient';
import Loader from '../Components/Loader';
import CalendarStrip from 'react-native-calendar-strip';
import moment from 'moment';


const Home = (props) => {
  const navigation = useNavigation();

  const[loading,setLoading]=useState(false)
  const [date, setFromDate] = useState({
    date: new Date(),
    formatFromDate: DateHelper.formatToDate(new Date())
});
const [selectedDateString, setSelectedDateString] = useState(moment(new Date()));

const data=[
  {id:1,title:'Felt happy',
  description:'The CalendarStrip source files are copied from the project root directory into',
  likes:[{id:2,name:'#work'},{id:4,name:'#communication'},],
  image:{id:2,color:'#00B0FF',image:require('../assets/images/image2.jpg'),name:'Great'},},
  {id:2,title:'Felt sad',
  description:'The CalendarStrip source files are copied from the project root directory into',
  likes:[{id:2,name:'#work'},{id:4,name:'#communication'},],
  image: {id:4,color:'#FF7F7F',image:require('../assets/images/image5.jpg'),name:"Don't cry"},},
  {id:3,title:'Felt super happy',
  description:'The CalendarStrip source files are copied from the project root directory into',
  likes:[{id:2,name:'#work'},{id:4,name:'#communication'},],
  image:{id:3,color:'#C7F6B6',image:require('../assets/images/image3.jpg'),name:'Excellent'},}
]


  return (
    <SafeAreaView style={{flex:1}}>
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
      <View style={{marginTop:10}}>
      <CalendarStrip
      scrollable
      style={{height:100, paddingTop: 20, paddingBottom: 10}}
      calendarColor={'white'}
      calendarHeaderStyle={{color: 'black'}}
      dateNumberStyle={{color: 'black'}}
      dateNameStyle={{color: 'black'}}
      iconContainer={{flex: 0.1}}
      selectedDate={selectedDateString}
      highlightDateNumberStyle={{backgroundColor:'#00B0FF',borderRadius:50,color:'white',padding:2}}
      onDateSelected={(date) => {
        console.log(date)
        setSelectedDateString(date)
      }}
    />
      </View>
      <ScrollView>
        <View style={{flex:2}}>
          {data.map((item)=>{
            return(
              <View style={{margin:10,alignSelf:'center'}}>
              <Card style={{width:'100%',backgroundColor:'white'}}>
                 <View style={{flexDirection:'row',justifyContent:'space-between',padding:10}}>
                  <Text style={{fontWeight:'bold',color:'black'}}>{item.title}</Text>
                  <TouchableOpacity style={{backgroundColor:item.image.color, width:30,height:30,borderRadius:5,}} >
                  <Image
                    style={{
                    width:20,height:20,margin:5,borderRadius:5,
                   }}
                  source={item.image.image}
                />
                </TouchableOpacity>
                 </View>
                 <Text style={{padding:5,alignSelf:'center',color:'black'}}>{item.description}</Text>
                    <FlatList
                    horizontal
                    data={item.likes}
                    keyExtractor={item =>item.id}
                    renderItem={(e)=>{
                      console.log(e)
                      return(
                        <View style={{paddingLeft:10,backgroundColor:'lightblue',margin:10,borderRadius:10,}}>
                        <Text style={{alignSelf:'center',padding:2}}>{e.item.name}</Text>
                        </View>
                      )
                    }}
                    />
              </Card>
           </View>
            )
          })}
        </View>
      </ScrollView>

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
