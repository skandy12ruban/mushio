import React, { memo, useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet, Dimensions, ScrollView, Image, BackHandler } from 'react-native';
import { Input } from 'react-native-elements';
import { withGlobalize } from 'react-native-globalize';
import { TouchableOpacity } from 'react-native';
import Metrics from '../Constants/Metrics';
import api from '../api';
import IntlProvider from '../utils/IntlProvider';
import Loader from '../Components/Loader';
import { Formik } from 'formik';
import * as yup from 'yup';
import { RFValue } from 'react-native-responsive-fontsize';
import { BLACK_COLOR, FONT_BOLD, LOGIN_BTN_COLOR, SMALL_FONT_SIZE, STANDARD_SCREEN_HEIGHT, WHITE_COLOR } from '../utils/AppConst';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useNavigation } from '@react-navigation/native';
import AppTextFieldPassword from '../Components/AppTextFieldPassword';
import { useDispatch } from 'react-redux';
import { saveUserProfileInfo } from '../utils/AsyncStorageHelper';
import { setuser } from '../Redux/reducer/User';
import { MAIN_ROUTE } from '../routes/RouteConst';
import { API_BASE_URL } from '../api/ApiClient';

const { width, height } = Dimensions.get('window');

export const SignInFormInitialValues = props => ({
    email: '',
    password: '',
});

