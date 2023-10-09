import {View, Text, SafeAreaView,StyleSheet,TouchableOpacity,TextInput,Dimensions} from 'react-native';
import React from 'react';
import { Formik } from 'formik';
import Metrics from '../Constants/Metrics';
import AppTextFieldPassword from '../Components/AppTextFieldPassword';
import { useNavigation } from '@react-navigation/native';

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
            .required('email or mobile Number is Required'),
            password: yup
            .string()
            .required('Password is required'),
            confirmpassword: yup
            .string()
            .required('Password is required'),
    });
};
const SignUp = (props) => {
const navigation=useNavigation()

  return (
    <SafeAreaView style={{ backgroundColor: 'lightblue',flex:1}}>
 
      <View
        style={{
          alignSelf: 'center',
          width: '90%',marginTop:Metrics.rfv(100)
        }}>
            <Text style={{color:'red',alignSelf:'center',fontWeight:'bold',fontSize:30}}> Sign Up </Text>
        <Formik
          initialValues={SignUpFormInitialValues(props)}
        //   validationSchema={SignUpFormValidator(props)}
          onSubmit={(values, {resetForm}) => {
            // SignUpFunction(values, resetForm);
            navigation.navigate('VerificationScreen')
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
             <View style={{alignSelf:'center',width:'100%',}}>
        <TextInput
         value={values.name}
         placeholder={'Nickname'}
         placeholderTextColor={'grey'}
         style={{padding:10,backgroundColor:'white',borderRadius:5,margin:10,width:'90%',marginLeft: Metrics.rfv(20),}}
         onChangeText={text => {
            setFieldValue('name' ,text);
          }}
        />
                 <AppTextFieldPassword
                    placeHolder={'password'}
                    value={values.password}
                    changeText={text => {
                      setFieldValue('password', text);
                    }}
                    secureTextEntry={true}
                  />
                   <AppTextFieldPassword
                    value={values.confirmpassword}
                    placeHolder={'confirm password'}
                    changeText={text => {
                      setFieldValue('confirmpassword', text);
                    }}
                    secureTextEntry={true}
                  />
        <TouchableOpacity style={{backgroundColor:'#00B0FF',width:'60%',padding:15,
          alignSelf:'center',marginTop:20,borderRadius:5}}
           onPress={()=>{handleSubmit()}}>
      <Text style={{alignSelf:'center',color:'white'}}>Submit</Text>
     </TouchableOpacity>
       </View>
            </>
          )}
        </Formik>
      </View>
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
