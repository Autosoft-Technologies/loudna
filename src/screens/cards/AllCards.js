import React, {Component} from 'react';
import {
    View,
    Text,
    Button,
    StyleSheet,
    StatusBar,
    ScrollView,
    TextInput,
    TouchableOpacity,
    Platform, Image, Alert
} from 'react-native';
import {useTheme} from '@react-navigation/native';
import * as Animatable from "react-native-animatable";
import Transaction from "../../components/Transaction";
import AsyncStorage from "@react-native-community/async-storage";
import {SearchableFlatList} from "react-native-searchable-list";

class AllCards extends Component {
    state = {cards: []};

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
                this.setState({cards: result.data});
                // console.log(this.state.cards);
            })
            .catch(error => console.log('error', error));

    }

    componentDidMount() {

        AsyncStorage.getItem('user')
            .then(user => {
                if (user === null) {
                    this.setState({loading: false, showLoginForm: true});
                } else {
                    let usr = JSON.parse(user);
                    this.setState({
                        loading: false,
                        userId: usr.user_data.id,
                        userToken: usr.token_data.token
                    });
                    this.fetchData(usr.user_data.id)
                }
            })
            .catch(err => console.log(err));
    }

    ViewDetails(card) {
        this.props.navigation.navigate('DetailScreen', {
                id: card.id,
                account: card.card_number,
                balance: card.points_earned,
                name: card.related_loyalty_program.program_name
            }
        )
    }

    openEarn(card) {
        // alert('Openng...');
        this.props.navigation.navigate('Deposit');
    }

    render() {
        return (
            <View style={styles.container}>

                <View
                    style={[styles.footer, {
                        backgroundColor: '#fff'
                    }]}
                >
                    <ScrollView>

                        {this.state.cards.map((card, index) => <Transaction
                            card={card}
                            key={index}
                            onOpen={() => this.ViewDetails(card)}
                            onEarn={() => this.openEarn(card)}
                        />)}
                    </ScrollView>
                </View>
            </View>
        );
    }
}

export default AllCards;

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
});
