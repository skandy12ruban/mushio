import 'react-native-gesture-handler';
import {Dimensions} from 'react-native'
import * as React from 'react';
import { createDrawerNavigator } from "@react-navigation/drawer";
import { BOTTOM_TABS, DASH_BOARD } from './RouteConst';
import { DashBoard, ProfileDetails } from '../Screens';
import DrawerContent from './DrawerContent';
import EditProfile from '../PublicScreens/EditProfile';
import { EDIT_PROFILE } from './PublicRouteConts';
import PublicProfile from '../PublicScreens/PublicProfile';
import Support from '../PublicScreens/Support';
import About from '../PublicScreens/About';
import PriavteDrawerContent from './PrivateDrawerContent';
import Help from '../Screens/Help';
import PrivateAbout from '../Screens/PrivateAbout';
// import BottomTabs from './BottomTabs';
const Drawer = createDrawerNavigator();

export const PrivateAppDrawer = (props) => {

    
    return (
        <Drawer.Navigator
            drawerStyle={{
                //backgroundColor: THEME_COLOR
                // width: '200',
                width: '60%',
            }}
            screenOptions={{
                headerShown: false,drawerPosition:"right",  drawerStyle:{  width: '60%',}
            }}
            initialRouteName={"EditProfile"}
            
            drawerContent={() => <PriavteDrawerContent {...props} />}>
            <Drawer.Screen name={"EditProfile"} component={ProfileDetails} />
            <Drawer.Screen name={"Help"} component={Help} />
            <Drawer.Screen name={"PrivateAbout"} component={PrivateAbout} />
        </Drawer.Navigator>
    )
}

export default PrivateAppDrawer;