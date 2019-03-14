import React from 'react'
import { View , Text , TouchableOpacity , StyleSheet,Image,Linking } from 'react-native'

import Button from './components/Button'

const AboutScreen = props =>{
	const back = () =>{       
        props.navigation.goBack()       
    }

    const openURL = url => () =>{
    	Linking.openURL(url)
    }

	return(
		<View style={styles.principal}>
        	<Text style={styles.logo}>CalisTimer</Text>
        	<Text style={styles.descripition}>
           		Este aplicativo foi construido durante as aulas do curso de devReactJS/React-Native 
           		do DevPleno, o devReactJS nos módulos de react-native.
        	</Text>

        	<TouchableOpacity style={{alignSelf:'center'}} onPress={openURL('https://devpleno.com')} >
        		<Image source={require('../../assets/devpleno.png')} />
        	</TouchableOpacity> 

        	<TouchableOpacity style={{alignSelf:'center'}} onPress={openURL('https://devpleno.com/devreactjs')}>
        		<Image source={require('../../assets/devreactjs2.png')} />
        	</TouchableOpacity>

        	<TouchableOpacity style={{alignSelf:'center'}} onPress={back}>
                <Image source={require('../../assets/Back27.png')} />
            </TouchableOpacity>

        </View>
		)
}
AboutScreen.navigationOptions={
    header: null
}
const styles = StyleSheet.create({
    principal: {
      flex: 1,
      justifyContent: 'space-evenly',
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
    descripition:{
    	fontFamily: 'Ubuntu-Regular',
    	fontSize:24,
    	color:'#fff',
    	marginBottom: 20,
    	textAlign: 'center',
    }
  });

export default AboutScreen