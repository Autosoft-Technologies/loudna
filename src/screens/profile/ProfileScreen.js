import React, {Component} from 'react';
import {
    ImageBackground,
    Image,
    Text,
    View,
    TouchableOpacity,
    Alert,
    SafeAreaView,
    FlatList,
    ActivityIndicator,
    StyleSheet,
} from 'react-native';
import {Card} from 'native-base'
import appStyles from '../../styles/app-style';
import styles from './style';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/Ionicons';

class PersonalScreen extends Component {
    state = {
        loading: true,
        showLoginForm: false,
        isSaving: false,
        userName: '',
        email: '',
    };

    async componentDidMount() {

        AsyncStorage.getItem('user')
            .then(user => {
                // console.log(user);

                if (user === null) {
                    this.setState({loading: false, showLoginForm: true});
                } else {
                    let usr = JSON.parse(user);
                    this.setState({
                        loading: false,
                        userId: usr.user_data.id,
                        email: usr.user_data.email,
                        phone: usr.user_data.phone_number,
                        username: usr.user_data.username,
                        fname: usr.user_data.first_name,
                        lname: usr.user_data.last_name,
                        location: usr.user_data.location,
                    });
                }
            })
            .catch(err => console.log(err));
    }

    render() {
        return (
            <View style={appStyles.container}>
                <ImageBackground
                    source={require('../../assets/images/backgrounds/currency-bg.jpg')}
                    style={[appStyles.col_container, {flex: 2}]}>
                    <View style={[appStyles.col_container, {flex: 2}]}>
                        <TouchableOpacity
                            style={styles.edit_button}
                            onPress={() => alert('Edit profile')}
                        >
                            <Image
                                source={require('../../assets/images/icons/pencil.png')}
                                style={styles.edit_icon}
                            />
                        </TouchableOpacity>
                        <View style={{flex: 1}}>
                            <Image style={styles.avatar}
                                   source={{
                                       uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSxwloerZk94rItAy7FTKVPb8vyhs61tU4oiQ&usqp=CAU'
                                   }}
                            />
                        </View>
                    </View>
                    <View style={[appStyles.col_container, {flex: 1}]}>
                        <View style={appStyles.col_container}>
                            <Text style={[appStyles.white, appStyles.font_md]}>{this.state.username}</Text>
                            <Text style={[appStyles.white, appStyles.font_lg]}>{this.state.email}</Text>
                        </View>
                    </View>
                </ImageBackground>
                <View style={[appStyles.col_container, {flex: 3}]}>
                    <SafeAreaView style={[appStyles.w_100, {flex: 1}]}>
                        <View>
                            <Card>
                                <View style={{padding: 10}}>

                                    {/*contact us*/}
                                    <TouchableOpacity>
                                        <View style={[telStyles.container]}>
                                            <View style={telStyles.iconRow}>
                                                <Icon name="person-circle-outline" style={{color: "#bc9151",}} size={26}/>
                                            </View>
                                            <TouchableOpacity
                                                style={telStyles.telRow}>
                                                <View style={telStyles.telNumberColumn}>
                                                    <Text style={telStyles.telNumberText}>Name</Text>
                                                </View>
                                                <View style={telStyles.telNameColumn}>
                                                    <Text style={telStyles.telNameText}>{this.state.fname} {this.state.lname} </Text>
                                                </View>
                                            </TouchableOpacity>
                                            <View style={telStyles.smsRow}>
                                                <Icon
                                                    ios="logo-whatsapp"
                                                    android="logo-whatsapp"
                                                    style={{color: "#bc9151",}}/>
                                            </View>
                                        </View>
                                    </TouchableOpacity>

                                    {/*contact us*/}
                                    <TouchableOpacity>
                                        <View style={[telStyles.container]}>
                                            <View style={telStyles.iconRow}>
                                                <Icon name="ios-call" style={{color: "#bc9151",}} size={26}/>
                                            </View>
                                            <TouchableOpacity
                                                style={telStyles.telRow}>
                                                <View style={telStyles.telNumberColumn}>
                                                    <Text style={telStyles.telNumberText}>Phone</Text>
                                                </View>
                                                <View style={telStyles.telNameColumn}>
                                                    <Text style={telStyles.telNameText}>{this.state.phone}</Text>
                                                </View>
                                            </TouchableOpacity>
                                            <View style={telStyles.smsRow}>
                                                <Icon
                                                    ios="logo-whatsapp"
                                                    android="logo-whatsapp"
                                                    style={{color: "#bc9151",}}/>
                                            </View>
                                        </View>
                                    </TouchableOpacity>

                                    {/*Seperator line*/}
                                    <View style={sepStyles.container}>
                                        <View style={sepStyles.separatorOffset}/>
                                        <View style={sepStyles.separator}/>
                                    </View>

                                    <TouchableOpacity>
                                        <View style={[mailStyles.container]}>
                                            <View style={mailStyles.iconRow}>
                                                {/*<Icon*/}
                                                {/*    name="ios-mail"*/}
                                                {/*    style={{color: "#bc9151",}}/>*/}
                                                <Icon name="ios-mail" style={{color: "#bc9151",}} size={26}/>
                                            </View>
                                            <TouchableOpacity
                                                style={mailStyles.emailRow}>
                                                <View style={mailStyles.emailColumn}>
                                                    <Text style={mailStyles.emailText}>Email</Text>
                                                </View>
                                                <View style={mailStyles.emailNameColumn}>
                                                    <Text style={mailStyles.emailNameText}>{this.state.email}</Text>
                                                </View>
                                            </TouchableOpacity>
                                        </View>
                                    </TouchableOpacity>
                                    {/*Seperator line*/}
                                    <View style={sepStyles.container}>
                                        <View style={sepStyles.separatorOffset}/>
                                        <View style={sepStyles.separator}/>
                                    </View>

                                    {/*Location view*/}
                                    <TouchableOpacity>
                                        <View style={[mailStyles.container]}>
                                            <View style={mailStyles.iconRow}>
                                                <Icon
                                                    name="ios-pin"
                                                    style={{color: "#bc9151",}}
                                                    size={26}
                                                />
                                            </View>
                                            <View style={mailStyles.emailRow}>
                                                <View style={mailStyles.emailColumn}>
                                                    <Text style={mailStyles.emailText}>Location</Text>
                                                </View>
                                                <View style={mailStyles.emailNameColumn}>
                                                    <Text style={mailStyles.emailNameText}>
                                                        {this.state.location}
                                                    </Text>
                                                </View>
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                </View>

                            </Card>
                        </View>
                    </SafeAreaView>
                </View>
            </View>
        );
    }

}

