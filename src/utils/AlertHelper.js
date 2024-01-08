
import React, { Component } from 'react'
import { Alert } from 'react-native'

export const APP_NAME = "Sehalo"

export const AppOkAlert = (msg, onOkCallback, btnText = 'OK', title = APP_NAME) => {
    setTimeout(() => {
        Alert.alert(
            title,
            `${msg}`,
            [
                {
                    text: btnText,
                    onPress: () => onOkCallback()
                },
            ],
            { cancelable: false },
        );
    }, 300)
}



export const AppAlertLoginError = (msg, title = APP_NAME) => {
    // ,
    // ,
    setTimeout(() => {
        Alert.alert(
            title,
            msg,
            [
                // {text: 'Ask me later', onPress: () => },
                // {
                //     text: 'Cancel',
                //     
                //     style: 'cancel',
                // },
                {
                    text: 'OK'
                },
            ],
            { cancelable: false },
        );
    }, 300)
    
}

export const AppOkCancelAlert = (msg, onOkCallback, onCancelCallback,title = APP_NAME) => {
    setTimeout(() => {
        Alert.alert(
            title,
            msg,
            [
                {
                    text: 'Cancel',
                    onPress: () => onCancelCallback(),
                    //style: 'cancel',
                },
                {
                    text: 'OK', onPress: () => onOkCallback()
                },
            ],
            { cancelable: false },
        ); 
    }, 300)
    
}

export const AppYesNoAlert = (msg, onOkCallback, onCancelCallback,title = APP_NAME) => {
    setTimeout(() => {
        Alert.alert(
            title,
            msg,
            [
                {
                    text: 'NO',
                    onPress: () => onCancelCallback(),
                    //style: 'cancel',
                },
                {
                    text: 'YES', onPress: () => onOkCallback()
                },
            ],
            { cancelable: false },
        ); 
    }, 300)
    
}

export const AppBackAlert = (msg, navigation, title = APP_NAME) => {
    setTimeout(() => {
        Alert.alert(
            title,
            msg,
            [
                // {text: 'Ask me later', onPress: () => },
                {
                    text: 'Cancel',
                    
                    style: 'cancel',
                },
                {
                    text: 'OK', onPress: () => { navigation.goBack() }
                },
            ],
            { cancelable: false },
        );
    }, 300)
    
}

export const isObjectEquivalent = (a, b) => {
    // Create arrays of property names
    var aProps = Object.getOwnPropertyNames(a);
    var bProps = Object.getOwnPropertyNames(b);
    
    

    // If number of properties is different,
    // objects are not equivalent
    if (aProps.length != bProps.length) {
        return false;
    }

    for (var i = 0; i < aProps.length; i++) {
        var propName = aProps[i];
        

        // If values of same property are not equal,
        // objects are not equivalent
        
        if (a[propName] !== b[propName]) {
            return false;
        }
    }

    // If we made it this far, objects
    // are considered equivalent
    return true;
}