import React,{Component} from 'react'
import { View , Text ,StyleSheet} from 'react-native'

const Timer = props =>{
    const minutes = parseInt(props.time / 60)
    const seconds = parseInt(props.time % 60)
    const format= num =>{
        if(num<10){
            return '0'+num
        }
        else{
            return num
        }
    }
    return(
        <Text style={styles[props.type ? props.type : 'text']}>
            {format(minutes)}:{format(seconds)}
            {props.appendedText}
        </Text>
    )


}
const styles = StyleSheet.create({
    text:{
        fontFamily:'Ubuntu-Bold',
        fontSize: 96,
        color:'#fff',
        textAlign:'center'
    },

    text2:{
        fontFamily:'Ubuntu-Regular',
        fontSize: 24,
        color:'#fff',
        textAlign:'center'
    },
    text3:{
        fontFamily:'Ubuntu-Bold',
        fontSize: 32,
        color:'#fff',
        textAlign:'center'
    }
})
export default Timer
