import React from 'react';
import {View, StyleSheet, Linking} from 'react-native';
import {
    useTheme,
    Avatar,
    Title,
    Caption,
    Paragraph,
    Drawer,
    Text,
    TouchableRipple,
    Switch
} from 'react-native-paper';
import {
    DrawerContentScrollView,
    DrawerItem
} from '@react-navigation/drawer';

import Icon from 'react-native-vector-icons/Ionicons';

import {AuthContext} from '../components/context';

export function DrawerContent(props) {

    const paperTheme = useTheme();

    const {signOut, toggleTheme} = React.useContext(AuthContext);
    const {userName, setUsername} = React.useState('');
    const {email, setEmail} = React.useState('');

    return (
        <View style={{flex: 1, backgroundColor: '#eec971'}}>
            <DrawerContentScrollView {...props}>
                <View style={styles.drawerContent}>
                    <Drawer.Section style={styles.drawerSection}>
                    <View style={styles.userInfoSection}>
                        <View style={{flexDirection: 'row', marginTop: 15}}>
                            <Avatar.Image
                                source={{
                                    uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSxwloerZk94rItAy7FTKVPb8vyhs61tU4oiQ&usqp=CAU'
                                }}
                                size={50}
                            />
                            <View style={{marginLeft: 15, flexDirection: 'column'}}>
                                <Title style={styles.title}>Username</Title>
                                <Caption style={styles.caption}>email</Caption>
                            </View>
                        </View>
                    </View>
                    </Drawer.Section>
                    <Drawer.Section style={styles.drawerSection}>
                        <DrawerItem
                            icon={({color, size}) => (
                                <Icon
                                    name="home-outline"
                                    color={color}
                                    size={size}
                                />
                            )}
                            label="Home"
                            onPress={() => {
                                props.navigation.navigate('Home')
                            }}
                        />

                        <DrawerItem
                            icon={({color, size}) => (
                                <Icon
                                    name="arrow-down-circle-outline"
                                    color={color}
                                    size={size}
                                />
                            )}
                            label="Earn"
                            onPress={() => {
                                props.navigation.navigate('Deposit')
                            }}
                        />

                        <DrawerItem
                            icon={({color, size}) => (
                                <Icon
                                name="list-circle-outline"
                                color={color}
                                size={size}
                                />
                            )}
                            label="My Programs"
                            onPress={() => {props.navigation.navigate('AllCards')}}
                        />

                        <DrawerItem
                            icon={({color, size}) => (
                                <Icon
                                    name="person-circle-outline"
                                    color={color}
                                    size={size}
                                />
                            )}
                            label="Profile"
                            onPress={() => {
                                props.navigation.navigate('Profile')
                            }}
                        />
                        {/*<DrawerItem*/}
                        {/*    icon={({color, size}) => (*/}
                        {/*        <Icon*/}
                        {/*            name="account-check-outline"*/}
                        {/*            color={color}*/}
                        {/*            size={size}*/}
                        {/*        />*/}
                        {/*    )}*/}
                        {/*    label="Support"*/}
                        {/*    onPress={() => {*/}
                        {/*        props.navigation.navigate('SupportScreen')*/}
                        {/*    }}*/}
                        {/*/>*/}
                    </Drawer.Section>
                    <Drawer.Section title="Contacts">
                        {/*<TouchableRipple onPress={() => {*/}
                        {/*    toggleTheme()*/}
                        {/*}}>*/}
                        {/*    <View style={styles.preference}>*/}
                        {/*        <Text>Dark Theme</Text>*/}
                        {/*        <View pointerEvents="none">*/}
                        {/*            <Switch value={paperTheme.dark}/>*/}
                        {/*        </View>*/}
                        {/*    </View>*/}
                        {/*</TouchableRipple>*/}

                        <DrawerItem
                            icon={({color, size}) => (
                                <Icon
                                    name="globe-outline"
                                    color={color}
                                    size={size}
                                />
                            )}
                            label="Visit Website"
                            onPress={() => {
                                Linking
                                    .openURL('https://savannah.ug/about.php')
                                    .catch(err => console.error('An error occured', err));
                                // props.navigation.navigate('SupportScreen')
                            }}
                        />
                    </Drawer.Section>
                </View>
            </DrawerContentScrollView>
            <Drawer.Section style={styles.bottomDrawerSection}>
                <DrawerItem
                    icon={({color, size}) => (
                        <Icon
                            name="ios-log-out"
                            color={color}
                            size={size}
                        />
                    )}
                    label="Sign Out"
                    onPress={() => {
                        signOut()
                    }}
                />
            </Drawer.Section>
        </View>
    );
}

const styles = StyleSheet.create({
    drawerContent: {
        flex: 1,
        // backgroundColor: '#eec971'
    },
    userInfoSection: {
        paddingLeft: 20,
    },
    title: {
        fontSize: 16,
        marginTop: 3,
        fontWeight: 'bold',
    },
    caption: {
        fontSize: 14,
        lineHeight: 14,
    },
    row: {
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    section: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 15,
    },
    paragraph: {
        fontWeight: 'bold',
        marginRight: 3,
    },
    drawerSection: {
        marginTop: 15,
    },
    bottomDrawerSection: {
        marginBottom: 15,
        borderTopColor: '#3a3838',
        borderTopWidth: 1
    },
    preference: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 12,
        paddingHorizontal: 16,
    },
});
