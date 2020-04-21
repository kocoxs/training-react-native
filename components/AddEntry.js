import React, {Component} from 'react'
import { 
    View, 
    Text, 
    TouchableOpacity,
    Platform,
    StyleSheet 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons'
import { connect } from 'react-redux'
import { CommonActions } from '@react-navigation/native';

import { 
    getMetricMetaInfo, 
    timeToString, 
    getDailyReminderValue, 
    clearLocalNotification, 
    setLocalNotification 
} from '../utils/helpers'
import { submitEntry, removeEntry } from '../utils/api'
import { white, purple } from '../utils/colors';
import { addEntry } from '../actions'

import UdaciSlider from './UdaciSlider'
import UdaciSteper from './UdaciSteper'
import DateHeader from './DateHeader'
import TextButton from './TextButton'

function SubmitBtn ({ onPress }){
    return (
    
    <TouchableOpacity
        style={ Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.androidSubmitBtn }    
        onPress={onPress}
        >
            <Text style={ styles.submitBtnText }>Guardar</Text>
    </TouchableOpacity>)
}

class AddEntry extends Component {
    state = {
        run: 0,
        bike: 0,
        swim: 0,
        sleep: 0,
        eat: 0,
    }

    increment = (metric) => {
        const { max, step } = getMetricMetaInfo(metric)
        this.setState((state) => {
            const count = state[metric] + step
            return {
                ...step,
                [metric]: count > max ? max : count
            }
        })
    }

    decrement = (metric) => {
        const { step } = getMetricMetaInfo(metric)
        this.setState((state) => {
            const count = state[metric] - step
            return {
                ...step,
                [metric]: count < 0 ? 0 : count
            }
        })
    }

    slide = (metric, value) => {
        this.setState(() => ({
            [metric]: value
        }))
    }

    submit = () => {
        const key = timeToString();
        const entry = this.state;

        //update redux
        this.props.dispatch(addEntry({
            [key]: entry
        }))

        this.setState(() => ({
            run: 0,
            bike: 0,
            swim: 0,
            sleep: 0,
            eat: 0,
        }))

        //save to DB
        submitEntry({key, entry})
        //go home
        this.toHome()
        
        clearLocalNotification()
            .then(setLocalNotification)
    }

    reset = () => {
        const key = timeToString()
        //updare redux
        this.props.dispatch(addEntry({
            [key]: getDailyReminderValue()
        }))
        //Update "DB"
        removeEntry(key)
        //route to home
        this.toHome()
    }

    toHome = () => {
        this.props.navigation.dispatch(
            CommonActions.goBack({
                key: 'AddEntry',
            }))
    }

    render() {
        const metainfo = getMetricMetaInfo();
        
        if(this.props.alreadyLogged){
            return(
                <View style={styles.center}>
                    <Ionicons 
                        name={Platform.OS === 'ios' ? 'ios-happy': 'md-happy'}
                        size={100}
                    />
                    <Text>Ya ingresaste la informacion por hoy</Text>
                    <TextButton style={{padding:10}} onPress={this.reset}>
                        Reset
                    </TextButton>
                </View>
            )
        }

        return (
            <View style={styles.container}>
                <DateHeader date={(new Date()).toLocaleDateString()} />
                {Object.keys(metainfo).map((key) => {
                    const { getIcon, type, ...rest} = metainfo[key]
                    const value = this.state[key]
                    return (
                        <View key={key} style={styles.row}>
                            { getIcon() }
                            { type === 'slider'
                                ?   <UdaciSlider 
                                        value={value}
                                        onChange={(value) => this.slide(key, value) }
                                        {...rest}
                                    />
                                :   <UdaciSteper 
                                        value={value}
                                        onIncrement={() => this.increment(key)}
                                        onDecrement={() => this.decrement(key)}
                                        {...rest}
                                    />
                            }
                        </View>
                    )
                })}
                <SubmitBtn onPress={this.submit}></SubmitBtn>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: white
    },
    row: {
      flexDirection: 'row',
      flex: 1,
      alignItems: 'center'  
    },
    iosSubmitBtn: {
        backgroundColor: purple,
        padding: 10,
        borderRadius: 7,
        height: 45,
        marginLeft: 40,
        marginRight: 40,
    },
    androidSubmitBtn: {
        backgroundColor: purple,
        padding: 10,
        paddingLeft: 30,
        paddingRight: 30,
        height: 45,
        borderRadius: 2,
        alignSelf: 'flex-end',
        justifyContent: 'center',
        alignItems: 'center'
    },
    submitBtnText: {
        color: white,
        fontSize: 22,
        textAlign: 'center'
    },
    center:{
        flex:1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

function mapStateToProps (state) {
    const key = timeToString()

    return {
        alreadyLogged: state[key] && typeof state[key].today === 'undefined'
    }
}

export default connect(mapStateToProps)(AddEntry)