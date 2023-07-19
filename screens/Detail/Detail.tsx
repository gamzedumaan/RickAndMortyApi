import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewBase,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import color from '../../constants/color';
import Icon from 'react-native-vector-icons/dist/FontAwesome5';
import {useNavigation} from '@react-navigation/native';

export default function Detail({route}) {
  console.log(route.params);
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.iconContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="chevron-left" size={24} color={color.primary2} />
        </TouchableOpacity>
      </View>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={{uri: route.params.image}} />
      </View>
      <View />
      <View style={{marginLeft: 40}}>
        <Text style={styles.name}>{route.params.name}</Text>
      </View>
      <View style={{flex: 1, marginTop: 20, alignItems: 'center'}}>
        <View style={styles.detailArea}>
          <View style={styles.statusContainer}>
            <Text style={styles.title}>Status :</Text>
            <Text style={styles.status}>{route.params.status}</Text>
          </View>
          <View style={styles.speciesContainer}>
            <Text style={styles.title}>Species :</Text>
            <Text style={styles.species}>{route.params.species}</Text>
          </View>
          <View style={styles.genderContainer}>
            <Text style={styles.title}>Gender :</Text>
            <Text style={styles.gender}>{route.params.gender}</Text>
          </View>
          <View style={styles.orignContainer}>
            <Text style={styles.title}>Orign :</Text>
            <Text style={styles.origin}>{route.params.origin.name}</Text>
          </View>
          <View style={styles.locationContainer}>
            <Text style={styles.title}>Location :</Text>
            <Text style={styles.location}>{route.params.location.name}</Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.primary,
  },
  iconContainer: {
    margin: 5,
  },
  image: {
    height: '90%',
    width: '85%',
    resizeMode: 'contain',
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  name: {
    fontSize: 30,
    fontWeight: '600',
    color: color.primary4,
  },
  detailArea: {
    width: '80%',
    borderWidth: 1,
    borderColor: color.primary4,
    borderRadius: 10,
  },
  status: {
    padding: 5,
    margin: 5,
    color: color.primary2,
    fontSize: 14,
  },
  species: {
    padding: 5,
    margin: 5,
    color: color.primary2,
    fontSize: 14,
  },
  gender: {
    padding: 5,
    margin: 5,
    color: color.primary2,
    fontSize: 14,
  },
  origin: {
    padding: 5,
    margin: 5,
    color: color.primary2,
    fontSize: 14,
  },
  location: {
    padding: 5,
    margin: 5,
    color: color.primary2,
    fontSize: 14,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  speciesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  genderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  orignContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    color: color.primary4,
    fontSize: 16,
    margin: 5,
  },
});
