import React from 'react';
import {View, Text, Button, StyleSheet, TouchableOpacity, Linking} from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';

const MakePayment = ({navigation}) => {

    const onSuccess = (e) => {
        console.log(e.data);
        // Linking
        //     .openURL(e.data)
        //     .catch(err => console.error('An error occured', err));
        goBack();
    }

    const goBack = () => {
        navigation.goBack();
    };
    return (
        <View>
            <QRCodeScanner
                onRead={onSuccess.bind(this)}
                bottomContent={
                    <View style={styles.buttonTouchable}>
                        <Text style={styles.buttonText}>Scanning...</Text>
                    </View>
                }
            />
        </View>
    );
};

export default MakePayment;

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
});