export const SignInFormValidator = props => {
    return yup.object().shape({
        email: yup
            .string()
            .required('email or mobile Number is Required'),
        password: yup
            .string()
            .required('Password is required'),
    });
};

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
const Login = withGlobalize(memo(props => {

    const intl = IntlProvider(props);
    const navigation = useNavigation()
    const dispatch = useDispatch()
    const [logins, setLogins] = useState(true);
    const [loading, setLoading] = useState(false);
    const [viewPassword, setViewPassword] = useState(true);

    const LoginFunction = async (values) => {
        setLoading(true)
        const raw = JSON.stringify({
            "name": `${values.email}`,
            "pass": `${values.password}`
        });

        let requestOptions = {
            method: 'GET',
            redirect: 'follow',
        };
        console.log("payload", raw)
        fetch(`${API_BASE_URL}/session/token`, (requestOptions))
            .then(response => response.text())
            .then(result => {
                console.log('response', result);
                const myHeaders = new Headers();
                myHeaders.append("X-CSRF-Token", `${result}`);
                myHeaders.append("Content-Type", "application/json");

                const payload = {
                    method: 'POST',
                    headers: myHeaders,
                    body: raw,
                    redirect: 'follow'
                };

                fetch(`${API_BASE_URL}/user/login?_format=json`, payload)
                    .then(response => response.json())
                    .then(result => {
                        // console.log("result", result)
                        fetch(`${API_BASE_URL}/user/login_status?_format=json`, requestOptions)
                            .then(response => response.text())
                            .then(result1 => {
                                console.log('status response', result1)
                                if (result1 == '1') {
                                    const userInfo = result;
                                    console.log("userInfo", userInfo)
                                    saveUserProfileInfo(userInfo);
                                    dispatch(setuser(userInfo))
                                    navigation.reset({
                                        index: 0,
                                        routes: [{ name: MAIN_ROUTE }],
                                    })
                                    setLoading(false)
                                }else{
                                    alert('username and password does not match')
                                }
                                setLoading(false)
                            })
                            .catch(error => {
                                console.log('error', error)
                                setLoading(false)
                            });
                    }).catch(error => {
                        console.log('error', error)
                        setLoading(false)
                    });
            }).catch(error => {
                console.log('error1', error)
                setLoading(false)
            });
    }

    const SignUpFunction = async (values) => {

    }

    useEffect(() => {
        const backHandler = BackHandler.addEventListener('hardwareBackPress', () => false)
        return () => backHandler.remove()
    }, [])

    return (
        <ScrollView style={{
            backgroundColor: 'white'
        }}>
            <Loader loading={loading}></Loader>

            <View style={{
                alignItems: 'center',
                justifyContent: 'center',
                flex: 1,
            }}>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    marginTop: RFValue(80, STANDARD_SCREEN_HEIGHT),
                }}>
                    <Text style={{
                        color: 'green',
                        paddingVertical: 10,
                        fontSize: 35,
                        fontWeight: 'bold'
                    }}>
                        Buy
                    </Text>
                    <Text style={{
                        color: 'orange',
                        paddingVertical: 10,
                        fontSize: 35,
                        fontWeight: 'bold'
                    }}>
                        Exp
                    </Text>
                </View>

                <View style={{
                    marginTop: RFValue(25, STANDARD_SCREEN_HEIGHT),
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                    <Text style={{
                        color: '#41bab0',
                        fontSize: 24,
                        fontWeight: 'bold'
                    }}>
                        Hello there.
                    </Text>
                    <Text style={{
                        color: '#41bab0',
                        fontSize: 24,
                        fontWeight: 'bold'
                    }}>
                        Welcome back
                    </Text>
                </View>

                <View style={{
                    width: widthPercentageToDP('80%'),
                    height: RFValue(45, STANDARD_SCREEN_HEIGHT),
                    flexDirection: 'row',
                    marginTop: RFValue(50, STANDARD_SCREEN_HEIGHT),
                    marginBottom: RFValue(20, STANDARD_SCREEN_HEIGHT),
                    backgroundColor: '#EFF1F3',
                    borderTopLeftRadius: RFValue(25, STANDARD_SCREEN_HEIGHT),
                    borderBottomLeftRadius: RFValue(25, STANDARD_SCREEN_HEIGHT),
                    borderBottomRightRadius: RFValue(23, STANDARD_SCREEN_HEIGHT),
                    borderTopRightRadius: RFValue(23, STANDARD_SCREEN_HEIGHT),
                }}
                >
                    <TouchableOpacity
                        style={{
                            width: widthPercentageToDP('40%'),
                            backgroundColor: logins ? '#41bab0' : '#EFF1F3',
                            justifyContent: 'center',
                            alignItems: 'center',
                            paddingHorizontal: RFValue(10, STANDARD_SCREEN_HEIGHT),
                            borderTopLeftRadius: RFValue(25, STANDARD_SCREEN_HEIGHT),
                            borderBottomLeftRadius: RFValue(25, STANDARD_SCREEN_HEIGHT),
                            borderTopRightRadius: logins
                                ? RFValue(25, STANDARD_SCREEN_HEIGHT)
                                : 0,
                            borderBottomRightRadius: logins
                                ? RFValue(25, STANDARD_SCREEN_HEIGHT)
                                : 0,
                        }}
                        onPress={() => {
                            setLogins(true)
                        }}>
                        <Text style={{
                            fontSize: RFValue(SMALL_FONT_SIZE, STANDARD_SCREEN_HEIGHT),
                            color: logins ? WHITE_COLOR : BLACK_COLOR,
                            fontFamily: FONT_BOLD,
                            fontWeight: '900',

                        }}>Login</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{
                            //flex:1,
                            width: widthPercentageToDP('40%'),
                            backgroundColor: !logins ? '#41bab0' : '#EFF1F3',
                            justifyContent: 'center',
                            alignItems: 'center',
                            paddingHorizontal: RFValue(10, STANDARD_SCREEN_HEIGHT),
                            borderTopLeftRadius: RFValue(25, STANDARD_SCREEN_HEIGHT),
                            borderBottomLeftRadius: RFValue(25, STANDARD_SCREEN_HEIGHT),
                            borderTopRightRadius: logins
                                ? RFValue(25, STANDARD_SCREEN_HEIGHT)
                                : RFValue(25, STANDARD_SCREEN_HEIGHT),
                            borderBottomRightRadius: logins
                                ? RFValue(25, STANDARD_SCREEN_HEIGHT)
                                : RFValue(25, STANDARD_SCREEN_HEIGHT),
                        }}
                        onPress={() => {
                            setLogins(false)
                        }}>
                        <Text
                            style={{
                                fontSize: RFValue(SMALL_FONT_SIZE, STANDARD_SCREEN_HEIGHT),
                                color: !logins ? WHITE_COLOR : BLACK_COLOR,
                                fontFamily: FONT_BOLD,
                                fontWeight: '900',

                            }}>SignUp</Text>
                    </TouchableOpacity>
                </View>
                {
                    logins == true ? (
                        <View style={{
                            alignSelf: 'center',
                            width: '90%',
                        }}>
                            <Formik
                                initialValues={SignInFormInitialValues(props)}
                                validationSchema={SignInFormValidator(props)}
                                onSubmit={(values, { resetForm }) => {
                                    LoginFunction(values, resetForm);
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
                                        <View style={{
                                            marginLeft: Metrics.rfv(25),
                                            marginTop: 5,
                                        }}>
                                            <Text style={{
                                                color: '#3d4b69',
                                                fontSize: 14,
                                                fontWeight: 'bold'
                                            }}>Phone Number or Email or userName</Text>
                                        </View>
                                        <View style={styles.SectionStyle}>
                                            <TextInput
                                                placeholder="example@gmail.com"
                                                style={styles.inputStyle}
                                                onChangeText={(text) => {
                                                    // if(text != '' && text != 'example@gmail.com'){
                                                        setFieldValue('email', text)
                                                    // }  
                                                }}
                                                value={values.email}
                                                placeholderTextColor="gray"
                                                keyboardType="email-address"
                                                
                                            />
                                        </View>
                                        {(errors.email && touched.email) &&
                                            <Text style={{ fontSize: 10, color: 'red', marginLeft: 20 }}> * {errors.email}</Text>
                                        }
                                        <View style={{
                                            marginLeft: Metrics.rfv(25),
                                            marginTop: 5,
                                        }}>
                                            <Text style={{
                                                color: '#3d4b69',
                                                fontSize: 14,
                                                fontWeight: 'bold'
                                            }}>Password</Text>
                                        </View>
                                        <View>
                                            <AppTextFieldPassword
                                                placeHolder={'......'}
                                                value={values.password}
                                                changeText={(text) => {
                                                    setFieldValue('password', text)
                                                }}
                                                secureTextEntry={true}
                                            />
                                        </View>
                                        {(errors.password && touched.password) &&
                                            <Text style={{ fontSize: 10, color: 'red', marginLeft: 20 }}> * {errors.password}</Text>
                                        }
                                        <View>
                                            <TouchableOpacity>
                                                <Text style={{
                                                    color: '#3d4b69',
                                                    fontSize: 14,
                                                    fontWeight: 'bold',
                                                    marginTop: 5,
                                                    alignSelf: 'center',
                                                    marginLeft: Metrics.rfv(180),
                                                }}>Forgot Password ?</Text>
                                            </TouchableOpacity>
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
                                                // navigation.navigate('MainRoute')
                                                handleSubmit()
                                            }}>
                                            <Text style={styles.buttonTextStyle}>Login</Text>
                                        </TouchableOpacity>
                                    </>
                                )}
                            </Formik>
                        </View>
                    ) : (
                        <View
                            style={{
                                alignSelf: 'center',
                                width: '90%',
                            }}>
                            <Formik
                                initialValues={SignUpFormInitialValues(props)}
                                validationSchema={SignUpFormValidator(props)}
                                onSubmit={(values, { resetForm }) => {
                                    SignUpFunction(values, resetForm);
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
                                        <View style={{
                                            marginLeft: Metrics.rfv(25),
                                            marginTop: 5,
                                        }}>
                                            <Text style={{
                                                color: '#3d4b69',
                                                fontSize: 14,
                                                fontWeight: 'bold'
                                            }}>Phone Number or Email</Text>
                                        </View>
                                        <View style={styles.SectionStyle}>
                                            <TextInput
                                                placeholder="example@gmail.com"
                                                style={styles.inputStyle}
                                                onChangeText={(text) => {
                                                    setFieldValue('signUpemail', text)
                                                }}
                                                value={values.signUpemail}
                                                placeholderTextColor="gray"
                                                keyboardType="email-address"
                                                touched={touched.signUpemail}
                                                error={errors.signUpemail}
                                            />
                                        </View>
                                        <View style={{
                                            marginLeft: Metrics.rfv(25),
                                            marginTop: 5,
                                        }}>
                                            <Text style={{
                                                color: '#3d4b69',
                                                fontSize: 14,
                                                fontWeight: 'bold'
                                            }}>Password</Text>
                                        </View>
                                        <View>
                                            <AppTextFieldPassword
                                                placeHolder={'......'}
                                                value={values.signUppassword}
                                                changeText={(text) => {
                                                    setFieldValue('signUppassword', text)
                                                }}
                                                secureTextEntry={true}
                                                touched={touched.signUppassword}
                                                error={errors.signUppassword}
                                            />
                                        </View>
                                        <View style={{
                                            marginLeft: Metrics.rfv(25),
                                            marginTop: 5,
                                        }}>
                                            <Text style={{
                                                color: '#3d4b69',
                                                fontSize: 14,
                                                fontWeight: 'bold'
                                            }}>Confirm Password</Text>
                                        </View>
                                        <View>
                                            <AppTextFieldPassword
                                                placeHolder={'........'}
                                                value={values.signUpconfpassword}
                                                changeText={(text) => {
                                                    setFieldValue('signUpconfpassword', text)
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
                                    </>)}
                            </Formik>
                        </View>
                    )
                }
            </View>
        </ScrollView >
    );
}));
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
export default Login;
