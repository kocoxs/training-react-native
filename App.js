import * as React from 'react';
import { View, Text, Slider, Switch, TextInput  } from 'react-native';
import AddEntry from './components/AddEntry'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'
import  History from './components/History'

let store = createStore(reducer)

export default class App extends React.Component {
  render () {
    return (
      <Provider store={store}>
        <View style={{flex:1}}>
          <History />
        </View>
      </Provider>
    )
  }
}
 /*  */
/** 
 * 
 *  <TouchableHighlight style={ {backgroundColor: '#82445a', padding: 10, borderRadius:10, } }  onPress={this.handlePress} underlayColor='#d42771'>
          <Text>Click higlight</Text>
        </TouchableHighlight>

        <TouchableOpacity style={ {backgroundColor: '#884455', padding: 10, borderRadius:10, } }  onPress={this.handlePress}>
          <Text>Click opacity</Text>
        </TouchableOpacity>

        <TouchableWithoutFeedback onPress={this.handlePress}>
          <View style={ {backgroundColor: '#a84F55', padding: 10, borderRadius:10, } }>
            <Text>Click sin feedbac</Text>
          </View>
        </TouchableWithoutFeedback>

        <TouchableNativeFeedback onPress={this.handlePress}>
          <View style={ {backgroundColor: '#ae0F5c', padding: 10, borderRadius:10, } }>
            <Text>Click nativo feedbac</Text>
          </View>
        </TouchableNativeFeedback>

        <Slider 
          minimumValue={-10}
          maximumValue={10}
          step={1}
          value={this.state.value}
          onValueChange={(value) => this.setState(() => ({value}))}
        />
        <Text>
          value: {this.state.value}
        </Text>


        <Switch 
          value={showInput}
          onValueChange={this.toggle}
        />

        {
          showInput === true && (
            <TextInput 
              value = {input}
              onChange = {this.textChange}
            />
          )
        }
 * 
 */