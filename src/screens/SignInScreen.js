import React, {useState} from 'react';
import {
    View,
    TouchableOpacity,
    TextInput,
    Platform,
    StyleSheet,
    StatusBar,
    Alert,
    ScrollView, ActivityIndicator,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {useTheme} from 'react-native-paper';
import {AuthContext} from '../components/context';
import {FormInput, Button, Icon, Text} from "@99xt/first-born";
import AsyncStorage from '@react-native-community/async-storage';

const SignInScreen = ({navigation}) => {

    const [data, setData] = React.useState({
        username: '',
        password: '',
        check_textInputChange: false,
        secureTextEntry: true,
        isValidUser: true,
        isValidPassword: true,
    });

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const {colors} = useTheme();

    const {signIn} = React.useContext(AuthContext);

    const loginHandle = (userName, password) => {
        setIsLoading(true)
        const formdata = new FormData();
        formdata.append("username", userName);
        formdata.append("password", password);
        formdata.append("type", "0");

        const requestOptions = {
            method: 'POST',
            body: formdata,
            redirect: 'follow'
        };

        fetch("http://mc1.cryptosavannah.com/api/v1/accounts/authenticate/", requestOptions)
            .then(response => response.json())
            .then(result => {
                if (result.error) {
                    Alert.alert('Invalid User!', result.error, [
                        {text: 'Okay'}
                    ]);
                    setIsLoading(false)
                }else {
                    AsyncStorage.setItem('user', JSON.stringify(result))
                        .then(() => {
                            // this.setState({ userId: user._id, showLoginForm: true });
                        });
                    signIn(result);

                }
            })
            .catch(error => {
                console.log('error', error)
                setIsLoading(false)
            });

        if (username.length === 0 || password.length === 0) {
            Alert.alert('Wrong Input!', 'Username or password field cannot be empty.', [
                {text: 'Okay'}
            ]);

        }
    };

    const checkInputValidity = (text) => {
        const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        return regex.test(text);
    };

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor='#258e9d' barStyle="light-content"/>
            <View style={styles.header}>
                <Text style={styles.text_header}>Sign in!</Text>
            </View>
            <Animatable.View
                animation="fadeInUpBig"
                style={[styles.footer, {
                    backgroundColor: colors.background
                }]}
            >
                <ScrollView>

                    <View style={styles.action}>
                        <FormInput
                            label="Phone"
                            placeholder="Phone number"
                            keyboardType="phone-pad"
                            onChangeText={(val) => setUsername(val)}
                        />
                    </View>
                    {data.isValidUser ? null :
                        <Animatable.View animation="fadeInLeft" duration={500}>
                            <Text style={styles.errorMsg}>Username must be 4 characters long.</Text>
                        </Animatable.View>
                    }
                    <View style={styles.action}>
                        <FormInput
                            label="Password"
                            placeholder="*******"
                            secureTextEntry={data.secureTextEntry}
                            onChangeText={(val) => setPassword(val)}/>
                    </View>
                    {data.isValidPassword ? null :
                        <Animatable.View animation="fadeInLeft" duration={500}>
                            <Text style={styles.errorMsg}>Password must be 8 characters long.</Text>
                        </Animatable.View>
                    }

                    <TouchableOpacity>
                        <Text style={{color: '#fd4b33', marginTop: 15}}>Forgot password?</Text>
                    </TouchableOpacity>

                    <View style={styles.button}>
                        {!isLoading ?
                            <Button
                                rounded
                                block
                                style={styles.button}
                                color="#fd4b33"
                                onPress={() => {
                                    loginHandle(username, password)
                                }}
                            >
                                {/*<Icon name="checkmark"/>*/}
                                <Text>{'Sign in'}</Text>
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
                            onPress={() => navigation.navigate('SignUpScreen')}
                        >
                            <Text>{'Sign up'}</Text>
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
        flex: 3,
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
    actionError: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#FF0000',
        paddingBottom: 5
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: '#05375a',
    },
    errorMsg: {
        color: '#FF0000',
        // fontSize: 14,
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
