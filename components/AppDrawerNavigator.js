import React from 'react';
import {createDrawerNavigator} from 'react-navigation-drawer';
import {AppTabNavigator} from './AppTabNavigator';
import CustomSideBarMenu from './CustomSideBarMenu';

export const AppDrawerNavigator = createDrawerNavigator({
    HOME: {screen: AppTabNavigator},
},
{
    ContentComponent: CustomSideBarMenu
},
{
    initialRouteName: 'HOME'
}
)