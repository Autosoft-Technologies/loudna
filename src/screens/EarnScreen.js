import React, {Component} from 'react';
import {
    View,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    ScrollView,
    Platform,
    ActivityIndicator,
} from 'react-native';
import {
    Text,
    Icon,
    Button,
    Picker,
    FormInput,
} from "@99xt/first-born";
import QRCode from "react-native-qrcode-svg";
import AsyncStorage from "@react-native-community/async-storage";
import Transaction from "../components/Transaction";

export default class EarnScreen extends Component {

    state = {
        cards: [],
        loading: true,
        currency: "0",
        userId: '',
        userToken: '',
        amount: ''
    };

    // state = {cards: [], loading: false};
    fetchData = async (id) => {

        const requestOptions = {
            method: 'GET',
            headers: new Headers({
                'Authorization': 'Bearer ' + this.state.userToken,
                'Content-Type': 'application/x-www-form-urlencoded'
            }),
            redirect: 'follow'
        };

        fetch("http://mc1.cryptosavannah.com/api/v1/loyalty/programs/subscriptions?id=" + id, requestOptions)
            .then(response => response.json())
            .then(result => {
                this.setState({cards: result.data, loading: false});
                // console.log(this.state.cards);
            })
            .catch(error => console.log('Error:', error));
    }

    componentDidMount() {
        AsyncStorage.getItem('user')
            .then(user => {
                // console.log(user);

                let usr = JSON.parse(user);
                this.setState({
                    userId: usr.user_data.id,
                    userToken: usr.token_data.token
                });
                this.fetchData(this.state.userId)
            })
            .catch(err => console.log(err));
    }


    render() {
        if (this.state.loading) {
            return (
                <View style={styles.activityIndicatorContainer}>
                    <ActivityIndicator size="large" color="#FFB236"/>
                </View>
            );
        } else {
            return (
                <View style={styles.container}>
                    <ScrollView>
                        {/*<View style={styles.action}>*/}
                        {/*    <FormInput */}
                        {/*        label="Amount" */}
                        {/*        placeholder="Amount" */}
                        {/*        onChangeText={(val) => this.setState({currency: val})}/>*/}
                        {/*</View>*/}

                        <Picker
                            label="Program"
                            onValueChange={(val) => this.setState({currency: val})}
                            selectedValue={this.state.currency}
                        >
                            {this.state.cards.map((card, index) =>
                                <Picker.Item value={card.related_loyalty_program.id}
                                             label={card.related_loyalty_program.program_name}
                                />)}
                        </Picker>

                        <View style={styles.qrcode}>
                            <QRCode
                                value={""+this.state.currency}
                                size={200}
                            />
                        </View>
                    </ScrollView>
                </View>
            );
        }
    };
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 10,
        padding: 20,
    },
    action: {
        flexDirection: 'row',
    },
    textSign: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    textPrivate: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 20
    },
    color_textPrivate: {
        color: 'grey'
    },
    qrcode: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,

    },
    activityIndicatorContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },
});
