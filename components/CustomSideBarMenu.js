import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {DrawerItems} from 'react-navigation-drawer';

export default class CustomSideBarMenu extends React.Component{
    render(){
        return(
            <View style={styles.container}>
                <View style={styles.drawerItemContainer}>
                    <DrawerItems {...this.props}/>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
   container: {
       flex: 1,
       justifyContent: 'center',
       alignItems: 'center',
   }, 
   drawerItemContainer: {
       flex: 0.8,
   },
})