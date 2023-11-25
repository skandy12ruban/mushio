import { View, Text,SafeAreaView,ScrollView } from 'react-native'
import React from 'react'
import Entypo from 'react-native-vector-icons/Entypo';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Metrics from '../Constants/Metrics';

const PrivateAbout = () => {
    const navigation=useNavigation()
    return (
      <SafeAreaView style={{alignSelf:'center',width:'100%'}}>
       {/* <View style={{margin:10,flexDirection:'row',justifyContent:'space-between'}}> */}
       <View style={{flexDirection:'row',margin:10}}>
          
          <Ionicons
              onPress={() => {
                 navigation.goBack()
              }}
              style={{
                paddingLeft: 10
              }}
              name={'arrow-back'}
              size={30}
              color={'black'}
            />
            <Text style={{color:'black',fontWeight:'bold',fontSize:25,paddingLeft: 20}}>{'About'}</Text>
           </View>
           
           {/* <View style={{bottom:10}}>
                 <Entypo
                    name="menu"
                     size={40}
                     style={{color:'black',}}
                    onPress={()=>{ navigation.dispatch(DrawerActions.openDrawer());}}
                   /> 
          </View> */}
      {/* </View> */}
     <ScrollView>
    <View style={{margin:10,backgroundColor:'white',padding:10,alignSelf:'center'}}>
    <Text style={{color:'black',alignSelf:'center'}}>The Sehalo app has two modes, Mood Tracker and Entertainment, each with its unique features. 
      The application offers two profiles, a private and public profile, to the user.
       The primary goal is to provide an entertaining experience while assisting individuals in self-evaluation and mood tracking.
       The private profile is focused on mood tracking, while the public profile is to share media and connect with others.
        Overall, the app aims to provide a comprehensive and enjoyable user experience</Text>
      
         
          <Text style={{fontWeight:'bold',color:'black',alignSelf:'center',padding:10}}>Privacy Policy : </Text>
          <Text style={{color:'black',alignSelf:'center'}}> One of our main priorities is the privacy of our users,
              This privacy policy document contains types of information that is collected and recorded by the mushio and how we use it.
             This privacy policy applies only to our online activities and is valid for users of our application with regards to information that they shared or collect in application.
              This policy is not applicable to any information collected offline or via channels other than this application.</Text>
              <View style={{alignSelf:'center'}}>
              <Text style={{fontWeight:'bold',color:'black',alignSelf:'center',padding:10}}> consent: :</Text>
          <Text style={{color:'black',alignSelf:'center'}}> By using our application , you hereby consent to our privacy policy and agree to its terms.
               Information we collect  the personal information that you are asked to provide , and the reasons why you are asked to provide it, will be made clear to you at the point we ask you to provide your personal information.
              When you register for an account , we may ask for your contact information , including items such as name , dob , address , emailid ,and phone number ..</Text>
              </View>
              <View style={{alignSelf:'center'}}>
              <Text style={{fontWeight:'bold',color:'black',alignSelf:'center',marginTop:10,padding:5}}> How we use your information:</Text>
              <Text style={{color:'black'}}>We use the information we collect in various ways , including to :</Text>
              <Text style={{color:'black'}}>1)Provide , operate and maintain our application user’s account</Text>
              <Text style={{color:'black'}}>2)Understand and analyze how you use our application</Text>
              <Text style={{color:'black'}}>3)Develop new features , services and functionality</Text>
              <Text style={{color:'black'}}>4)Communicate with you , either directly or through customer services , to provide you with updates and other information relating to the application.</Text>
              <Text style={{color:'black'}}>5)Send you emails </Text>
               <Text style={{color:'black'}}>6)Find and prevent frauds</Text>
            </View>
               <Text style={{fontWeight:'bold',color:'black',alignSelf:'center',padding:5,marginTop:10}}> Log files :</Text>
               <Text style={{color:'black'}}>Mushio follows a standard procedure of using log files .</Text>
               <Text style={{color:'black'}}>These files log users when they use our application
                  The information collected by log files include internet protocol(IP)addresses, browser type , internet service provider(ISP),</Text>
                  <Text style={{color:'black'}}>Date and time stamp , referring /exit pages , and possibly the number of clicks. These are not linked to any information that is personally identifiable . </Text>
                  <Text style={{color:'black'}}>The purpose of the information is for analyzing trends, administering the site , tracking user’s movement on the application, and gathering demographic information.  </Text>
     
                  <Text style={{fontWeight:'bold',color:'black',padding:5,marginTop:10}}>Digital personal data protection (DPDP ACT 2023)</Text>
               <Text style={{color:'black'}}> We would like to make sure you are fully aware of all of your data protection rights . Every user is entitled to the following :</Text>
               <Text style={{color:'black'}}>1. The Right to access :you have the right to access information of your personal data. </Text>
                  <Text style={{color:'black'}}>The Right to rectification :
                      you have the right to rectify the information which is incomplete or    inaccurate.</Text>
                  <Text style={{color:'black'}}>3. The right to erasure :
                   You have a right to request that we erase your personal data, under certain conditions.  </Text>
    

               <Text style={{fontWeight:'bold',color:'black',alignSelf:'center',padding:5,marginTop:10}}>   children's information :</Text>
               <Text style={{color:'black'}}>Another part of our priority is adding protection for children while using the application . We encourage parents and guardians to observe , participate in, and/or monitor and guide their online activity.</Text>
               <Text style={{color:'black',}}>Belinvo does not knowingly collect any personal identifiable information from children under the age of 18 and from disabled person.</Text>
             <Text style={{color:'black',}}>If you think that your child provided this kind of information on our application , we strongly encourage you to contact us immediately and we will do our best efforts to promptly remove such information from our records.</Text>
           
             <Text style={{fontWeight:'bold',color:'black',alignSelf:'center',marginTop:10,padding:5}}>contact us:</Text>
               <Text style={{color:'black'}}>,We may update our privacy policy from time to time . Thus, we advise you to review this page periodically for any changes .</Text>
               <Text style={{color:'black',marginBottom:100}}>If you have any questions or suggestions about our privacy policy,do not hestitate to contact us.</Text>

    </View>
    </ScrollView>
    </SafeAreaView>
  );
}

export default PrivateAbout;
