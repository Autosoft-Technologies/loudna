import React, {useState} from 'react';
import {
    View,
    TouchableOpacity,
    Dimensions,
    TextInput,
    Platform,
    StyleSheet,
    ScrollView,
    StatusBar,
    ActivityIndicator
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient/index';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import {
    Text,
    Icon,
    Button,
    Picker,
    FormDatePicker,
    FormInput,
    FormTextArea,
    FormPicker,
    Card,
    ListItem
} from "@99xt/first-born";


const SignInScreen = ({navigation}) => {

    const [data, setData] = useState({
        password: '',
        confirm_password: '',
        check_textInputChange: false,
        secureTextEntry: true,
        confirm_secureTextEntry: true,
    });

    const [username, setUsername] = useState('');
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passVerif, setPassVarif] = useState('');
    // const [phone, setPhone] = useState('');
    const [location, setLocation] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const textInputChange = (val) => {
        if (val.length !== 0) {
            setData({
                ...data,
                username: val,
                check_textInputChange: true
            });
        } else {
            setData({
                ...data,
                username: val,
                check_textInputChange: false
            });
        }
    };

    const handlePasswordChange = (val) => {
        setData({
            ...data,
            password: val
        });
    };

    const handleConfirmPasswordChange = (val) => {
        setData({
            ...data,
            confirm_password: val
        });
    };

    const updateSecureTextEntry = () => {
        setData({
            ...data,
            secureTextEntry: !data.secureTextEntry
        });
    };

    const updateConfirmSecureTextEntry = () => {
        setData({
            ...data,
            confirm_secureTextEntry: !data.confirm_secureTextEntry
        });
    };

    const onRegister = () => {
        if (password !== passVerif) {
            alert('Password should match');
            return;
        }

        if (username === '' || firstname === '' || lastname === '' || email === '' || password === '' || location === '') {
            alert('Fill all fields');
            return;
        }

        setIsLoading(true)

        const formdata = new FormData();
        formdata.append("username", username);
        formdata.append("first_name", firstname);
        formdata.append("last_name", lastname);
        formdata.append("email", email);
        formdata.append("password", password);
        formdata.append("phone_number", username);
        formdata.append("location", location);

        const requestOptions = {
            method: 'POST',
            body: formdata,
            redirect: 'follow'
        };

        fetch("http://mc1.cryptosavannah.com/api/v1/accounts/users", requestOptions)
            .then(response => response.json())  // promise
            .then(json => {
                console.log(json);
                setIsLoading(true)
                navigation.goBack();
            }).catch(function (err) {
            alert('Error occured');
            // alert(err);
            console.log(err);
            setIsLoading(false)
        });
    }

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor='#258e9d' barStyle="light-content"/>
            <View style={styles.header}>
                <Text style={styles.text_header}>Register!</Text>
            </View>
            <Animatable.View
                animation="fadeInUpBig"
                style={styles.footer}
            >
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={styles.action}>
                        <FormInput label="Phone number" keyboardType="phone-pad" placeholder="Phone Number" onChangeText={(val) => setUsername(val)}/>
                    </View>

                    <View style={styles.action}>
                        <FormInput label="First name" placeholder="First name"
                                   onChangeText={(val) => setFirstname(val)}/>
                    </View>

                    <View style={styles.action}>
                        <FormInput label="Last name" placeholder="Last name" onChangeText={(val) => setLastname(val)}/>
                    </View>

                    <View style={styles.action}>
                        <FormInput label="Email" placeholder="Email" onChangeText={(val) => setEmail(val)}/>
                    </View>

                    <View style={styles.action}>
                        <FormInput label="Password" placeholder="Password" secureTextEntry={true}
                                   onChangeText={(val) => setPassword(val)}/>
                    </View>

                    <View style={styles.action}>
                        <FormInput label="Confirm password" placeholder="Password" secureTextEntry={true}
                                   onChangeText={(val) => setPassVarif(val)}/>
                    </View>

                    {/*<View style={styles.action}>*/}
                    {/*    <FormInput label="Phone" placeholder="Phone" onChangeText={(val) => setPhone(val)}/>*/}
                    {/*</View>*/}

                    <View style={styles.action}>
                        <FormInput label="Location" placeholder="Address" onChangeText={(val) => setLocation(val)}/>
                    </View>

                    <View style={styles.button}>
                        {!isLoading ?
                            <Button
                                rounded
                                block
                                style={styles.button}
                                color="#fd4b33"
                                onPress={() => onRegister()}
                            >
                                <Icon name="checkmark"/>
                                <Text>{'Sign up'}</Text>
                            </Button>
                            :
                            <TouchableOpacity
                                style={[styles.buttonContainer,
                                    styles.googleButton]}
                            >
                                <ActivityIndicator animating={isLoading} color="#fff"/>
                            </TouchableOpacity>
                        }


                        <Button
                            rounded
                            outline
                            block
                            transparent
                            onPress={() => navigation.goBack()}
                        >
                            <Text>{'Sign in'}</Text>
                        </Button>

                    </View>

                </ScrollView>
            </Animatable.View>
        </View>
    );
};

export default SignInScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#258e9d'
    },
    header: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 50
    },
    footer: {
        flex: Platform.OS === 'ios' ? 3 : 5,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 30
    },
    text_header: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 30
    },
    text_footer: {
        color: '#05375a',
        fontSize: 18
    },
    action: {
        flexDirection: 'row',
        // marginTop: 10,
        // borderBottomWidth: 1,
        // borderBottomColor: '#f2f2f2',
        // paddingBottom: 5
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: '#05375a',
    },
    button: {
        alignItems: 'center',
        marginTop: 10
    },
    signIn: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    textSign: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    textPrivate: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        // marginTop: 20
    },
    color_textPrivate: {
        color: 'grey'
    },
    buttonContainer: {
        height: 45,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        width: 250,
        borderRadius: 30,
    },
    googleButton: {
        backgroundColor: '#fd4b33',
    },
});
