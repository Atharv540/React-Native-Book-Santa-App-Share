import * as React from 'react';
import {StyleSheet, View, Text, TextInput, TouchableOpacity} from 'react-native';
import firebase from 'firebase';
import db from '../config'

export default class RequestScreen extends React.Component{
    constructor(){
        super();
        this.state={
            bookName: '',
            requestReason: '',
            user_id: firebase.auth().currentUser.email,
        }
    }
    addRequest = async (bookName, requestReason) => {
        var request_id = Math.random().toString(36);
        db.collection('requested_users').add({
            bookName: bookName,
            requestReason: requestReason,
            user_id: this.state.user_id,
            request_id: request_id,
        })
    }
    render(){
        return(
            <View>
                <TextInput 
                    style={styles.input}
                    placeholder="Enter Book Name..."
                    onChangeText={(text)=>{
                        this.setState({
                            bookName: text,
                        })
                    }}
                />
                <TextInput 
                    style={styles.input}
                    placeholder="Enter Reason for request..."
                    onChangeText={(text)=>{
                        this.setState({
                            requestReason: text,
                        })
                    }}
                />
                <TouchableOpacity style={styles.requestButton}
                    onPress={()=>{
                        this.addRequest(this.state.bookName, this.state.requestReason);
                    }}
                >
                    <Text>REQUEST</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    input: {
        borderWidth: 1,
        borderRadius: 15,
        width: 100,
        height: 30,
        fontFamily: 'Sans Serif',
        color: 'grey',
        fontWeight: 'bold',
    },
    requestButton: {
        width: 75,
        height: 50,
        borderRadius: 5,
        backgroundColor: 'cadetblue',
    },
})