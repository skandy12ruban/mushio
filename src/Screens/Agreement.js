import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text,SafeAreaView,ScrollView,TouchableOpacity } from 'react-native';

const Agreement = () => {
const navigation=useNavigation()

  return (
    <SafeAreaView style={{flex:1,backgroundColor:'white',padding:10,alignSelf:'center',margin:10}}>
    <ScrollView>
      <Text style={{color:'black',fontWeight:'bold',alignSelf:'center',margin:5}}>By using our application </Text>
      <Text style={{color:'black',padding:5}}>
      you hereby consent to our privacy policy and agree to its terms.Information we collect the personal information that you are asked to provide , 
      and the reasons why you are asked to provide it, will be made clear to you at the point we ask you to provide your personal information.
       When you register for an account , we may ask for your contact information , including items such as name , dob , address , emailid ,and phone number,
       Working hours, dream, imp dates.
      </Text>
      <Text style={{color:'black',fontWeight:'bold',alignSelf:'center',}}>privacy policy </Text>
      <Text style={{color:'black',padding:5}}>
      One of our main priorities is the privacy of our users,
This privacy policy document contains types of information that is collected and recorded by the mushio and how we use it.
This privacy policy applies only to our online activities and is valid for users of our application with regards to information that they shared or collect in application.
This policy is not applicable to any information collected offline or via channels other than this application..
      </Text>
      <Text style={{color:'black',fontWeight:'bold',alignSelf:'center',margin:5}}>Terms and Conditions </Text>
      <Text style={{color:'black',padding:2}}>
        1.To use sehalo, you must be at atleast 13 years old or meet the minimum legal age requirement in your country.</Text>
        <Text style={{color:'black',padding:2}}>2.you must not be prohibited by applicable laws or denied party listings from receiving any aspect of the Service or engaging
        in payments related to it.</Text>
        <Text style={{color:'black',padding:2}}>3.Sehalo must not have previously disabled your account for violation of law or any of our policies.</Text>
        <Text style={{color:'black',padding:2}}>4. you must not be a convicted sex offender.
        </Text>
      <Text style={{color:'black',fontWeight:'bold',alignSelf:'center',margin:5}}>How we use your information </Text>
      <Text style={{color:'black',padding:5}}>
      We use the information we collect in various ways , including to : </Text>
      <Text style={{color:'black',padding:2}}>1)Provide , operate and maintain our application user’s account</Text>
      <Text style={{color:'black',padding:2}}>2)Understand and analyze how you use our application</Text>
      <Text style={{color:'black',padding:2}}>3)Develop new features , services and functionality</Text>
      <Text style={{color:'black',padding:2}}>4)Communicate with you , either directly or through customer services , to provide you with updates and other information relating to the application.</Text>
      <Text style={{color:'black',padding:2}}>5)Send you emails </Text>
      <Text style={{color:'black',padding:2}}>6)Find and prevent frauds.</Text>
           <View style={{alignSelf:'center',margin:10}}>
                <TouchableOpacity style={{backgroundColor:'#5858FA',padding:10,borderRadius:5}}
                onPress={()=>{navigation.goBack()}}>
                    <Text style={{color:'white'}}>Agree</Text>
                </TouchableOpacity>
           </View>
    </ScrollView>
    </SafeAreaView>
  );
}

export default Agreement;
