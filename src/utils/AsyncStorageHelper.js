import AsyncStorage  from '@react-native-async-storage/async-storage'


const LANGUAGE_PREF = "language_pref";
const USER_ID = "userId";
const LOGIN_DATA = "loginData";
const TRAINER_LOGIN = "trainerLogin";
const JWT_TOKEN = 'jwtToken';
const MOBILE_NUMBER = 'mobile_number'
const USER_TYPE = 'userType'

export const saveLanguagePref = async (language) => {
    await AsyncStorage.setItem(LANGUAGE_PREF, language);
}

export const getLanguagePref = async () => {
    const language = await AsyncStorage.getItem(LANGUAGE_PREF);
    if(language){
        return language;
    }else {
        return "en";
    }
}

export const saveUserProfileInfo = async (userInfo) => {
    await AsyncStorage.setItem(LOGIN_DATA, JSON.stringify(userInfo));
}

export const getUserProfileInfo = async () => {
    const userProfileInfo = await AsyncStorage.getItem(LOGIN_DATA);
    return JSON.parse(userProfileInfo);
}

export const saveUserType= async (result) => {
    await AsyncStorage.setItem(USER_TYPE, JSON.stringify(result));
}
export const getUserType = async () => {
    const trainerInfo = await AsyncStorage.getItem(USER_TYPE);
    return JSON.parse(trainerInfo);
}

export const saveUserId = async (userId) => {
    await AsyncStorage.setItem(USER_ID, userId ? `${userId}` : '')
}
export const getUserId = async () => {
    return await AsyncStorage.getItem(USER_ID);
}
export const getJwtToken = async () => {
    return await AsyncStorage.getItem(JWT_TOKEN);
  };
  
  export const setJwtToken = async jwtToken => {
    await AsyncStorage.setItem(JWT_TOKEN, jwtToken);
  };
  export const saveMobileNumber = async (mobile_number) => {
    await AsyncStorage.setItem(MOBILE_NUMBER, mobile_number)
}
export const getMobileNumber = async () => {
    return await AsyncStorage.getItem(MOBILE_NUMBER);
}