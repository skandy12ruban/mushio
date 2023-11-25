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
import { getUserProfileInfo } from '../utils/AsyncStorageHelper';


const Home = (props) => {
  const navigation = useNavigation();

  const[loading,setLoading]=useState(false)
  const[momentsArray,setMomentsArray]=useState([])
  
//   const [date, setFromDate] = useState({
//     date: new Date(),
//     formatFromDate: DateHelper.formatToDate(new Date())
// });
const [selectedDateString, setSelectedDateString] = useState(DateHelper.formatToDateYMD(new Date()));
console.log('dddd',selectedDateString)
const data=[
  {id:1,color:'#FFB6C1',image:require('../assets/images/image1.jpg'),name:'SuperHappy'},
  {id:2,color:'#00B0FF',image:require('../assets/images/image3.jpg'),name:'Happy'},
  {id:3,color:'#008B8B',image:require('../assets/images/image2.jpg'),name:'Neutral'},
  {id:4,color:'#F4C430',image:require('../assets/images/image4.jpg'),name:'Sad'},
  {id:5,color:'#FF7F7F',image:require('../assets/images/image5.jpg'),name:"VerySad"},
]


const getAllMoments = async (Date)=>{

  // console.log('date.',Date != undefined ? Date : selectedDateString);
  const res= await getUserProfileInfo()
  // console.log(res.accessToken)
 setLoading(true)
  var myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${res.accessToken}`);
  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
    };
    // console.log(`${API_BASE_URL}/api/private/moment/myMoments?date=${Date != undefined ? Date : selectedDateString}&sortType=desc&page=1&perPage=100`)
    fetch(`${API_BASE_URL}/api/private/moment/myMoments?date=${Date != undefined ? Date : selectedDateString}&sortType=desc&page=1&perPage=100`, requestOptions)
    .then(response => response.json())
    .then(result => {
      console.log(result.data.list)
      if(result && result.success == true){
        setMomentsArray(result.data.list)
        setLoading(false)
      }
      setLoading(false)
    })
    .catch(error => {
      console.log('error', error)
      setLoading(false)
    });
}

useEffect(()=>{
  getAllMoments()
},[])

  const Item =async ({item})=>{
    console.log('item.',item)
    return(
      <View>
         <TouchableOpacity style={{backgroundColor:item.color, width:30,height:30,borderRadius:5,}} >
                        <Image
                          style={{
                          width:20,height:20,margin:5,borderRadius:5,
                         }}
                        source={item.image}
                      />
             </TouchableOpacity>
      </View>
    )
  }

  return (
    <SafeAreaView style={{flex:1}}>
        <Loader loading={loading}></Loader>
      <Header name={'Home '} Language={''} bellIcon={true} />
      <View>
      <TouchableOpacity style={{backgroundColor:'white', width:60,height:60,borderRadius:10,}}
        onPress={()=>{
          // setselectedItem(item)
          }} >
      <Image
          style={{
             width:40,height:40,margin:10,borderRadius:10,
            }}
           source={require('../assets/images/image3.jpg')}
         />
         </TouchableOpacity>
      </View>
     <Text style={{fontSize:25,marginLeft:Metrics.rfv(30),color:'black',fontFamily:'Montserrat-Bold',}}>Hello, <Text style={{color:'#00B0FF',fontStyle:'Montserrat-Bold',}}>Satish</Text></Text>
     <Text style={{marginLeft:Metrics.rfv(30),color:'black',fontFamily:'Roboto-Regular'}}>Dec greets you good morning</Text>
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
        let Date=DateHelper.formatToDateYMD(date)
        // console.log('date..',DateHelper.formatToDateYMD(date))
        setSelectedDateString(DateHelper.formatToDateYMD(Date))
        getAllMoments(Date)
      }}
    />
      </View>
      <ScrollView>
        <View style={{flex:2}}>
          {momentsArray.length > 0 ? momentsArray.map((item)=>{
            
           
            return(
              <View style={{margin:10,alignSelf:'center',width:'90%'}}>
              <Card style={{backgroundColor:'white'}}>
                 <View style={{flexDirection:'row',justifyContent:'space-between',padding:10,}}>
                  <Text style={{fontWeight:'bold',color:'#00B0FF',backgroundColor:'black',padding:5,borderRadius:10,}}>{item.title}</Text>
                 <FlatList
                    data={data}
                    keyExtractor={item => item.id}
                    renderItem={(e1)=>{
                     let name = e1.item.name ==  item.emoji ? e1.item : '';
                      console.log('eeeeee',item);
                      return(
                        <TouchableOpacity style={{backgroundColor:name.color, width:30,height:30,borderRadius:5,}} >
                        <Image
                          style={{
                          width:20,height:20,margin:5,borderRadius:5,
                         }}
                        source={name.image}
                      />
                     </TouchableOpacity> 
                      )
                    }}
                    />
                 </View>
                 <Text style={{padding:5,alignSelf:'center',color:'black'}}>{item.description}</Text>
                    <FlatList
                    // horizontal
                    numColumns={3}
                    data={item.keywords}
                    keyExtractor={item => item.index}
                    renderItem={(e)=>{
                      // console.log(e)
                      return(
                        <View style={{paddingLeft:10,backgroundColor:'lightblue',margin:10,borderRadius:10,}}>
                        <Text style={{alignSelf:'center',padding:2}}>{e.item}</Text>
                        </View>
                      )
                    }}
                    />
              </Card>
           </View>
            )
          }):(null)}
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
