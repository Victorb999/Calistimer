import React,{ Component} from 'react'
import { View , Text ,StyleSheet,TouchableOpacity} from 'react-native'

class Select extends Component{
    state={
        current: ' '
    }
    componentDidMount(){
        this.setState({
            current: this.props.current
        })
    }
    handlePress = opt => () =>{
       
        const { current } = this.state
        if(Array.isArray(current)){             
            let newCurrent = current
            const i = current.indexOf(opt)
            if(i >=0){
                newCurrent= [...current]
                newCurrent.splice(i,1)
            }else{
                newCurrent= [...current,opt]
            }
            this.setState({
                current:newCurrent
            })
            if(this.props.onSelect){
                this.props.onSelect(newCurrent)
            }
        }else{
            this.setState({
                current: opt
            })
            if(this.props.onSelect){
                this.props.onSelect(opt)
            }
        }
       
    }
    
    checkItem= item =>{
        const { current } = this.state

        if(Array.isArray(current)){
           return  current.indexOf(item)>=0
        }
        return current==item
    }


    render(){
        const {options,label} = this.props
        const { current } = this.state
        
        return(
            <View >
                <Text style={styleSelect.label}>{label}</Text>
                <View style={styleSelect.opcao}>                    
                    {options.map( opt => {
                        let id =''
                        let label = ''
                        if(typeof opt === 'string'){
                            id= opt
                            label=opt
                        }
                        if(typeof opt === 'object'){
                            id = opt.id
                            label=opt.label
                        }    
                        return(
                            <TouchableOpacity 
                            key={id} 
                            style={[this.checkItem(id) ? styleSelect.optSelected : null]}
                            onPress={this.handlePress(id)}
                            >
                                <Text  key={id} style={styleSelect.optLabel}>{label}</Text>
                            </TouchableOpacity>
                        )
                    })}
                    
                </View>
            </View>            
        )
    }
}
const styleSelect = StyleSheet.create({
    label:{
        textAlign:'center',
        color:"#fff",
        fontFamily:'Regular',
        fontSize:18
    },
    opcao:{       
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom:20        
    },
    optLabel:{
        fontFamily:'Ubuntu-Regular',
        fontSize:16,
        color: '#fff',
        opacity:1
    },
    optSelected:{
        backgroundColor:'rgba(255,255,255,0.6)',
    },
    opt:{
        padding:10
    }
})
export default Select