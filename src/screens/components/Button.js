import React from 'react'
import {  Text,TouchableOpacity,StyleSheet } from 'react-native'

const Button = props =>{
return(
    <TouchableOpacity onPress={props.onPress} style={props.style}>
        <Text style={[styles.text,props.styleText]} >{props.children}</Text>
    </TouchableOpacity>
)
}

const styles = StyleSheet.create({
    text:{
        color:'#fff',
        fontFamily: 'Ubuntu-Regular',
        fontSize: 24,
        textAlign: 'center',
    }
  });

export default Button