import * as React from 'react';
import { View, Platform, StatusBar } from 'react-native';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { FontAwesome, Ionicons } from '@expo/vector-icons'
import  Constants  from 'expo-constants'

import AddEntry from './components/AddEntry'
import History from './components/History'
import EntryDetail from './components/EntryDetail'

import reducer from './reducers'

import { purple, white } from './utils/helpers'

const RouteConfigs = {
  History:{
    name: 'History',
    component: History,
    options: {
      tabBarIcon: ({tintColor}) => <Ionicons name='ios-bookmarks' size={30} color={tintColor} />
    }
  },
  AddEntry:{
    name: 'Add Entry',
    component: AddEntry,
    options: {
      tabBarIcon: ({tintColor}) => <FontAwesome name='plus-square' size={30} color={tintColor} />
    }
  }
}

function UdaciStatusBar ({backgroundColor, ...props}) {
  return (
    <View style={{ height: Constants.statusBarHeight }}>
      <StatusBar  backgroundColor={backgroundColor} barStyle='default'  {...props} />
    </View>
  )
}

const Tab = createBottomTabNavigator()

const TabNav = () => (
  <Tab.Navigator>
      <Tab.Screen {...RouteConfigs['History']} />
      <Tab.Screen {...RouteConfigs['AddEntry']} />
  </Tab.Navigator>
)

const Stack = createStackNavigator();

const MainNav = () => (
  <Stack.Navigator headerMode="screen">
      <Stack.Screen
          name="Home"
          component={TabNav}
          options={{headerShown: false}}/>
      <Stack.Screen
          name="EntryDetail"
          component={EntryDetail}
          options={{
              headerTintColor: white, 
              headerStyle: {
                  backgroundColor: purple,
              }
          }}/>
  </Stack.Navigator>
);

let store = createStore(reducer)

export default class App extends React.Component {
  render () {
    return (
      <Provider store={store}>
        <View style={{flex:1}}>
          <UdaciStatusBar backgroundColor={purple} translucent={true} />
          <NavigationContainer>
            <MainNav/>
          </NavigationContainer>
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