import { View, Text, FlatList, Image,ScrollView,StyleSheet ,TouchableOpacity, SafeAreaView,Dimensions} from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from '../Components/Header'
import { Card } from 'react-native-paper';
import Metrics from '../Constants/Metrics';
import { useNavigation } from '@react-navigation/native';
import { API_BASE_URL } from '../api/ApiClient';
import Loader from '../Components/Loader';
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


const Graphs = () => {

  const navigation = useNavigation();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDropdownOpen1, setIsDropdownOpen1] = useState(false);
  const [isDropdownOpen2, setIsDropdownOpen2] = useState(false);
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
        color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
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
        color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
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
        color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
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


  return (
    <SafeAreaView style={styles.container}>
        <Loader loading={loading}></Loader>
      {/* <Header name={' '} Language={''} bellIcon={true} /> */}
      <ScrollView>
         <View style={{  alignSelf: 'center',  width: '90%',marginTop:Metrics.rfv(100)}}>
      <TouchableOpacity style={styles.ButtonStyles} onPress={toggleDropdown}>
        <Text style={styles.TextStyles}>{'Weekly stats'}</Text>
        <MaterialIcons
          name="keyboard-arrow-down"
          color={'#333'}
          size={20}
          style={{
            transform: isDropdownOpen
              ? [{rotate: '180deg'}]
              : [{rotate: '0deg'}],
          }}
        />
      </TouchableOpacity>
      </View>
      {isDropdownOpen && (
        <View>
             <LineChart
          
          data={data1}
          width={screenWidth}
          height={220}
         chartConfig={chartConfig}
     />
        </View>
      )}
          <View style={{  alignSelf: 'center',  width: '90%',marginTop:Metrics.rfv(10)}}>
       <TouchableOpacity style={styles.ButtonStyles} onPress={toggleDropdown1}>
        <Text style={styles.TextStyles}>{'Monthly stats'}</Text>
        <MaterialIcons
          name="keyboard-arrow-down"
          color={'#333'}
          size={20}
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

          <LineChart
          
            data={data}
            width={screenWidth}
            height={220}
           chartConfig={chartConfig}
       />
        </View>
      )}
          <View style={{  alignSelf: 'center',  width: '90%',marginTop:Metrics.rfv(10)}}>
       <TouchableOpacity style={styles.ButtonStyles} onPress={toggleDropdown2}>
        <Text style={styles.TextStyles}>{'Yearly stats'}</Text>
        <MaterialIcons
          name="keyboard-arrow-down"
          color={'#333'}
          size={20}
          style={{
            transform: isDropdownOpen2
              ? [{rotate: '180deg'}]
              : [{rotate: '0deg'}],
          }}
        />
      </TouchableOpacity>
      </View>
      {isDropdownOpen2 && (
        <View>
             <LineChart
          
          data={data2}
          width={screenWidth}
          height={220}
         chartConfig={chartConfig}
     />
        </View>
      )}
     
      </ScrollView>
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 12,
  
  },
  ButtonStyles: {
    backgroundColor: '#FFF',
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 50,
    alignItems: 'center',
    paddingHorizontal: 15,
   
  },

  TextStyles: {
    fontSize: 13,
    fontFamily: 'Poppins-Bold',
    color: '#000000',
    opacity: 0.35,
  },
});
export default Graphs;