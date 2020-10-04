import React, {useEffect, useState, setState} from 'react';
import {
    View,
    StyleSheet,
    TouchableOpacity,
    Linking,
    ScrollView,
    ActivityIndicator,
    Alert, Platform
} from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {Button, FormInput, Icon, Text} from "@99xt/first-born";

const ScanNewCard = (props) => {
    const [userId, setUserId] = useState(props.route.params.userId);
    const [isScaning, setScaning] = useState(true);
    const [userToken, setUserToken] = useState(props.route.params.userToken);
    const [isLoading, setIsLoading] = useState(false);
    const [wallet, setWallet] = useState('');
    const [programId, setProgramId] = useState('');
    const [programName, setProgramName] = useState('');

    const onSuccess = (e) => {
        // console.log(e.data)
        setScaning(false)
        setProgramId(JSON.parse(e.data).id)
        setProgramName(JSON.parse(e.data).program_name)
        // const scannedata = e.data.id
        console.log(JSON.parse(e.data).program_name)
    }

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
                    Alert.alert(
                        "Failed",
                        json.error,
                        [
                            {
                                text: "Ok",
                                onPress: () => {
                                    // props.navigation.navigate('Home')
                                    props.navigation.reset({
                                        index: 0,
                                        routes: [{name: 'Home'}],
                                    });
                                },
                                style: "cancel"
                            },
                        ],
                        { cancelable: false }
                    );

                }else {

                    Alert.alert(
                        "Success",
                        'You have joined '+programName+' program',
                        [
                            {
                                text: "Ok",
                                onPress: () => {
                                    props.navigation.reset({
                                        index: 0,
                                        routes: [{name: 'Home'}],
                                    });
                                },
                                style: "cancel"
                            },
                        ],
                        { cancelable: false }
                    );
                }
                setIsLoading(false)
            }).catch(function (err) {
            alert(err);

            setIsLoading(false)
        });
    }

    if (isScaning){
        return (
            <View>
                <QRCodeScanner
                    onRead={onSuccess.bind(this)}
                    // bottomContent={
                    //     <TouchableOpacity
                    //         style={styles.buttonTouchable}
                    //         // onPress={setScaning(false)}
                    //     >
                    //         <Text style={styles.buttonText}>Cancel</Text>
                    //     </TouchableOpacity>
                    // }
                />
            </View>
        );
    }else {
        return (
            <View style={styles.container}>

                <View
                    style={[styles.footer, {
                        backgroundColor: '#fff'
                    }]}
                >
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <View style={styles.action}>
                            <FormInput label="Program"
                                       placeholder="program name"
                                       value={programName}
                                       onChangeText={(val) => setProgramId(val)}/>
                        </View>

                        <View style={styles.button}>
                            {!isLoading ?
                                <Button
                                    rounded
                                    block
                                    style={styles.startBtn}
                                    color="#bc9151"
                                    onPress={() => onSave()}
                                >
                                    <Icon name="checkmark"/>
                                    <Text>{'Join'}</Text>
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
        )
    }

};

export default ScanNewCard;

const styles = StyleSheet.create({
    centerText: {
        flex: 1,
        fontSize: 18,
        padding: 32,
        color: '#777',
    },
    textBold: {
        fontWeight: '500',
        color: '#000',
    },
    buttonText: {
        fontSize: 21,
        color: 'rgb(0,122,255)',
    },
    buttonTouchable: {
        padding: 16,
    },
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
    startBtn: {
        backgroundColor: "#FFB236",
        borderRadius: 50,
        padding: 10,
        width: "50%",
        alignItems: "center",
        marginTop: 50
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
