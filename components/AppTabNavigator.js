import * as React from 'react';
import {StyleSheet, View, Text, TextInput, TouchableOpacity} from 'react-native';
import firebase from 'firebase';
import db from '../config';
import {createBottomTabNavigator} from 'react-navigation-tabs'
import RequestScreen from '../screens/RequestScreen';
import DonateScreen from '../screens/DonateScreen';

export const AppTabNavigator = createBottomTabNavigator({
    DonateBooks: {screen: DonateScreen},
    BookRequest: {screen: RequestScreen},
})