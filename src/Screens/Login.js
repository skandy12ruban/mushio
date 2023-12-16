import React, {memo, useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Dimensions,
  ScrollView,
  Image,
  BackHandler,
  useColorScheme,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient'
import {withGlobalize} from 'react-native-globalize';
import {TouchableOpacity} from 'react-native';
import Metrics from '../Constants/Metrics';
import api from '../api';
import IntlProvider from '../utils/IntlProvider';
import Loader from '../Components/Loader';
import {Formik} from 'formik';
import * as yup from 'yup';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {RFValue} from 'react-native-responsive-fontsize';
import {
  BLACK_COLOR,
  FONT_BOLD,
  LOGIN_BTN_COLOR,
  SMALL_FONT_SIZE,
  STANDARD_SCREEN_HEIGHT,
  WHITE_COLOR,
} from '../utils/AppConst';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';
import AppTextFieldPassword from '../Components/AppTextFieldPassword';
import {useDispatch} from 'react-redux';
import {getUserType, saveUserProfileInfo} from '../utils/AsyncStorageHelper';
import {setuser} from '../Redux/reducer/User';
import {MAIN_ROUTE} from '../routes/RouteConst';
import {API_BASE_URL} from '../api/ApiClient';
import { PUBLIC_MAIN_ROUTE } from '../routes/PublicRouteConts';

const {width, height} = Dimensions.get('window');

export const SignInFormInitialValues = props => ({
  email: '',
  password: '',
});

export const SignInFormValidator = props => {
  return yup.object().shape({
    email: yup.string().required('email or mobile Number is Required'),
    password: yup.string().required('Password is required'),
  });
};

const Login = withGlobalize(
  memo(props => {
    const intl = IntlProvider(props);
    const theme = useColorScheme();
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const [logins, setLogins] = useState(true);
    const [loading, setLoading] = useState(false);
    const [viewPassword, setViewPassword] = useState(true);

    useEffect(() => {
      const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        () => false,
      );
      return () => backHandler.remove();
    }, []);

   const Login = async (values)=>{
    setLoading(true)
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    
    var raw = JSON.stringify({
      "password": `${values.password}`,
      "email": `${values.email}`
    });
    
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
    };
    
    fetch(`${API_BASE_URL}/api/userAuth/login`, requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log(result.data)
        if(result && result.success == true){
           const usertype= getUserType()
           console.log('vsfvfzv',usertype)
              const userInfo = result.data;
              saveUserProfileInfo(userInfo);
              dispatch(setuser(userInfo))
                  if(usertype && usertype == 'Public'){
                      navigation.reset({
                        index: 0,
                        routes: [{name: PUBLIC_MAIN_ROUTE}],
                      });
                      setLoading(false)
                    }else{
             navigation.reset({
                        index: 0,
                        routes: [{name: MAIN_ROUTE}],
                      });
                      setLoading(false)
                    }
           setLoading(false)
        }else{
          alert(result.message)
          setLoading(false)
        }
      })
      .catch(error => {
        console.log('error', error)
        setLoading(false)
      });
   }


    return (
    //   <LinearGradient
    //   colors={['#cdffd8', '#94b9ff' ]}
    //   style={{flex:1,width:"100%",height:'100%'}}
    //   start={{ x: 0, y: 0.5 }}
    //   end={{ x: 1, y: 0.5 }}
    // >
    <View style={{backgroundColor:theme === 'dark' ? 'white':'black',flex:1}}>
      <ScrollView
        style={{
          // backgroundColor: 'lightblue',
        }}>
        <Loader loading={loading}></Loader>
        <Image
          style={{
             width:120,height:120,margin:10,borderRadius:10,alignSelf:'center',marginTop:30,borderRadius:150,transform: [{ rotate: '40deg'}]
            }}
           source={require('../assets/images/Name1.jpg')}
         />
        <View
          style={{
            alignSelf: 'center',
            width: '90%',
          }}>
          <Text style={{color:'#0058aa',alignSelf:'center',fontWeight:'bold',fontSize:50,fontFamily:'Arial'}}> Sehalo</Text>
          <Formik
            initialValues={SignInFormInitialValues(props)}
            validationSchema={SignInFormValidator(props)}
            onSubmit={(values, {resetForm}) => {
              Login(values)
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
            
               
                <TextInput
                   value={values.email}
                   placeholder={' Email'}
                   placeholderTextColor={'grey'}
                   style={{padding:6,backgroundColor:'white',width:'70%',alignSelf:'center',margin:20,fontSize:20,fontWeight:'bold',
                   borderRadius:10,borderColor:'blue',borderWidth:1,color:theme === 'dark' ?'black':''}}
                   onChangeText={text => {
                   setFieldValue('email' ,text);
                   }}
                 />
               
                {errors.email && touched.email && (
                  <Text style={{fontSize: 10, color: 'red', marginLeft: 20}}>
                    {' '}
                    * {errors.email}
                  </Text>
                )}
                
                  
                  {/* <View>
                  <AppTextFieldPassword
                    placeHolder={'password'}
                    value={values.password}
                    changeText={text => {
                      setFieldValue('password', text);
                    }}
                    secureTextEntry={true}
                  />
                  </View> */}
                 

                  <View style={{backgroundColor:'white',width:'70%',alignSelf:'center',margin:10,flexDirection:'row',
                  justifyContent:'space-between',borderRadius:10,borderColor:'blue',borderWidth:1,height:45,}}>
                    <TextInput
                   value={values.password}
                   placeholder={' Password'}
                   placeholderTextColor={'grey'}
                   style={{fontSize:20,fontWeight:'bold',marginLeft:5,color:theme === 'dark' ?'black':''}}
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
                  <Text style={{fontSize: 10, color: 'red', marginLeft: 20,}}>
                    {' '}
                    * {errors.password}
                  </Text>
                )}
                <TouchableOpacity onPress={()=>{navigation.navigate('Forget')}}>
              <Text style={{color: '#00B0FF',fontSize:20,fontWeight:'bold',alignSelf:'center',margin:20}}>Forget Password ?</Text>
              </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    backgroundColor: theme === 'dark' ?'black':'white',
                    padding:5,
                    width: width * 0.4,
                    alignSelf: 'center',
                    borderRadius: 10,
                    marginTop: 20,
                    // marginBottom: 20,
                  }}
                  activeOpacity={0.5}
                  onPress={async() => {
                    // const usertype=await getUserType()
                    // console.log('vsfvfzv',usertype)
                    // const userInfo = {userId: 101};
                    // saveUserProfileInfo(userInfo);
                    // dispatch(setuser(userInfo))
                    // if(usertype && usertype == 'Public'){
                      // navigation.reset({
                      //   index: 0,
                      //   routes: [{name: PUBLIC_MAIN_ROUTE}],
                      // });
                    // }else{
                    //   navigation.reset({
                    //     index: 0,
                    //     routes: [{name: MAIN_ROUTE}],
                    //   });
                    // }
                    handleSubmit();
                  }}>
                  <Text style={{ color: theme === 'dark' ? 'white':'black',
    paddingVertical: 5,
    fontSize: 15,
    fontWeight: 'bold',
    alignSelf: 'center',}}>Login </Text>
                  {/* <MaterialCommunityIcons
                     name="check-decagram"
                     color={'white'}
                    size={70}
                  /> */}
                </TouchableOpacity>
              </>
            )}
          </Formik>
        </View>
       
        <View style={{marginTop:80}}>
              <Text
                style={{marginTop: 5, alignSelf: 'center',fontWeight:'bold',color:'#0058aa'}}>
                Don't have an account ? {' '} 
                {/* <TouchableOpacity  onPress={() => navigation.navigate('SignUp')} > */}
                <Text style={{color: '#00B0FF',fontSize:20,fontWeight:'bold'}} onPress={() => navigation.navigate('SignUp')}>Sign Up </Text>
                {/* </TouchableOpacity> */}
               
              </Text>
         
          </View>
      </ScrollView>
       {/* </LinearGradient> */}
      </View>
    );
  }),
);
const styles = StyleSheet.create({
  SectionStyle: {
    flexDirection: 'row',
    height: 43,
    width: '88%',
    marginLeft: 22,
    marginRight: 40,
    margin: 8,
    alignItems: 'center',
    marginTop:30
  },
  textFiledStyle: {
    height: '100%',
    width: '100%',
    //padding: 10,
    paddingLeft: Metrics.rfv(20),
    paddingRight: Metrics.rfv(20),
  },
  buttonTextStyle: {
    color: 'black',
    paddingVertical: 5,
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
    marginRight: 180,
  },
  inputStyle: {
    flex: 2,
    height: 43,
    width: '100%',
    color: 'black',
    fontSize: 16,
    // fontWeight: 'bold',
    paddingLeft: 15,
    paddingRight: 15,
    borderWidth: 1,
    borderRadius: 3,
    borderColor: '#dadee3',
    backgroundColor: 'white',
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
export default Login;
