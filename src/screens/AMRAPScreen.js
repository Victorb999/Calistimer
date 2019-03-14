import React,{Component} from 'react'
import { Keyboard,View,ScrollView , Text ,StyleSheet,Image,KeyboardAvoidingView,TouchableOpacity} from 'react-native'

import Select from './components/Select'
import Titulo from './components/Title'
import Time from './components/Time'
import ProgressBar from './components/ProgressBar'
import BackgroundProgress from './components/BackgroundProgress'

import Sound from 'react-native-sound'
import { TextInput } from 'react-native-gesture-handler'
import KeepAwake from 'react-native-keep-awake'

const alert = require('../../assets/sounds/alert.wav')

class AMRAPScreen extends Component{

    state={
        keyboradIsVisible: false,

        alerts:[0],
        countdown:1,
        time:'2',
        paused:false,

        isrunning: false,
        countdownValue:0,
        count:0,
        repetitions:0
    }

    componentDidMount(){
       Sound.setCategory('Playback',true)
        this.alert = new Sound(alert)

       this.kbShow= Keyboard.addListener('keyboardDidShow',()=>{
           this.setState({
               keyboradIsVisible:true
           })
       })
       this.kbHide= Keyboard.addListener('keyboardDidHide',()=>{
            this.setState({
                keyboradIsVisible:false
            })
        })
        //this.play()
    }

    componentWillUnmount(){
        this.kbHide.remove()
        this.kbShow.remove()
        clearInterval(this.countTimer)
        clearInterval(this.countdownTimer)
        this.props.navigation.goBack()
    }
    playAlert = () =>{
        const resto = this.state.count % 60
        if(this.state.alerts.indexOf(resto)>=0){
            this.alert.play()
        }
        if(this.state.countdown===1){
            if(resto >=55 && resto < 60){
                this.alert.play()
            }
        }
    } 
    restart = ()=>{
        if(this.state.paused){
            clearInterval(this.countTimer)
            clearInterval(this.countdownTimer)
            this.play()
        }        
    }
    back = () =>{
        if(this.state.paused || !this.state.isrunning){
            clearInterval(this.countTimer)
            clearInterval(this.countdownTimer)
            this.props.navigation.goBack()
        } 
       
    }

    stop = () =>{
        /*clearInterval(this.countdownTimer)
        clearInterval(this.countTimer)*/
        this.setState({
            paused: !this.state.paused
        })
    }

    play = () => {
        this.setState({
            paused:false,
            repetitions:0,
            count:0,
            countdownValue:this.state.countdown === 1 ? 5 : 0,
        })
        this.setState({ isrunning: true})
        const count = () =>{
            if(this.state.paused){
                return;
            }
            this.setState({
                count: this.state.count +1
            },() =>{
                this.playAlert()
                if(this.state.count === parseInt(this.state.time)*60){
                    clearInterval(this.countTimer)
                }
            })
        }
        //checkar o countdown
        if(this.state.countdown ===1){
            this.alert.play()
            this.countdownTimer = setInterval(()=> { 
                if(this.state.paused){
                    return;
                }
                this.alert.play()              
                this.setState({
                    countdownValue:this.state.countdownValue - 1
                }, () =>{                    
                    if(this.state.countdownValue === 0){
                        clearInterval(this.countdownTimer)
                        this.countTimer= setInterval(count,1000)
                    }
                })
               
            },1000)
        }else{
            this.countTimer= setInterval(count,1000) 
        }
        //comeeçar a contar

        //terminar

    }

    decrement = () =>{
        if(this.state.repetitions > 0){
           this.setState({
               repetitions: this.state.repetitions -1
           }) 
        }
    }
    increment = () =>{
        
           this.setState({
               repetitions: this.state.repetitions +1
           }) 
        
    }

