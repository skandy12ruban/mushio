

// React Navigate Drawer with Bottom Tab
// https://aboutreact.com/bottom-tab-view-inside-navigation-drawer/

import React, {useState} from 'react';
import { TouchableOpacity } from 'react-native';
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  Image,
  Keyboard,
} from 'react-native';
// import SearchIcon from '../../images/search.png';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Feather from 'react-native-vector-icons/Feather';

const SearchView = props => {
  const {
    textHeader,
    searchPlaceholder = 'Search Anything..',
    onPress = () => {},
  } = props;
  const [searchText, setSearchText] = useState('');
  const searchClicked = () => {
    onPress(searchText);
    Keyboard.dismiss();
  };
  return (
    <>
      <View style={ss.container}>
        <View style={ss.searchContainer}>
        <Pressable onPress={searchClicked}>
            {/* <Image source={SearchIcon} style={ss.searchIcon} /> */}
            <EvilIcons name='search' size={20}/>
          </Pressable>
          <TextInput
            style={ss.textInputContainer}
            placeholder={searchPlaceholder}
            value={searchText}
            numberOfLines={1}
            onChangeText={text => setSearchText(text)}
          /> 
        
        </View>
        <View style={ss.searchLabelsContainer}>
          <Text style={ss.textStyle}>Search By Category</Text>
          <Text style={ss.textStyle}>Search Followers</Text>
          <Text style={ss.textStyle}>Search Power Users</Text>
        </View>
      </View>
    </>
  );
};

const ss = StyleSheet.create({
  container: {
    // backgroundColor: 'white',
    // height: 50,
    // alignItems: 'center',
    padding: 2,
  },
  searchLabelsContainer: {
    flexDirection: 'row',
    flex: 1,
    width: '100%',
    height: 18,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  searchContainer: {
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
    backgroundColor: 'lightgrey',
    borderRadius: 5,
    height: 48,
    width: '100%',
    alignSelf:'center'
  },
  textInputContainer: {
    flex: 1,
    height: 48,
  },
  textStyle: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    lineHeight: 18,
    color: 'white',
  },

  searchIcon: {
    height: 20,
    width: 20,
  },
});
export default SearchView;
