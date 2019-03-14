import React from 'react'
import { View , Text ,StyleSheet} from 'react-native'

const Titulo= props =>{
    return (
        <View style={[styles.titulao,props.style]}>
            <Text style={styles.titulo}>{props.titulo}</Text>
            <Text style={styles.subtitulo}>{props.subtitulo}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    titulo:{
        fontFamily:'Ubuntu-Bold',
        fontSize: 48,
        color: '#fff',
        textAlign:'center'
    },
    subtitulo:{
        fontFamily:'Ubuntu-Bold',
        fontSize: 14,
        color: '#fff',
        textAlign:'center'
    },
    titulao:{
        paddingBottom:20,
        paddingTop:20
    }
})

export default Titulo