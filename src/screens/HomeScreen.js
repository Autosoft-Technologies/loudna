import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Platform
} from 'react-native';
import * as Animatable from "react-native-animatable";
import Transaction from "../components/Transaction";
import AsyncStorage from "@react-native-community/async-storage";

class HomeScreen extends Component {

    state = {cards: [], isLoaded: false};

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

    ViewDetails(card) {
        // Alert.alert('Card Number', card.card_number, [
        //     {text: 'Okay'}
        // ]);
        this.props.navigation.navigate('DetailScreen', {
            id: card.id,
            account: card.card_number,
            balance: card.points_earned,
            name: card.related_loyalty_program.program_name
        })
    }

    openEarn(card) {
        // alert('Openng...');
        this.props.navigation.navigate('Deposit');
    }

    onBack(id){
        // this.fetchData(this.state.userId)
        alert('Yo back')
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

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.text_header}>UGX 500,000</Text>
                    <Text style={styles.balanceTxt}>Wallet Balance</Text>
                </View>
                <View style={styles.btns}>

                    <TouchableOpacity
                        style={styles.followButton}
                        // onPress={() => this.props.navigation.navigate('ScanNewCard')}
                        onPress={() => this.props.navigation.navigate('NewCardScreen', {
                            userId: this.state.userId,
                            userToken: this.state.userToken,
                            // onGoBack: this.onBack
                        })}
                    >
                        <Text style={styles.followButtonText}> Add Program</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.followButton}
                        onPress={() => this.props.navigation.navigate('AllCards', {data: this.state.cards})}
                    >
                        <Text style={styles.followButtonText}> View all</Text>
                    </TouchableOpacity>
                </View>

                <View
                    animation="fadeInUpBig"
                    style={[styles.footer, {
                        backgroundColor: '#fff'
                    }]}
                >
                    <ScrollView>
                        <TouchableOpacity>
                            <Text style={{color: '#bc9151'}}>My cards</Text>
                        </TouchableOpacity>

                        {/*<Transaction navigation={this.props.navigation}/>*/}
                        {this.state.cards.map((card, index) => <Transaction
                            card={card}
                            key={index}
                            onOpen={() => this.ViewDetails(card)}
                            onEarn={() => this.openEarn(card)}
                        />)}
                    </ScrollView>
                </View>
            </View>
        )
    }
}

export default HomeScreen;

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
        paddingBottom: 10
    },
    footer: {
        flex: 4,
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
        // marginTop: 10,
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
        borderColor: "#dcdcdc",
    },
    followButtonText: {
        color: "#dcdcdc",
        fontSize: 12,
    },
    // count:{
    //     fontSize:14,
    //     flex:1,
    //     alignSelf:'center',
    //     color:"#6666ff"
    // },
    // image:{
    //     width:90,
    //     height:90,
    //     borderRadius:45,
    //     borderWidth:2,
    //     borderColor:"#ebf0f7"
    // },
});
