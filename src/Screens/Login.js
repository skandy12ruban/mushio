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
} from 'react-native';
import {Input} from 'react-native-elements';
import {withGlobalize} from 'react-native-globalize';
import {TouchableOpacity} from 'react-native';
import Metrics from '../Constants/Metrics';
import api from '../api';
import IntlProvider from '../utils/IntlProvider';
import Loader from '../Components/Loader';
import {Formik} from 'formik';
import * as yup from 'yup';
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
import Icon from 'react-native-vector-icons/FontAwesome5';
import {useNavigation} from '@react-navigation/native';
import AppTextFieldPassword from '../Components/AppTextFieldPassword';
import {useDispatch} from 'react-redux';
import {saveUserProfileInfo} from '../utils/AsyncStorageHelper';
import {setuser} from '../Redux/reducer/User';
import {MAIN_ROUTE} from '../routes/RouteConst';
import {API_BASE_URL} from '../api/ApiClient';

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

    return (
      <ScrollView
        style={{
          backgroundColor: 'lightblue',
        }}>
        <Loader loading={loading}></Loader>

        <View
          style={{
            alignSelf: 'center',
            width: '90%',marginTop:Metrics.rfv(100)
          }}>
          <Text style={{color:'red',alignSelf:'center',fontWeight:'bold',fontSize:30}}> ᗰᑌᔕᕼIO </Text>
          <Formik
            initialValues={SignInFormInitialValues(props)}
            // validationSchema={SignInFormValidator(props)}
            onSubmit={(values, {resetForm}) => {
              // SignUpFunction()
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
            
                <View style={styles.SectionStyle}>
                  <TextInput
                    placeholder="example@gmail.com"
                    style={styles.inputStyle}
                    onChangeText={text => {
                      // if(text != '' && text != 'example@gmail.com'){
                      setFieldValue('email', text);
                      // }
                    }}
                    value={values.email}
                    placeholderTextColor="gray"
                    keyboardType="email-address"
                  />
                </View>
                {errors.email && touched.email && (
                  <Text style={{fontSize: 10, color: 'red', marginLeft: 20}}>
                    {' '}
                    * {errors.email}
                  </Text>
                )}
                
                <View >
                  <AppTextFieldPassword
                    placeHolder={'......'}
                    value={values.password}
                    changeText={text => {
                      setFieldValue('password', text);
                    }}
                    secureTextEntry={true}
                  />
                </View>
                {errors.password && touched.password && (
                  <Text style={{fontSize: 10, color: 'red', marginLeft: 20}}>
                    {' '}
                    * {errors.password}
                  </Text>
                )}

                <TouchableOpacity
                  style={{
                    backgroundColor: '#00B0FF',
                    padding:5,
                    width: width * 0.7,
                    alignSelf: 'center',
                    borderRadius: 10,
                    marginTop: 20,
                    marginBottom: 20,
                  }}
                  activeOpacity={0.5}
                  onPress={() => {
                    const userInfo = {userId: 101};
                    saveUserProfileInfo(userInfo);
                    dispatch(setuser(userInfo))
                    navigation.reset({
                      index: 0,
                      routes: [{name: MAIN_ROUTE}],
                    });
                    handleSubmit();
                  }}>
                  <Text style={styles.buttonTextStyle}>Sign In</Text>
                </TouchableOpacity>
              </>
            )}
          </Formik>
        </View>
        <View style={{marginTop:50}}>
              <Text
                style={{marginTop: 5, alignSelf: 'center',}}>
                You don't have account ? {' '} 
                {/* <TouchableOpacity  onPress={() => navigation.navigate('SignUp')} > */}
                <Text style={{color: 'blue',fontSize:20,}} onPress={() => navigation.navigate('SignUp')}>Sign Up </Text>
                {/* </TouchableOpacity> */}
               
              </Text>
         
          </View>
      </ScrollView>
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