export default PersonalScreen;

// const styles = StyleSheet.create({
//     cardContainer: {
//         // backgroundColor: '#FFF',
//         // borderWidth: 0,
//         flex: 1,
//         margin: 0,
//         padding: 0,
//     },
//     mapContainer: {
//         width: '100%',
//         height: 270,
//     },
//     container: {
//         flex: 1,
//     },
//     emailContainer: {
//         backgroundColor: '#FFF',
//         flex: 1,
//         paddingTop: 30,
//     },
//     headerColumn: {
//         backgroundColor: 'transparent',
//         alignItems: 'center',
//         height: 170,
//     },
//     placeIcon: {
//         color: 'white',
//         fontSize: 26,
//     },
//     scroll: {
//         backgroundColor: '#FFF',
//     },
//     telContainer: {
//         backgroundColor: '#FFF',
//         flex: 1,
//         // paddingTop: 30,
//     },
//     userAddressRow: {
//         alignItems: 'center',
//         flexDirection: 'row',
//     },
//     userCityRow: {
//         backgroundColor: 'transparent',
//     },
//     userCityText: {
//         color: '#A5A5A5',
//         fontSize: 15,
//         fontWeight: '600',
//         textAlign: 'center',
//     },
//     userImage: {
//         borderColor: '#bc9151',
//         borderRadius: 85,
//         borderWidth: 3,
//         height: 170,
//         // marginBottom: 15,
//         width: 170,
//     },
//     userNameText: {
//         color: '#FFF',
//         fontSize: 22,
//         fontWeight: 'bold',
//         paddingTop: 90,
//         textAlign: 'center',
//     },
// });

const mailStyles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginBottom: 25,
    },
    emailColumn: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginBottom: 5,
    },
    emailIcon: {
        color: '#bc9151',
        fontSize: 30,
    },
    emailNameColumn: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },
    emailNameText: {
        color: 'gray',
        fontSize: 14,
        fontWeight: '200',
    },
    emailRow: {
        flex: 8,
        flexDirection: 'column',
        justifyContent: 'center',
    },
    emailText: {
        fontSize: 16,
    },
    iconRow: {
        flex: 2,
        justifyContent: 'center',
    },
    poweredBy: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        textAlign: 'center',
        marginTop: 20,
    },
    powerText: {
        fontSize: 16,
        textAlign: 'center'
    },
    powerColumn: {
        textAlign: 'center',
    },
    powerNameText: {
        color: 'gray',
        fontSize: 14,
        fontWeight: '200',
        textAlign: 'center'
    },
});

const sepStyles = StyleSheet.create({
    container: {
        flexDirection: 'row',
    },
    separatorOffset: {
        flex: 2,
        flexDirection: 'row',
    },
    separator: {
        flex: 8,
        flexDirection: 'row',
        borderColor: '#EDEDED',
        borderWidth: 0.8,
    },
});

const telStyles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginBottom: 25,
    },
    iconRow: {
        flex: 2,
        justifyContent: 'center',
    },
    smsIcon: {
        color: 'gray',
        fontSize: 30,
    },
    smsRow: {
        flex: 2,
        justifyContent: 'flex-start',
    },
    telIcon: {
        color: '#bc9151',
        fontSize: 30,
    },
    telNameColumn: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },
    telNameText: {
        color: 'gray',
        fontSize: 14,
        fontWeight: '200',
    },
    telNumberColumn: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginBottom: 5,
    },
    telNumberText: {
        fontSize: 16,
    },
    telRow: {
        flex: 6,
        flexDirection: 'column',
        // justifyContent: 'center',
    },
    powerColumn: {}
});