    render(){
        if(this.state.isrunning){
            const percMinute= parseInt(((this.state.count% 60)/60 )*100)
            const percTime = parseInt(( (this.state.count/60) / parseInt(this.state.time) )* 100)

            const media =this.state.repetitions<=0? 0: this.state.count / this.state.repetitions
            const estimated = media<=0? 0: Math.floor((parseInt(this.state.time)*60)/media)
            const opacity= !this.state.paused ? 0.6:1
            return(
                <BackgroundProgress percentage={percMinute}>

                    <View style={{flex:1,justifyContent:'center'}}>
                        <KeepAwake />
                        <View style={{flex:1,justifyContent:'center'}}>
                            <Titulo 
                                titulo={'AMRAP'}
                                subtitulo={'As Many Repetitions As Possible'}
                                style={{paddingTop: this.state.keyboradIsVisible? 10 : 0}}
                            /> 
                            
                            { this.state.repetitions > 0 ?
                                <View style={{flexDirection:'row',justifyContent:'space-evenly',marginBottom:20}}>
                                    <View style={{flex:1,justifyContent:'center'}}>
                                        <Time time={media}  type='text3'/>
                                        <Text style={styles.subtitle}>por repetição</Text>
                                    </View>
        
        
                                    <View style={{flex:1,justifyContent:'center'}}>  
                                        <Text style={styles.count}>{estimated}</Text>                          
                                        <Text style={styles.subtitle}>repetições</Text>
                                    </View>
        
                                </View>
                                :null}
                        </View>
                        
                        

                        <View style={{flex:1,justifyContent:'center'}}>
                            <Time time={this.state.count} />
                            <ProgressBar
                                percentage={percTime}
                            />
                            <Time 
                                time={parseInt(this.state.time)*60 - this.state.count} 
                                type='text2'
                                appendedText={' restantes'} />  
                        </View>

                        <View style={{flex:1,justifyContent:'flex-end'}}>
                         {
                            this.state.countdownValue > 0 ?
                            <Text style={styles.countdown}>{this.state.countdownValue}</Text>
                            : 

                            <View style={{flexDirection:'row',justifyContent:'space-evenly',marginBottom:20}}>
                                <TouchableOpacity onPress={this.decrement}>
                                    <Text style={styles.countdown}>-</Text>
                                </TouchableOpacity>

                                <Text style={styles.countdown}>{this.state.repetitions}</Text>
                                
                                <TouchableOpacity onPress={this.increment}>
                                    <Text style={styles.countdown}>+</Text>
                                </TouchableOpacity>
                            </View>
                         }
                         
                        <View style={{flexDirection:'row',justifyContent:'space-evenly',marginBottom:20}}>                        
                            <TouchableOpacity style={{alignSelf:'center'}} onPress={this.back}>
                                <Image style={{opacity}} source={require('../../assets/Back27.png')} />
                            </TouchableOpacity>
                            <TouchableOpacity style={{alignSelf:'center'}} onPress={this.stop}>
                                
                                {this.state.paused ? 
                                <Image source={require('../../assets/play64.png')} />
                                : <Image source={require('../../assets/stop64.png')} />
                                }
                            </TouchableOpacity>
                            <TouchableOpacity style={{alignSelf:'center'}} onPress={this.restart}>
                                <Image style={{opacity}} source={require('../../assets/Refresh27.png')} />
                            </TouchableOpacity>
                        </View> 
                        
                        </View>  
                    </View>
                </BackgroundProgress>
            )
        }
        return(
            <KeyboardAvoidingView style={{flex:1}} >
            <ScrollView style={styles.principal}>
                <Titulo 
                    titulo={'AMRAP'}
                    subtitulo={'As Many Repetitions As Possible'}
                    style={{paddingTop: this.state.keyboradIsVisible? 20 : 80}}
                />
                <Image style={styles.config} source={require('../../assets/config50.png')} />
                <Select 
                    label='Alertas'
                    current={this.state.alerts}
                    options={[{
                            id:0,
                            label:'0s'},
                        {
                            id:15,
                            label:'15s',
                        },
                        {
                            id:30,
                            label:'30s',
                        },
                        {
                            id:45,
                            label:'45s',
                        }
                    ]} 
                    onSelect={ opt => this.setState({
                        alerts:opt
                    })}
                />
                <Select 
                    current={this.state.countdown}
                    label='Contagem regressiva'
                    options={[
                        {id:1,label:"sim"},
                        {id:2,label:"não"},
                    ]} 
                    onSelect={ opt => this.setState({
                        countdown:opt
                    })}
                />
                <Text style={styles.label}>Quantos minutos</Text>
                <TextInput style={styles.input} value={this.state.time} keyboardType='numeric' onChangeText={ text => this.setState({time:text})}/>
                <Text style={styles.label}>minutos</Text>

                <View style={{flexDirection:'row',justifyContent:'space-evenly',marginBottom:20}}>
                    <TouchableOpacity style={{alignSelf:'center'}} onPress={this.back}>
                        <Image source={require('../../assets/Back27.png')} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.play}>
                        <Image style={styles.play} source={require('../../assets/play64.png')} />
                    </TouchableOpacity>
                    <Text></Text>
                </View>

            </ScrollView>
            </KeyboardAvoidingView>
        )
    }
}
AMRAPScreen.navigationOptions={
    header: null
}
const styles = StyleSheet.create({
    principal: {
      flex: 1,
      backgroundColor: '#D6304A',      
    },
    label:{
        textAlign:'center',
        color:"#fff",
        fontFamily:'Ubuntu-Regular',
        fontSize:18,
    },
    input:{
        textAlign:'center',
        color:"#000",
        fontFamily:'Ubuntu-Regular',
        fontSize:48,
    },
    config:{
        alignSelf:'center',
        marginBottom:17
    },
    play:{
        alignSelf:'center'
    },
    countdown:{
        textAlign:'center',
        color:"#fff",
        fontFamily:'Ubuntu-Bold',
        fontSize:100
    },
    subtitle:{
        textAlign:'center',
        color:"#fff",
        fontFamily:'Ubuntu-Bold',
        fontSize:11
    },
    count:{
        fontFamily:'Ubuntu-Bold',
        fontSize: 32,
        color:'#fff',
        textAlign:'center'
    }
   
  });
export default AMRAPScreen