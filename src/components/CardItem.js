import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

import Colors from '../constants/Colors';
import appStyles from '../styles/app-style';

export default function CardItem(props) {
  return (
    <View style={styles.item_container}>
        <View style={{flex: 8}}>
            <View style={[appStyles.row_container, {justifyContent: 'flex-start'}]}>
                <Text style={[appStyles.font_lg, appStyles.font_bold, {color: Colors.blackMarlinColor}]}>{props.name}</Text>
            </View>

        </View>

    </View>
  );
}

const styles = StyleSheet.create({
    item_container: {
        flex: 1,
        flexDirection: 'row',
        padding: 10,
        paddingRight: 5,
        backgroundColor: Colors.whiteColor,
    },
    event_date: {
        backgroundColor: Colors.airForceBlueColor,
        paddingTop: 3,
        paddingBottom: 3,
        paddingRight: 5,
        paddingLeft: 10,
        borderTopLeftRadius: 15,
        borderBottomLeftRadius: 15,
    },
})
