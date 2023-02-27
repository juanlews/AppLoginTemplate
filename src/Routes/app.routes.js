import React, {useState, useEffect} from 'react';
import {createStackNavigator} from '@react-navigation/stack'
import Home from '../Pages/Home'
const AppStack = createStackNavigator();

export default () => {
    return (
      <AppStack.Navigator>
        <AppStack.Screen name='Home' component={Home}/>
      </AppStack.Navigator>
    );
};
