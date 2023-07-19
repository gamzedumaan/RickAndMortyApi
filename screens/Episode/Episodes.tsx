import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  FlatList,
  Image,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import color from '../../constants/color';

import Icon from 'react-native-vector-icons/dist/Fontisto';

export default function Episodes() {
  const [episodes, setEpisodes] = useState(null);
  function AllEpisodes() {
    fetch('https://rickandmortyapi.com/api/episode')
      .then(res => res.json())
      .then(data => {
        setEpisodes(data.results);
        console.log(episodes);
      });
  }
  useEffect(() => {
    AllEpisodes();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={episodes}
        keyExtractor={item => item.id}
        renderItem={({item}) => {
          return (
            <View style={styles.boxs}>
              <View style={styles.textsContainer}>
                <View style={styles.texts}>
                  <Text style={styles.name}>{item.name}</Text>
                  <Text style={styles.type}>{item.air_date}</Text>
                  <Text style={styles.type}>{item.episode}</Text>
                </View>
              </View>
            </View>
          );
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.primary2,
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 10,
  },
  locationText: {
    fontSize: 30,
    fontWeight: '700',
    color: color.primary,
  },
  searchContainer: {
    height: 35,
    width: 35,
    backgroundColor: color.primary,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  image: {
    borderRadius: 20,
    width: '90%',
    height: 200,
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  name: {
    fontSize: 18,
    fontWeight: '700',
  },
  textsContainer: {
    marginLeft: 23,
    margin: 10,
    backgroundColor: color.primary5,
    height: 90,
    borderRadius: 20,
  },
  texts: {
    margin: 5,
  },
});
