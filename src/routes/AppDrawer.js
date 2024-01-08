import 'react-native-gesture-handler';
import {Dimensions} from 'react-native'
import * as React from 'react';
import { createDrawerNavigator } from "@react-navigation/drawer";
import { BOTTOM_TABS, DASH_BOARD } from './RouteConst';
import { DashBoard } from '../Screens';
import DrawerContent from './DrawerContent';
import EditProfile from '../PublicScreens/EditProfile';
import { EDIT_PROFILE } from './PublicRouteConts';
import PublicProfile from '../PublicScreens/PublicProfile';
import Support from '../PublicScreens/Support';
import About from '../PublicScreens/About';
// import BottomTabs from './BottomTabs';
const Drawer = createDrawerNavigator();

export const AppDrawer = (props) => {

    
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
            // initialRouteName={EDIT_PROFILE}
            
            drawerContent={() => <DrawerContent {...props} />}>
            <Drawer.Screen name={"EditProfile"} component={EditProfile} />
            <Drawer.Screen name={"Support"} component={Support} />
            <Drawer.Screen name={"About"} component={About} />
        </Drawer.Navigator>
    )
}

export default AppDrawer;