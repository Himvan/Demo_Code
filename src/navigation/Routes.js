import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Listing from 'Demo/src/screens/Listing';

const OnBoardingStack = createStackNavigator();

const MyStack = () => {
  return (
    <OnBoardingStack.Navigator>
      <OnBoardingStack.Screen
        name="listing"
        component={Listing}
        options={{
          headerShown: true,
          headerTitle: 'Song',
          headerStyle: {backgroundColor: '#327AC8'},
          headerTintColor: '#E7EFF7'
        }}
      />
    </OnBoardingStack.Navigator>
  );
};

const Routes = MyStack;

export default Routes;
