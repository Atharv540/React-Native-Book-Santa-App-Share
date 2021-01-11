import * as React from 'react';
import {Text, View, StyleSheet, TextInput, TouchableOpacity, Alert, Modal, ScrollView} from 'react-native';
import firebase from 'firebase';
import db from '../config';

export default class WelcomeScreen extends React.Component{
    constructor(){
        super();
        this.state={
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            address: '',
            contact: '',
            confirmPassword: '',
            isModalVisible: false,
        }
    }
    logUserIn = async (email, password) => {
        firebase.auth().signInWithEmailAndPassword(email, password).then(()=>{
            this.props.navigation.navigate('BookRequest')
        })
        .catch(function(err){
            return Alert.alert(err.message);
        })
    }
    signUserUp = async (email, password) => {
        firebase.auth().createUserWithEmailAndPassword(email, password).then(()=>{
            db.collection('users').add({
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                contact: this.state.contact,
                address: this.state.address,
                email: this.state.email,
            })
            return Alert.alert(`User ${email}, succesfully created!`);
        })
        .catch(function(err){
            return Alert.alert(err.message);
        })
    }
    showModal = () => {
        return (
            <Modal animationType = "fade" 
                   transparent = {true}
                   visible = {this.state.isModalVisible}>
            <View>
                <ScrollView style={styles.scrollView}>
                    <Text style={styles.registration}>Registration</Text>
                    <TextInput 
                        style={styles.modalInput}
                        placeholder="Enter First Name"
                        onChangeText={(text)=>{
                            this.setState({
                                firstName: text,
                            })
                        }}
                        maxLength={8}
                    />
                    <TextInput 
                        style={styles.modalInput}
                        placeholder="Enter Last Name"
                        onChangeText={(text)=>{
                            this.setState({
                                lastName: text,
                            })
                        }}
                        maxLength={16}
                    />
                    <TextInput 
                        style={styles.modalInput}
                        placeholder="Contact..."
                        onChangeText={(text)=>{
                            this.setState({
                                contact: text,
                            })
                        }}
                        maxLength={10}
                        keyboardType={"numeric"}
                    />
                    <TextInput 
                        style={styles.modalInput}
                        placeholder="Address..."
                        onChangeText={(text)=>{
                            this.setState({
                                address: text,
                            })
                        }}
                        multiline={true}
                    />
                    <TextInput 
                        style={styles.modalInput}
                        placeholder="Enter Email"
                        keyboardType={"email-address"}
                        onChangeText={(text)=>{
                            this.setState({
                                email: text,
                            })
                        }}
                        maxLength={14}
                    />
                    <TextInput 
                        style={styles.modalInput}
                        placeholder="Enter Password"
                        onChangeText={(text)=>{
                            this.setState({
                                password: text,
                            })
                        }}
                        secureTextEntry={true}
                    />
                    <TextInput 
                        style={styles.modalInput}
                        placeholder="Confirm Password"
                        onChangeText={(text)=>{
                            this.setState({
                                confirmPassword: text,
                            })
                        }}
                        secureTextEntry={true}
                    />
                    <TouchableOpacity style={styles.registerButton}
                        onPress={()=>{
                            if(this.state.confirmPassword === this.state.password){
                                this.signUserUp(this.state.email, this.state.password);
                            }
                            else{
                                Alert.alert('Passwords are different!');
                            }
                        }} 
                    >
                        <Text>Register</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.cancelButton}
                        onPress={()=>{
                            this.setState({
                                isModalVisible: false,
                            })
                        }}
                    >
                        <Text>Cancel</Text>
                    </TouchableOpacity>
                </ScrollView>
            </View>
            </Modal>
        )
    }
    render(){
        return(
            <View style={styles.container}>
                <View>
                {this.showModal()}
                </View>
                <TextInput 
                    placeholder='Enter Email'
                    style={styles.loginBox}
                    onChangeText={text=>{
                        this.setState({
                            email: text,
                        })
                    }}
                    keyboardType={"email-address"}
                    />
                <TextInput 
                    placeholder='Enter Password'
                    style={styles.loginBox}
                    onChangeText={text=>{
                        this.setState({
                            password: text,
                        })
                    }}
                    secureTextEntry={true}
                    />
                <TouchableOpacity
                    onPress={()=>{
                        this.logUserIn(this.state.email, this.state.password)
                    }}
                    style={styles.button}
                >
                    <Text>Log In</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={()=>{
                        this.setState({
                            isModalVisible: true,
                        })
                    }}
                    style={styles.button}
                >
                    <Text>Sign Up</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loginBox:{
        borderWidth: 2,
        width: 300,
        height: 50,
        marginBottom: 25,
        textAlign: 'center',
        alignSelf: 'center',
    },
    button:{
        marginBottom: 10,
        width: 100,
        height: 50,
        backgroundColor: 'orange',
        justifyContent: 'center',
        alignItems: 'center',
    },
    scrollView: {
        width: '100%',
    },
    registration: {
        fontWeight: 'bold',
        color: 'cadetblue',
    },
    modalInput: {
        borderWidth: 1,
        borderColor: 'cadetblue',
        color: 'cadetblue',
    },
    registerButton: {
        width: 100,
        height: 50,
        backgroundColor: 'cadetblue',
        color: 'white',
    },
    cancelButton: {
        width: 100,
        height: 50,
        backgroundColor: 'white',
        color: 'cadetblue',
    }
})