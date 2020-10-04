import React from 'react';
import {View, StyleSheet, Text, Image, TouchableOpacity} from 'react-native';

export default function TxComponent(props) {
  return (
      <TouchableOpacity>
          <View style={styles.row}>
              <Image source={require('../assets/images/icons/icons8-checkmark.png')} style={styles.pic} />
              <View>
                  <View style={styles.nameContainer}>
                      <Text style={styles.nameTxt} numberOfLines={1} ellipsizeMode="tail">{props.name}</Text>
                      <Text style={styles.mblTxt}>Today</Text>
                  </View>
                  <View style={styles.msgContainer}>
                      <Text style={styles.msgTxt}>{'Amount: '+props.amount}</Text>
                  </View>
              </View>
          </View>
      </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: '#DCDCDC',
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        padding: 10,
    },
    pic: {
        borderRadius: 20,
        width: 40,
        height: 40,
    },
    nameContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: 280,
    },
    nameTxt: {
        marginLeft: 15,
        fontWeight: '600',
        color: '#222',
        fontSize: 18,
        width:170,
    },
    mblTxt: {
        fontWeight: '200',
        color: '#777',
        fontSize: 13,
    },
    msgContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    msgTxt: {
        fontWeight: '400',
        color: '#008B8B',
        fontSize: 12,
        marginLeft: 15,
    },
});
