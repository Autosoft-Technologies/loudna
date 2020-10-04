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
    Platform, Image, Alert,
    ImageBackground, FlatList
} from 'react-native';
import Transaction from "../components/Transaction";
import appStyles from "../styles/app-style";
import TxComponent from "../components/TxComponent";

const image = {uri: "https://reactjs.org/logo-og.png"};

class DetailScreen extends Component {

    state = {card: {}, isLoaded: false};
    // state = {
    //     loading: true,
    // };

    componentDidMount() {
        this.setState({
            card: this.props.route.params,
            transactions: [
                {
                    id: 1,
                    name: "Mark Doe",
                    status: "active",
                    image: "https://bootdey.com/img/Content/avatar/avatar7.png"
                },
                {
                    id: 2,
                    name: "Clark Man",
                    status: "active",
                    image: "https://bootdey.com/img/Content/avatar/avatar6.png"
                },

            ]
        })
        // console.log(this.props.route.params)
    }

    renderItem = ({item}) => {
        return (
            <TxComponent name={'GH6565SD75SD7'} amount={'230000'}/>
        );
    }

    fetchCardTransactions = (id) => {

    }

    render() {
        return (
            <View style={styles.container}>
                <ImageBackground
                    source={require('../assets/images/backgrounds/currency-bg.jpg')}
                    style={styles.image}>
                    <View style={styles.header}>
                        <Text style={styles.text_header}>{this.state.card.balance}</Text>
                        <Text style={styles.balanceTxt}>A/c : {this.state.card.account}</Text>
                    </View>

                    <View style={styles.btns}>
                        <TouchableOpacity
                            style={styles.followButton}
                            // onPress={() => this.props.navigation.navigate('AllCards', {data: this.state.cards})}
                        >
                            <Text style={styles.followButtonText}> Earn</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.followButton}
                            // onPress={() => this.props.navigation.navigate('NewCardScreen', {
                            //     userId: this.state.userId,
                            //     userToken: this.state.userToken,
                            // })}
                        >
                            <Text style={styles.followButtonText}> Spend</Text>
                        </TouchableOpacity>
                    </View>
                </ImageBackground>
                <View
                    animation="fadeInUpBig"
                    style={[styles.footer, {
                        backgroundColor: '#fff'
                    }]}
                >
                    <ScrollView>
                        <TouchableOpacity>
                            <Text style={{color: '#bc9151', padding: 5}}>History</Text>
                        </TouchableOpacity>
                        <View style={styles.items}>
                            <FlatList
                                extraData={this.state}
                                data={this.state.transactions}
                                keyExtractor={(item) => {
                                    return item.id;
                                }}
                                renderItem={this.renderItem}/>
                        </View>
                    </ScrollView>
                </View>
            </View>
        )
    }
}

export default DetailScreen;

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
        // borderTopLeftRadius: 30,
        // borderTopRightRadius: 30,
        paddingHorizontal: 5,
        // paddingVertical: 30
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
    image: {
        flex: 2,
        flexDirection: "column",
        // resizeMode: "cover",
        // justifyContent: "center"
        // flex: 2,
        // width: '100%',
        // alignItems: 'center',
        // justifyContent: 'center',
        // paddingBottom: 5,
    },
    items: {
        flex: 1,
        // marginRight: 10,
        // marginLeft: 10,
    }
});
