import React from 'react'
import { View , Text,TouchableOpacity,StyleSheet } from 'react-native'

import Button from './components/Button'

const HomeScreen = props =>{
    return(
        <View style={styles.principal}>
            <Text style={styles.logo}>CalisTimer</Text>
            <Button style={styles.btn} onPress={()=> props.navigation.navigate('EMOM')} >EMOM</Button>
            <Button style={styles.btn} onPress={()=> props.navigation.navigate('AMRAP')} >AMRAP</Button>
            <Button style={styles.btn} onPress={()=> props.navigation.navigate('Isometria')} >Isometria</Button>
            <Button style={styles.btn} onPress={()=> props.navigation.navigate('About')} >Sobre</Button>
        </View>
    )
}

HomeScreen.navigationOptions={
    header: null
}
const styles = StyleSheet.create({
    principal: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#D6304A',
    },
    logo: {
      fontSize: 48,
      textAlign: 'center',
      fontFamily: 'Ubuntu-Bold',
      color:'#fff',
      marginBottom:50,
    },
    btn:{
        padding:20
    }
  });

export default HomeScreen