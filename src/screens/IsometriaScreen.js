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

class IsometriaScreen extends Component{

    state={
        keyboradIsVisible: false,

        goal :1,
        countdown:1,
        time:'20',

        paused: false,
        isrunning: false,
        countdownValue:0,
        count:0
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
        const resto = 0
        const { count, time } = this.state
        if(count >=parseInt(time)-5 && count <=  parseInt(time)){
            this.alert.play()
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
        
        this.setState({
            paused: !this.state.paused
        })
    }

    play = () => {
        
        const time = this.state.goal === 0 ? '0': this.state.time
        this.setState({
            count:0,
            countdownValue:5,
            paused:false,
            time
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
                /*if(this.state.count === parseInt(this.state.time)){
                    clearInterval(this.countTimer)
                }*/
            })
        }
        //checkar o countdown
       
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

    }

    render(){
        if(this.state.isrunning){
            const percMinute= parseInt(this.state.time) === 0 ? 0 : parseInt((this.state.count/parseInt(this.state.time)) *100)
            const restante = parseInt(this.state.time)>= this.state.count? parseInt(this.state.time)-this.state.count:0
            const opacity= !this.state.paused ? 0.6:1
            return(
                <BackgroundProgress percentage={percMinute}>
                
                    <KeepAwake />
                    <View style={{flex:1,justifyContent:'center'}}>
                        <View style={{flex:1,justifyContent:'center'}}>
                            <Titulo 
                                titulo={'Isometria'}                               
                                style={{paddingTop: this.state.keyboradIsVisible? 20 : 60}}
                            />                       
                        </View>
                        <View style={{flex:1,justifyContent:'center'}}>
                            <Time time={this.state.count} />
                            { this.state.goal === 1 ?
                                <Time 
                                    time={restante}
                                    type='text2'
                                    appendedText={' restantes'} 
                                />  
                                :null
                            } 
                        </View>
                        <View style={{flex:1,justifyContent:'flex-end'}}>
                         {
                            this.state.countdownValue > 0 ?
                            <Text style={styles.countdown}>{this.state.countdownValue}</Text>
                            : null
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
                    titulo={'Isometria'}                    
                    style={{paddingTop: this.state.keyboradIsVisible? 20 : 80}}
                />
                <Image style={styles.config} source={require('../../assets/config50.png')} />
                <Select 
                    label='Objetivo'
                    current={this.state.goal}
                    options={[{
                            id:0,
                            label:'livre'},
                        {
                            id:1,
                            label:'bater tempo',
                        }
                    ]} 
                    onSelect={ opt => this.setState({
                        goal:opt
                    })}
                />
                {  this.state.goal !== 0 ?
                <React.Fragment>
                    <Text style={styles.label}>Quantos segundos</Text>
                    <TextInput style={styles.input} value={this.state.time} keyboardType='numeric' onChangeText={ text => this.setState({time:text})}/>
                </React.Fragment>
                : null
                }

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
IsometriaScreen.navigationOptions={
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
    }
   
  });
export default IsometriaScreen