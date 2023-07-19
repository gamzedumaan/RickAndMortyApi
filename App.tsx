import {StyleSheet} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Character from './screens/Character/Character';
import Episodes from './screens/Episode/Episodes';
import Location from './screens/Location/Location';
import color from './constants/color';
import Icon from 'react-native-vector-icons/dist/Fontisto';
import Icon2 from 'react-native-vector-icons/dist/MaterialIcons';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Detail from './screens/Detail/Detail';
import LocationDetail from './screens/LocationDetail/LocationDetail';
import SignInScreen from './screens/SignIn/SignInScreen';
import SignUpScreen from './screens/SignUp/SignUpScreen';
import {Provider, useSelector} from 'react-redux';
import {store} from './redux/store';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const AllScreen = () => {
  const {loginStatus} = useSelector(state => state.user);
  return (
    <>
      <NavigationContainer>
        {loginStatus ? <TabStack /> : <RegisterStack />}
      </NavigationContainer>
    </>
  );
};
const RegisterStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
      <Stack.Screen name="SignInScreen" component={SignInScreen} />

    </Stack.Navigator>
  );
};
const MyStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Character" component={Character} />
      <Stack.Screen name="Detail" component={Detail} />
      <Stack.Screen name="LocationDetail" component={LocationDetail} />
    </Stack.Navigator>
  );
};
const TabStack = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarLabelStyle: {
          fontSize: 14,
          fontWeight: '700',
          color: color.primary2,
        },
        tabBarStyle: {backgroundColor: color.primary},
      }}>
      <Tab.Screen
        options={{
          tabBarIcon: () => (
            <Icon name="persons" size={24} color={color.primary2} />
          ),
        }}
        name="Charcter"
        component={MyStack}
      />

      <Tab.Screen
        name="Location"
        component={Location}
        options={{
          tabBarIcon: () => (
            <Icon2 name="my-location" size={24} color={color.primary2} />
          ),
        }}
      />
      <Tab.Screen
        name="Episodes"
        component={Episodes}
        options={{
          tabBarIcon: () => (
            <Icon name="film" size={24} color={color.primary2} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
export default function App() {
  return (
    <Provider store={store}>
      <AllScreen />
    </Provider>
  );
}

const styles = StyleSheet.create({});
