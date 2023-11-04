import { View, Text, FlatList, Image,ScrollView,StyleSheet ,TouchableOpacity, SafeAreaView,Dimensions} from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from '../Components/Header'
import { Card } from 'react-native-paper';
import Metrics from '../Constants/Metrics';
import { useNavigation } from '@react-navigation/native';
import { API_BASE_URL } from '../api/ApiClient';
import Loader from '../Components/Loader';
import LinearGradient from 'react-native-linear-gradient'
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart
} from "react-native-chart-kit";

const screenWidth = Dimensions.get("window").width;

function* ylabel() {
  yield* ['none', 'low', 'med', 'high'];
}

const Graphs = () => {
  const ylabeliterator = ylabel();
  const navigation = useNavigation();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDropdownOpen1, setIsDropdownOpen1] = useState(false);
  const [isDropdownOpen2, setIsDropdownOpen2] = useState(false);
const [week,setWeek]=useState(false)
const[weekname,setWeekName]=useState('')
const [Month,setMonth]=useState(false)
const[monthName,setMonthName]=useState('')
const[YEAR,setyear]=useState(false)
const[yearname,setYearName]=useState('')

  const[loading,setLoading]=useState(false)
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  const toggleDropdown1 = () => {
    setIsDropdownOpen1(!isDropdownOpen1);
  };
  const toggleDropdown2 = () => {
    setIsDropdownOpen2(!isDropdownOpen2);
  };


  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun","July",'Aug','Sep','Oct',"Nov",'Dec'],
    datasets: [
      {
        data: [20, 45, 28, 80, 99, 43, 20, 45, 28, 80, 99, 43],
        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // optional
        strokeWidth: 2 // optional
      }
    ],
    // legend: ["Rainy Days"] // optional
  };
  const data1 = {
    labels: ["1st", "2nd", "3rd", "4th", "5th", "6th",],
    datasets: [
      {
        data: [20, 45, 28, 80, 99, 43, 20, 45, 28, 80, 99, 43],
        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // optional
        strokeWidth: 2 // optional
      }
    ],
    // legend: ["Rainy Days"] // optional
  };
  const data2 = {
    labels: ["2022", "2023", "2024", "2025", "2026", "2027",],
    datasets: [
      {
        data: [20, 45, 28, 80, 99, 43, 20, 45, 28, 80, 99, 43],
        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // optional
        strokeWidth: 2 // optional
      }
    ],
    // legend: ["Rainy Days"] // optional
  };
  const chartConfig = {
    
    backgroundGradientFrom: "white",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "white",
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false, // optional
    labelColor: (opacity = 1) => `rgba(255, 0, 0, ${opacity})`,
  };

useEffect(()=>{
 
},[])

let year = new Date().getFullYear() -1
const years=[];
for(let i=1; i<=10; i++){
  year = year + 1
  years.push(year)
}
console.log(years)

const DATA=years;

const Item=({item})=>{
  console.log('iii',item == new Date().getFullYear())
    return(
      <View style={{margin:3}}>

          <TouchableOpacity style={{borderWidth:1,borderRadius:100,alignSelf: 'center',padding:15,
           backgroundColor: item == new Date().getFullYear() ? 'grey' :''}}
           onPress={()=>{setyear(!YEAR),setYearName(item)}}>
      <Text style={{fontSize:10,color:item == new Date().getFullYear() ? 'white' : 'black' }}> {item}</Text>
     </TouchableOpacity>
        
        
      </View>
    )
}

