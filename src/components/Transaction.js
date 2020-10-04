import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    FlatList,
    Dimensions,
    Alert,
    ScrollView
} from 'react-native';
import PropTypes from "prop-types"

export default class Transaction extends Component {

    static propTypes = {
        // Movie object with title, genre, and poster
        card: PropTypes.object.isRequired,
        // Called when user taps on a poster
        onOpen: PropTypes.func.isRequired,
        onEarn: PropTypes.func.isRequired,
    }

    clickEventListener = (item) => {
        Alert.alert('Message', 'Item clicked. ' + item.name);
    };

    render() {
        const {card, card: {card_number, points_earned, related_loyalty_program}, onOpen, onEarn} = this.props;
        return (
            <View style={styles.container}>

                {/*<TouchableOpacity style={styles.card} onPress={() => this.props.navigation.navigate('CardDetails')}>*/}
                <TouchableOpacity style={styles.card} onPress={() => onOpen(card)}>
                    <Image style={styles.image} source={require('../assets/logo.png')}/>
                    <View style={styles.cardContent}>
                        <Text style={styles.name}>{related_loyalty_program.program_name}</Text>
                        <Text style={styles.count}>{points_earned}</Text>
                    </View>
                    <View></View>
                    {/*<TouchableOpacity style={styles.followButton}*/}
                    {/*                  onPress={() => onEarn(card)}*/}
                    {/*>*/}
                    {/*    <Text style={styles.followButtonText}> Earn</Text>*/}
                    {/*</TouchableOpacity>*/}
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // marginTop:20,
        // backgroundColor:"#ebf0f7"
    },
    contentList: {
        flex: 1,
        // backgroundColor:"#3a3838",
    },
    cardContent: {
        // marginLeft:20,
        // marginTop:10
        // backgroundColor: "#fff"
    },
    image: {
        width: 40,
        height: 40,
        borderRadius: 45,
        borderWidth: 2,
        borderColor: "#ebf0f7"
    },
    card: {
        shadowColor: '#00000021',
        justifyContent: 'space-between',
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: 0.37,
        shadowRadius: 7.49,
        // elevation: 12,
        marginLeft: 5,
        marginRight: 5,
        marginTop: 10,
        backgroundColor: "#3a3838",
        padding: 10,
        flexDirection: 'row',
        borderRadius: 30,
    },
    name: {
        fontSize: 18,
        flex: 1,
        alignSelf: 'center',
        color: "#fff",
        fontWeight: 'bold'
    },
    count: {
        fontSize: 14,
        flex: 1,
        alignSelf: 'center',
        color: "#eec971"
    },
    followButton: {
        marginTop: 5,
        height: 35,
        width: 70,
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
});
