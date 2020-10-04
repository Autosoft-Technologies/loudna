import React, {useState, useEffect} from 'react';
import {
    View,
    TouchableOpacity,
    Dimensions,
    TextInput,
    Platform,
    StyleSheet,
    ScrollView,
    StatusBar,
    ActivityIndicator, Alert
} from 'react-native';
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
import Transaction from "../../components/Transaction";
import AsyncStorage from "@react-native-community/async-storage";


const AddNewCard = ({navigation}) => {

    const [programId, setProgramId] = useState('');
    const [userId, setUserId] = useState('');
    const [userToken, setUserToken] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        AsyncStorage.getItem('user')
            .then(user => {
                if (user === null) {
                    this.setState({loading: false, showLoginForm: true});
                } else {
                    let usr = JSON.parse(user);

                    setUserId(usr.user_data.id)
                    setUserToken(usr.token_data.token)
                }
            })
            .catch(err => console.log(err));
    });

    const onSave = () => {

        if (programId === '') {
            alert('Id cant be empty');
            return;
        }

        setIsLoading(true)

        const formdata = new FormData();
        formdata.append("related_program", programId);
        formdata.append("related_user", userId);

        const requestOptions = {
            method: 'POST',
            headers: new Headers({
                'Authorization': 'Bearer ' + userToken,
                'Content-Type': 'multipart/form-data'
            }),
            body: formdata,
            redirect: 'follow'
        };

        fetch("http://mc1.cryptosavannah.com/api/v1/loyalty/programs/subscriptions", requestOptions)
            .then(response => response.json())  // promise
            .then(json => {
                console.log(json);
                if (json.status === 400) {
                    // navigation.navigate('AllCards')
                    alert(json.error);
                }else {
                    Alert.alert('Success', result.error, [
                        {text: 'You have joined the loyalty program'}
                    ]);
                }

                // json.data.status
                setIsLoading(false)
                // navigation.goBack();

            }).catch(function (err) {
            alert(err);

            setIsLoading(false)
        });
    }

    return (
        <View style={styles.container}>

            <View
                style={[styles.footer, {
                    backgroundColor: '#fff'
                }]}
            >
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={styles.action}>
                        <FormInput label="Program ID" placeholder="program ID"
                                   onChangeText={(val) => setProgramId(val)}/>
                    </View>

                    <View style={styles.button}>
                        {!isLoading ?
                            <Button
                                rounded
                                block
                                style={styles.button}
                                color="#bc9151"
                                onPress={() => onSave()}
                            >
                                <Icon name="checkmark"/>
                                <Text>{'Save'}</Text>
                            </Button>
                            :
                            <TouchableOpacity
                                style={[styles.buttonContainer,
                                    styles.googleButton]}
                            >
                                <ActivityIndicator animating={isLoading} color="#fff"/>
                            </TouchableOpacity>
                        }

                    </View>

                </ScrollView>
            </View>
        </View>
    );
};

export default AddNewCard;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#3a3838'
    },
    header: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingBottom: 50
    },
    footer: {
        flex: 1,
        padding: 10,
        backgroundColor: '#fff',
    },
    text_header: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 30
    },
    balanceTxt: {
        color: '#eec971',
        fontWeight: 'bold',
        // fontSize: 10
    },
    text_footer: {
        color: '#05375a',
        fontSize: 18
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5
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
        fontSize: 14,
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
        borderRadius: 10,
        backgroundColor: '#fff'
    },
    textSign: {
        fontSize: 18,
        fontWeight: 'bold'
    },

    btns: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 20,
        paddingRight: 20,
        marginTop: 10,
    },
    followButton: {
        marginTop: 5,
        height: 35,
        width: 100,
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 30,
        // backgroundColor: "white",
        borderWidth: 1,
        // borderColor: "#dcdcdc",
    },
    followButtonText: {
        // color: "#dcdcdc",
        fontSize: 12,
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
        backgroundColor: '#bc9151',
    },
});
