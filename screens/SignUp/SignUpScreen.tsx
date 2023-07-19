import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, {useState} from 'react';
import color from '../../constants/color';
import Snackbar from 'react-native-snackbar';
import {createUserWithEmailAndPassword} from 'firebase/auth';
import {auth} from '../../config/firebase';
import { useNavigation } from '@react-navigation/native';
export default function SignUpScreen() {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = async () => {
    if (email && password) {
      await createUserWithEmailAndPassword(auth, email, password);
    } else {
      Snackbar.show({
        text: 'Email and Password are required!',
        textColor: 'black',
        backgroundColor: 'red',
        duration: Snackbar.LENGTH_SHORT,

      });
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.textsContainer}>
        <Text style={styles.noAccountText}>Have an account?</Text>
        <TouchableOpacity onPress={()=>navigation.navigate('SignInScreen')}>
          <Text style={styles.signText}>login</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.bottomWithContainer}>
        <View style={styles.bottomWith} />
      </View>
      <View style={{marginTop: '20%', justifyContent: 'center'}}>
        <View style={{marginLeft: 20}}>
          <Text style={styles.loginText}>Sign Up</Text>
          <Text style={styles.gladText}>Welcome</Text>
        </View>
        <TextInput
          value={email}
          onChangeText={setEmail}
          placeholder="Email address"
          style={styles.input}
        />
        <TextInput
          keyboardType="numeric"
          maxLength={8}
          secureTextEntry={true}
          placeholder="Password"
          style={styles.input}
          value={password}
          onChangeText={setPassword}
        />
        <TextInput
          keyboardType="numeric"
          maxLength={8}
          secureTextEntry={true}
          placeholder="Confirm password"
          style={styles.input}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
      </View>
      <View style={styles.nextContainer}>
        <TouchableOpacity onPress={handleSubmit} style={styles.nextButton}>
          <Text style={styles.signUpText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.orsignTextContainer}>
        <Text style={styles.orsignText}>Or sign up with</Text>
      </View>
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={require('../../assets/images/google.png')}
        />
        <Image
          style={styles.image}
          source={require('../../assets/images/facebook.png')}
        />
        <Image
          style={styles.image}
          source={require('../../assets/images/apple.png')}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.primary2,
  },
  textsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    margin: 10,
  },
  noAccountText: {
    fontWeight: 'bold',
  },
  signText: {
    fontWeight: 'bold',
    color: color.primary,
  },
  bottomWithContainer: {
    justifyContent: 'flex-end',
    flexDirection: 'row',
    marginRight: 10,
  },
  bottomWith: {
    width: '45%',
    height: 2,
    backgroundColor: color.primary3,
    borderRadius: 20,
  },
  loginText: {
    fontSize: 25,
    color: color.primary3,
    fontWeight: '600',
    marginTop: 10,
  },
  gladText: {
    fontSize: 18,
    fontWeight: '700',
    marginTop: 10,
  },
  input: {
    margin: 10,
    padding: 15,
    backgroundColor: color.primary6,
    borderRadius: 20,
  },
  nextContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
  },
  nextButton: {
    height: 35,
    width: 100,
    backgroundColor: color.primary3,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
  },
  forgetText: {
    fontWeight: 'bold',
  },
  signUpText: {
    fontSize: 17,
    fontWeight: '700',
    color: color.primary2,
  },
  orsignTextContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 25,
  },
  image: {
    height: 35,
    width: 35,
  },
});
