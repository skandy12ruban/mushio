import React, { Component } from 'react';
import {
    View, Text, StyleSheet, TextInput,
} from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import {
    STANDARD_SCREEN_HEIGHT, WHITE_COLOR, SMALL_FONT_SIZE, LOGIN_BTN_COLOR,
    LOGIN_BTN_COLOR_LIGHT, FONT_REGULAR, NORMAL_FONT_SIZE, DARD_GRAY_1, BLACK_COLOR
} from '../utils/AppConst';
import RNPickerSelect from 'react-native-picker-select';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Platform } from 'react-native';


const AppDropDown = (props) => {
    let { value, changeText, containerStyle, textFiledStyle, viewStyle,
        multiline, inputStyle, keyboardType, maxLength, inputContainerStyle, label,
        items, placeholder, error, disabled
    } = props;
    items = items.map((item, index) => {
        return {
            ...item,
            key: index + 1
        }
    })
    return (<>
        <View style={[{
            padding: RFValue(20, STANDARD_SCREEN_HEIGHT),
            paddingVertical: 10,
        }, { ...containerStyle },]}>
            {label && <Text style={{
                fontSize: RFValue(NORMAL_FONT_SIZE, STANDARD_SCREEN_HEIGHT),
                fontFamily: FONT_REGULAR,
                color: BLACK_COLOR,
                fontWeight:'bold',
                marginVertical: RFValue(4, STANDARD_SCREEN_HEIGHT)
            }}>{label}</Text>}

            <View style={[{ ...styles.viewStyle }, { ...viewStyle }]}>
                <RNPickerSelect
                    onValueChange={(value) => changeText(value)}
                    items={items}
                    style={{
                        inputIOS: {
                            fontSize: RFValue(NORMAL_FONT_SIZE, STANDARD_SCREEN_HEIGHT),
                            color: BLACK_COLOR,
                            margin: RFValue(10, STANDARD_SCREEN_HEIGHT),
                            alignItems: 'center'

                        },
                        inputAndroid: {
                            fontSize: RFValue(NORMAL_FONT_SIZE, STANDARD_SCREEN_HEIGHT),
                            color: BLACK_COLOR,
                            alignItems: 'center',
                            justifyContent: 'center'

                        },
                    }}
                    Icon={() => <Icon
                        //  name="sort-down"
                     color={DARD_GRAY_1} size={RFValue(20, STANDARD_SCREEN_HEIGHT)}
                        style={{
                            marginTop: Platform.OS == "android" ? RFValue(10, STANDARD_SCREEN_HEIGHT) : 0
                        }}
                    />}
                    //placeholder={placeholder}
                    placeholder={{ label: placeholder, value: placeholder }}
                    value={value}
                    disabled={disabled ? disabled : false}
                />
            </View>
        </View>
        {error && <Text style={{
            marginLeft: RFValue(24, STANDARD_SCREEN_HEIGHT)/**ICON Size*/,
            fontSize: RFValue(SMALL_FONT_SIZE, STANDARD_SCREEN_HEIGHT),
            color: 'red',
            alignSelf: 'flex-start',
            marginVertical: RFValue(5, STANDARD_SCREEN_HEIGHT)
        }}>* {error}</Text>}

    </>
    );
}

// 
const styles = StyleSheet.create({
    textFiledStyle: {
        height: '100%',
        //width: '100%',
        //padding: 10,
        paddingLeft: RFValue(20, STANDARD_SCREEN_HEIGHT),
        paddingRight: RFValue(10, STANDARD_SCREEN_HEIGHT),
    },
    viewStyle: {
        height: RFValue(44, STANDARD_SCREEN_HEIGHT),
        // width: '100%',
        borderRadius: RFValue(22, STANDARD_SCREEN_HEIGHT),
        backgroundColor: WHITE_COLOR,
        shadowColor: LOGIN_BTN_COLOR,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 1.84,
        elevation: 5,
    },
});


export default AppDropDown;