const date = new Date();  // 2009-11-10
const month = date.toLocaleString('default', { month: 'long' });
console.log(month);




  return (
    <SafeAreaView style={styles.container}>
         <LinearGradient
      colors={['#cdffd8', '#94b9ff' ]}
      style={{flex:1,width:"100%",height:'100%'}}
      start={{ x: 0, y: 0.5 }}
      end={{ x: 1, y: 0.5 }}
    >
        <Loader loading={loading}></Loader>
      {/* <Header name={' '} Language={''} bellIcon={true} /> */}
      <Ionicons
        name='arrow-back'
        size={50}
        color='white'
        onPress={()=>{setWeek(false),setWeekName(''),setMonth(false),setMonthName(''),setyear(false),setYearName('')}}
        />
      <ScrollView>
         <View style={{  alignSelf: 'center',  width: '60%',marginTop:Metrics.rfv(100)}}>
      <TouchableOpacity style={styles.ButtonStyles} onPress={toggleDropdown}>
        <Text style={styles.TextStyles}>{'Weekly stats'}</Text>
        <MaterialIcons
          name="keyboard-arrow-down"
          color={'#333'}
          size={30}
          style={{
            transform: isDropdownOpen
              ? [{rotate: '180deg'}]
              : [{rotate: '0deg'}],
          }}
        />
      </TouchableOpacity>
      </View>
      {isDropdownOpen && (
        <View style={{margin:10}}>
             {/* <LineChart
          data={data1}
          width={screenWidth}
          height={220}
         chartConfig={chartConfig}
     /> */}
    
     
        {week ? (<View style={{backgroundColor:'white',padding:10,width:'70%',alignSelf:'center'}}>
          <Text style={{color:'black',fontWeight:'bold',alignSelf:'center'}}>{month}</Text>
          <TouchableOpacity style={{padding:15,borderWidth:1,borderRadius:100,alignSelf:'center',margin:10}}>
      <Text style={{fontSize:10,color:'black'}}> 100</Text>
       </TouchableOpacity>
            <Text style={{color:'black',fontWeight:'bold',alignSelf:'center',fontSize:10}}>{weekname}</Text>
            <Text style={{color:'#FF0040',fontWeight:'bold',alignSelf:'center',}}>" SUPPER HAPPY "</Text>
        </View>
        ):(
        <View>
          <View style={{flexDirection:'row',justifyContent:'space-around'}}>
     <TouchableOpacity style={{padding:20,borderWidth:1,borderRadius:100,width:'20%'}}
      onPress={()=>{setWeek(!week),setWeekName('1st Week')}}>
      <Text style={{fontSize:10,color:'black'}}> 1st Week</Text>
     </TouchableOpacity>
     <TouchableOpacity style={{padding:20,borderWidth:1,borderRadius:50,width:'20%'}}
     onPress={()=>{setWeek(!week),setWeekName('2nd Week')}}>
      <Text style={{fontSize:10,color:'black'}}> 2nd Week</Text>
     </TouchableOpacity>
     </View>
     <Text style={{color:'black',fontWeight:'bold',alignSelf:'center'}}>{month}</Text>
     <View style={{flexDirection:'row',justifyContent:'space-around'}}>
     <TouchableOpacity style={{padding:20,borderWidth:1,borderRadius:50,width:'20%'}}
     onPress={()=>{setWeek(!week),setWeekName('3rd Week')}}>
      <Text style={{fontSize:10,color:'black'}}> 3rd Week</Text>
     </TouchableOpacity>
     <TouchableOpacity style={{padding:20,borderWidth:1,borderRadius:50,width:'20%'}}
     onPress={()=>{setWeek(!week),setWeekName('4th Week')}}>
      <Text style={{fontSize:10,color:'black' }}> 4th Week</Text>
     </TouchableOpacity>
     </View>
          </View>)}
   
        </View>
      )}
          <View style={{  alignSelf: 'center',  width: '60%',marginTop:Metrics.rfv(10)}}>
       <TouchableOpacity style={styles.ButtonStyles} onPress={toggleDropdown1}>
        <Text style={styles.TextStyles}>{'Monthly stats'}</Text>
        <MaterialIcons
          name="keyboard-arrow-down"
          color={'#333'}
          size={30}
          style={{
            transform: isDropdownOpen1
              ? [{rotate: '180deg'}]
              : [{rotate: '0deg'}],
          }}
        />
      </TouchableOpacity>
      </View>
    
      {isDropdownOpen1 && (
        <View style={{  }}>
          <Text style={{fontSize:20,color:'black',fontWeight:'bold',alignSelf: 'center',margin:5}}>{new Date().getFullYear()}</Text>
          {/* <LineChart
          
            data={data}
            width={screenWidth}
            height={220}
           chartConfig={chartConfig}
       /> */}
     
     {Month ? (<View style={{backgroundColor:'white',padding:10,width:'70%',alignSelf:'center'}}>
          <Text style={{color:'black',fontWeight:'bold',alignSelf:'center'}}>{new Date().getFullYear()}</Text>
          <TouchableOpacity style={{padding:15,borderWidth:1,borderRadius:100,alignSelf:'center',margin:10}}>
      <Text style={{fontSize:10,color:'black'}}> 100</Text>
       </TouchableOpacity>
            <Text style={{color:'black',fontWeight:'bold',alignSelf:'center',fontSize:10}}>{monthName}</Text>
            <Text style={{color:'#FF0040',fontWeight:'bold',alignSelf:'center',}}>" SUPPER HAPPY "</Text>
        </View>):(<View>

        <View style={{flexDirection:'row',justifyContent:'space-around',margin:5}}>
     <TouchableOpacity style={{borderWidth:1,borderRadius:100,alignSelf: 'center',padding:15}}
     onPress={()=>{setMonth(!Month),setMonthName('January')}}>
      <Text style={{fontSize:10,color:'black'}}> Jan</Text>
     </TouchableOpacity>
     <TouchableOpacity style={{borderWidth:1,borderRadius:100,alignSelf: 'center',padding:15}}
      onPress={()=>{setMonth(!Month),setMonthName('February')}}>
      <Text style={{fontSize:10,color:'black'}}> Fed</Text>
     </TouchableOpacity>
     <TouchableOpacity style={{borderWidth:1,borderRadius:100,alignSelf: 'center',padding:15}}
      onPress={()=>{setMonth(!Month),setMonthName('March')}}>
      <Text style={{fontSize:10,color:'black'}}> Mar</Text>
     </TouchableOpacity>
     </View>
 
     <View style={{flexDirection:'row',justifyContent:'space-around',margin:5}}>
     <TouchableOpacity style={{borderWidth:1,borderRadius:100,alignSelf: 'center',padding:15}}
      onPress={()=>{setMonth(!Month),setMonthName('April')}}>
      <Text style={{fontSize:10,color:'black'}}> April</Text>
     </TouchableOpacity>
     <TouchableOpacity style={{borderWidth:1,borderRadius:100,alignSelf: 'center',padding:15}}
      onPress={()=>{setMonth(!Month),setMonthName('January')}}>
      <Text style={{fontSize:10,color:'black' }}> May</Text>
     </TouchableOpacity>
     <TouchableOpacity style={{borderWidth:1,borderRadius:100,alignSelf: 'center',padding:15}}
      onPress={()=>{setMonth(!Month),setMonthName('June')}}>
      <Text style={{fontSize:10,color:'black' }}> June</Text>
     </TouchableOpacity>
     </View>
     <View style={{flexDirection:'row',justifyContent:'space-around',margin:5}}>
     <TouchableOpacity style={{borderWidth:1,borderRadius:100,alignSelf: 'center',padding:15}}
      onPress={()=>{setMonth(!Month),setMonthName('July')}}>
      <Text style={{fontSize:10,color:'black'}}> July</Text>
     </TouchableOpacity>
     <TouchableOpacity style={{borderWidth:1,borderRadius:100,alignSelf: 'center',padding:15}}
      onPress={()=>{setMonth(!Month),setMonthName('August')}}>
      <Text style={{fontSize:10,color:'black'}}> Aug</Text>
     </TouchableOpacity>
     <TouchableOpacity style={{borderWidth:1,borderRadius:100,alignSelf: 'center',padding:15}}
      onPress={()=>{setMonth(!Month),setMonthName('September')}}>
      <Text style={{fontSize:10,color:'black'}}> Sep</Text>
     </TouchableOpacity>
     </View>
     <View style={{flexDirection:'row',justifyContent:'space-around',margin:5}}>
     <TouchableOpacity style={{borderWidth:1,borderRadius:100,alignSelf: 'center',padding:15}}
      onPress={()=>{setMonth(!Month),setMonthName('October')}}>
      <Text style={{fontSize:10,color:'black' }}> Oct</Text>
     </TouchableOpacity>
     <TouchableOpacity style={{borderWidth:1,borderRadius:100,alignSelf: 'center',padding:15}}
      onPress={()=>{setMonth(!Month),setMonthName('November')}}>
      <Text style={{fontSize:10,color:'black' }}> Nov</Text>
     </TouchableOpacity>
     <TouchableOpacity style={{borderWidth:1,borderRadius:100,alignSelf: 'center',padding:15}}
      onPress={()=>{setMonth(!Month),setMonthName('December')}}>
      <Text style={{fontSize:10,color:'black' }}> Dec</Text>
     </TouchableOpacity>
     </View>
     </View>)}
        </View>
      )}
          <View style={{  alignSelf: 'center',  width: '60%',marginTop:Metrics.rfv(10)}}>
       <TouchableOpacity style={styles.ButtonStyles} onPress={toggleDropdown2}>
        <Text style={styles.TextStyles}>{'Yearly stats'}</Text>
        <MaterialIcons
          name="keyboard-arrow-down"
          color={'#333'}
          size={30}
          style={{
            transform: isDropdownOpen2
              ? [{rotate: '180deg'}]
              : [{rotate: '0deg'}],
          }}
        />
      </TouchableOpacity>
      </View>
      {isDropdownOpen2 && (
        <View style={{margin:20}}>
             {/* <LineChart
          
          data={data2}
          width={screenWidth}
          height={220}
         chartConfig={chartConfig}
     /> */}
      {YEAR ? (<View style={{backgroundColor:'white',padding:10,width:'70%',alignSelf:'center'}}>
          <Text style={{color:'black',fontWeight:'bold',alignSelf:'center'}}>Decade of {years[0]} - {years[(years.length - 1)]}</Text>
          <TouchableOpacity style={{padding:15,borderWidth:1,borderRadius:100,alignSelf:'center',margin:10}}>
      <Text style={{fontSize:10,color:'black'}}> 100</Text>
       </TouchableOpacity>
            <Text style={{color:'black',fontWeight:'bold',alignSelf:'center',fontSize:10}}>{yearname}</Text>
            <Text style={{color:'#FF0040',fontWeight:'bold',alignSelf:'center',}}>" SUPPER HAPPY "</Text>
        </View>):(<View>
     <FlatList
     numColumns={5}
     data={DATA}
     renderItem={Item}
     keyExtractor={item=>item}
     />
      </View>)}
        </View>
      )}
     
      </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // marginTop: 12,
  
  },
  ButtonStyles: {
    backgroundColor: '#FFF',
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 50,
    alignItems: 'center',
    paddingHorizontal: 15,
   borderWidth:1,
   borderColor:'blue',borderRadius:30,margin:5
  },

  TextStyles: {
    // fontSize: 13,
    // fontFamily: 'Poppins-Bold',
    color: 'black',
    // opacity: 0.35,
    fontWeight:'bold'
  },
});
export default Graphs;