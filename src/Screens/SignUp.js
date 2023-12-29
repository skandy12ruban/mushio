import {View, Text, SafeAreaView,StyleSheet,TouchableOpacity,TextInput,Dimensions,Image,useColorScheme} from 'react-native';
import React,{useState} from 'react';
import { Formik } from 'formik';
import Metrics from '../Constants/Metrics';
import LinearGradient from 'react-native-linear-gradient'
import AppTextFieldPassword from '../Components/AppTextFieldPassword';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import * as yup from 'yup'

const { width, height } = Dimensions.get('window');

export const SignUpFormInitialValues = props => ({
    name: '',
    password: '',
    confirmpassword: '',
});
export const SignUpFormValidator = props => {
    return yup.object().shape({
        name: yup
            .string()
            .required('Name is Required'),
            password: yup
            .string()
            .required('Password is required'),
            confirmpassword: yup
            .string()
            .required('confirmPassword is required'),
    });
};
const SignUp = (props) => {
const navigation=useNavigation()
const [viewPassword, setViewPassword] = useState(true);
const [viewPassword1, setViewPassword1] = useState(true);
const theme = useColorScheme();

  return (
    <SafeAreaView style={{ flex:1,backgroundColor:theme === 'dark' ? 'black':'white',}}>
   {/* <LinearGradient
      colors={['#cdffd8', '#94b9ff' ]}
      style={{flex:1,width:"100%",height:'100%'}}
      start={{ x: 0, y: 0.5 }}
      end={{ x: 1, y: 0.5 }}
    > */}
         
      <View
        style={{
          alignSelf: 'center',
          width: '90%',marginTop:Metrics.rfv(0)
        }}>
          <Image
          style={{
             width:120,height:100,margin:0,borderRadius:0,alignSelf:'center',marginTop:30,marginLeft:20
            }}
            source={theme === 'dark' ?require('../assets/images/login1.png'):require('../assets/images/login.png')}
         />
            <Text style={{color:'#c6302c',alignSelf:'center',fontWeight:'bold',fontSize:35,fontFamily:'Arial',marginTop:Metrics.rfv(10)}}> Sign <Text  style={{color:theme === 'dark' ? 'white':'black',}}>up</Text> </Text>
        <Formik
          initialValues={SignUpFormInitialValues(props)}
          validationSchema={SignUpFormValidator(props)}
          onSubmit={(values, {resetForm}) => {
            // SignUpFunction(values, resetForm);
            console.log('values',values)
            navigation.navigate('VerificationScreen',{values:values})
          }}>
          {({
            values,
            handleChange,
            setFieldValue,
            errors,
            touched,
            setFieldTouched,
            isValid,
            handleSubmit,
          }) => (
            <>
             <View style={{alignSelf:'center',width:'100%',marginTop:20}}>
        <TextInput
         value={values.name}
         placeholder={'  Name'}
         placeholderTextColor={'black'}
         style={{padding:5,backgroundColor:'white',width:'70%',alignSelf:'center',margin:10,fontSize:15,fontWeight:'bold',color:theme === 'dark' ?'black':'',
         borderRadius:10,borderColor:'blue',borderWidth:1}}
         onChangeText={text => {
            setFieldValue('name' ,text);
          }}
        />
              {errors.name && touched.name && (
                  <Text style={{fontSize: 10, color: 'red', alignSelf:'center'}}>
                    {' '}
                    * {errors.name}
                  </Text>
                )}   
                  
                  <View style={{padding:0,backgroundColor:'white',width:'70%',alignSelf:'center',flexDirection:'row',height:40,
                  justifyContent:'space-between',borderRadius:10,borderColor:'blue',borderWidth:1,}}>
                    <TextInput
                   value={values.password}
                   placeholder={'password'}
                   placeholderTextColor={'black'}
                   style={{fontSize:15,fontWeight:'bold',marginLeft:5,color:theme === 'dark' ?'black':'',}}
                   onChangeText={text => {
                   setFieldValue('password' ,text);
                   }}
                   secureTextEntry={viewPassword}
                 />
                    <Icon
                      name={viewPassword ? 'eye-slash' : 'eye'}
                      color={'black'}
                      size={Metrics.rfv(18)}
                      style={{
                        textAlignVertical: 'center',
                        marginBottom: Metrics.rfv(3),marginRight:10
                      }}
                      onPress={() => {
                        setViewPassword(!viewPassword);
                      }}
                    />
                </View>
                {errors.password && touched.password && (
                  <Text style={{fontSize: 10, color: 'red', alignSelf:'center'}}>
                    {' '}
                    * {errors.password}
                  </Text>
                )}
                  <View style={{padding:0,backgroundColor:'white',width:'70%',alignSelf:'center',margin:10,flexDirection:'row',height:40,
                  justifyContent:'space-between',borderRadius:10,borderColor:'blue',borderWidth:1}}>
                    <TextInput
                   value={values.confirmpassword}
                   placeholder={'confirm password'}
                   placeholderTextColor={'black'}
                   style={{fontSize:15,fontWeight:'bold',marginLeft:5,color:theme === 'dark' ?'black':'',}}
                   onChangeText={text => {
                   setFieldValue('confirmpassword' ,text);
                   }}
                   secureTextEntry={viewPassword1}
                 />
                    <Icon
                      name={viewPassword1 ? 'eye-slash' : 'eye'}
                      color={'black'}
                      size={Metrics.rfv(18)}
                      style={{
                        textAlignVertical: 'center',
                        marginBottom: Metrics.rfv(3),marginRight:10
                      }}
                      onPress={() => {
                        setViewPassword1(!viewPassword1);
                      }}
                    />
                </View>
                {errors.confirmpassword && touched.confirmpassword && (
                  <Text style={{fontSize: 10, color: 'red', alignSelf:'center'}}>
                    {' '}
                    * {errors.confirmpassword}
                  </Text>
                )}
        <TouchableOpacity style={{ 
           backgroundColor: theme === 'dark' ?'white':'black',
                    padding:5,
                    width: width * 0.4,
                    alignSelf: 'center',
                    borderRadius: 10,
                    marginTop: 30,
                  }}
                  activeOpacity={0.5}
           onPress={()=>{
            if(values.password == values.confirmpassword){
              handleSubmit()
            }else{
              alert('Password does not match')
            }
            }}>
      <Text style={{color:theme === 'dark' ? 'black':'white',
    paddingVertical: 5,
    fontSize: 15,
    fontWeight: 'bold',
    alignSelf: 'center',}}>Next</Text>
                      {/* <Icon
                      name={'arrow-circle-right'}
                      color={'white'}
                      size={Metrics.rfv(50)}
                      /> */}
     </TouchableOpacity>
     <Text style={{alignSelf:'center',color:theme === 'dark' ? 'white':'black',fontWeight:'bold',fontSize:30,margin:20,marginTop:30}}>OR</Text>
     <TouchableOpacity onPress={()=>{ }}>
             <Feather
              name={'chrome'}
              color={'white'}
              style={{alignSelf:'center'}}
              size={Metrics.rfv(50)}
             />
     </TouchableOpacity>
             <Text style={{alignSelf:'center',color:'#c6302c',fontWeight:'bold',fontSize:20,margin:20}}>Sign Up with <Text style={{color:theme === 'dark' ? 'white':'black',}}>Google</Text> </Text>
       </View>
            </>
          )}
        </Formik>
      </View>
      {/* </LinearGradient> */}
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
    SectionStyle: {
        flexDirection: 'row',
        height: 43,
        width: '88%',
        marginLeft: 22,
        marginRight: 40,
        margin: 8,
        alignItems: 'center'

    },
    textFiledStyle: {
        height: '100%',
        width: '100%',
        //padding: 10,
        paddingLeft: Metrics.rfv(20),
        paddingRight: Metrics.rfv(20),
    },
    buttonTextStyle: {
        color: 'white',
        paddingVertical: 10,
        fontSize: 15,
        fontWeight: 'bold',
        alignSelf: 'center',
    },
    text: {
        flex: 1,
        color: '#3d4b69',
        fontSize: 13,
        fontWeight: 'bold',
        marginTop: 8,
        marginRight: 180
    },
    inputStyle: {
        flex: 2,
        height: 43,
        width: '100%',
        color: 'black',
        fontSize: 16,
        fontWeight: 'bold',
        paddingLeft: 15,
        paddingRight: 15,
        borderWidth: 1,
        borderRadius: 3,
        borderColor: '#dadee3',
        backgroundColor: 'white'
    },
    errorTextStyle: {
        color: 'red',
        textAlign: 'center',
        fontSize: 14,
    },
    successTextStyle: {
        color: 'white',
        textAlign: 'center',
        fontSize: 15,
        padding: 30,
    },
});
export default SignUp;
