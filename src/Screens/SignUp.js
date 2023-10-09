import {View, Text, SafeAreaView,StyleSheet,TouchableOpacity,TextInput,Dimensions} from 'react-native';
import React from 'react';
import { Formik } from 'formik';
import Metrics from '../Constants/Metrics';
import AppTextFieldPassword from '../Components/AppTextFieldPassword';

const { width, height } = Dimensions.get('window');

export const SignUpFormInitialValues = props => ({
    signUpemail: '',
    signUppassword: '',
    signUpconfpassword: '',
});
export const SignUpFormValidator = props => {
    return yup.object().shape({
        signUpemail: yup
            .string()
            .required('email or mobile Number is Required'),
        signUppassword: yup
            .string()
            .required('Password is required'),
        signUpconfpassword: yup
            .string()
            .required('Password is required'),
    });
};
const SignUp = (props) => {
  return (
    <SafeAreaView>
      <Text>SignUp</Text>
      <View
        style={{
          alignSelf: 'center',
          width: '90%',
        }}>
        <Formik
          initialValues={SignUpFormInitialValues(props)}
        //   validationSchema={SignUpFormValidator(props)}
          onSubmit={(values, {resetForm}) => {
            // SignUpFunction(values, resetForm);
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
              <View
                style={{
                  marginLeft: Metrics.rfv(25),
                  marginTop: 5,
                }}>
                <Text
                  style={{
                    color: '#3d4b69',
                    fontSize: 14,
                    fontWeight: 'bold',
                  }}>
                  Phone Number or Email
                </Text>
              </View>
              <View style={styles.SectionStyle}>
                <TextInput
                  placeholder="example@gmail.com"
                  style={styles.inputStyle}
                  onChangeText={text => {
                    setFieldValue('signUpemail', text);
                  }}
                  value={values.signUpemail}
                  placeholderTextColor="gray"
                  keyboardType="email-address"
                  touched={touched.signUpemail}
                  error={errors.signUpemail}
                />
              </View>
              <View
                style={{
                  marginLeft: Metrics.rfv(25),
                  marginTop: 5,
                }}>
                <Text
                  style={{
                    color: '#3d4b69',
                    fontSize: 14,
                    fontWeight: 'bold',
                  }}>
                  Password
                </Text>
              </View>
              <View>
                <AppTextFieldPassword
                  placeHolder={'......'}
                  value={values.signUppassword}
                  changeText={text => {
                    setFieldValue('signUppassword', text);
                  }}
                  secureTextEntry={true}
                  touched={touched.signUppassword}
                  error={errors.signUppassword}
                />
              </View>
              <View
                style={{
                  marginLeft: Metrics.rfv(25),
                  marginTop: 5,
                }}>
                <Text
                  style={{
                    color: '#3d4b69',
                    fontSize: 14,
                    fontWeight: 'bold',
                  }}>
                  Confirm Password
                </Text>
              </View>
              <View>
                <AppTextFieldPassword
                  placeHolder={'........'}
                  value={values.signUpconfpassword}
                  changeText={text => {
                    setFieldValue('signUpconfpassword', text);
                  }}
                  secureTextEntry={true}
                  touched={touched.signUpconfpassword}
                  error={errors.signUpconfpassword}
                />
              </View>
              <TouchableOpacity
                style={{
                  backgroundColor: '#41bab0',
                  color: '#FFFFFF',
                  borderColor: '#7DE24E',
                  height: 42,
                  width: width * 0.35,
                  alignSelf: 'center',
                  borderRadius: 30,
                  marginTop: 20,
                  marginBottom: 20,
                }}
                activeOpacity={0.5}
                onPress={() => {
                  handleSubmit();
                }}>
                <Text style={styles.buttonTextStyle}>Sign Up</Text>
              </TouchableOpacity>
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
