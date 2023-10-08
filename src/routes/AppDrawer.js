import 'react-native-gesture-handler';
import * as React from 'react';
import { createDrawerNavigator } from "@react-navigation/drawer";
import { BOTTOM_TABS, DASH_BOARD } from './RouteConst';
import { DashBoard } from '../Screens';
import DrawerContent from './DrawerContent';
// import BottomTabs from './BottomTabs';
const Drawer = createDrawerNavigator();

export const AppDrawer = (props) => {

    console.log('AppDrawer tab')
    return (
        <Drawer.Navigator
            drawerStyle={{
                //backgroundColor: THEME_COLOR
                width: '60%'
            }}
            screenOptions={{
                headerShown: false,
            }}
            initialRouteName={DASH_BOARD}
            drawerContent={() => <DrawerContent {...props} />}>
            <Drawer.Screen name={"DashBoard"}
                component={DashBoard} />
        </Drawer.Navigator>
    )
}

export default AppDrawer;