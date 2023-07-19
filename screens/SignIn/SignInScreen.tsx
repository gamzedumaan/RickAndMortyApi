import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import color from '../../constants/color';
import AntDesign from 'react-native-vector-icons/dist/AntDesign';
import {useNavigation} from '@react-navigation/native';
import {signInWithEmailAndPassword} from 'firebase/auth';
import {auth} from '../../config/firebase';
import {useDispatch} from 'react-redux';
import Snackbar from 'react-native-snackbar';
import {setLogin} from '../../redux/slice/users';

export default function SignInScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const handleSubmit = async () => {
    if (email && password) {
      try {
        await signInWithEmailAndPassword(auth, email, password);
        dispatch(setLogin(true));
      } catch (e) {
        Snackbar.show({
          text: e.message,
          backgroundColor: 'red',
        });
      }
    } else {
      Snackbar.show({
        text: 'Email and Password are required!',
        backgroundColor: 'red',
      });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.textsContainer}>
        <Text style={styles.noAccountText}>No account?</Text>
        <TouchableOpacity style={() => navigation.navigate('SignUpScreen')}>
          <Text style={styles.signText}>sign up</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.bottomWithContainer}>
        <View style={styles.bottomWith} />
      </View>
      <View style={{marginTop: '35%', justifyContent: 'center'}}>
        <View style={{marginLeft: 20}}>
          <Text style={styles.loginText}>Login</Text>
          <Text style={styles.gladText}>Glad see you back</Text>
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
      </View>
      <View style={styles.nextContainer}>
        <TouchableOpacity>
          <Text style={styles.forgetText}>Forget Password?</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.nextButton} onPress={handleSubmit}>
          <AntDesign name="arrowright" size={20} color="black" />
        </TouchableOpacity>
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
    width: '38%',
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: 10,
  },
  nextButton: {
    height: 40,
    width: 40,
    borderWidth: 1,
    borderColor: color.primary3,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
  },
  forgetText: {
    fontWeight: 'bold',
  },
});
