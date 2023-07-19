import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  FlatList,
  Image,
  TouchableOpacity,
  Modal,
  TextInput,
  useWindowDimensions,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import color from '../../constants/color';
import Icon2 from 'react-native-vector-icons/dist/MaterialIcons';

import Icon from 'react-native-vector-icons/dist/Fontisto';
import {useNavigation} from '@react-navigation/native';

export default function Location() {
  const windowHeight = useWindowDimensions().height;

  const [locationData, setlocationData] = useState([]);
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [filter, setFilter] = useState([]);

  function AllLocation() {
    fetch('https://rickandmortyapi.com/api/location')
      .then(res => res.json())
      .then(data => {
        setlocationData(data.results);
        setFilter(data.results);

        console.log(locationData);
      });
  }
  useEffect(() => {
    AllLocation();
  }, []);

  const Search = text => {
    const filterList = locationData.filter(({name}) => {
      const searchText = text.toLowerCase();
      const currenetTitle = name.toLowerCase();
      return currenetTitle.indexOf(searchText) > -1;
    });
    setFilter(filterList);
  };
  function ModalSearch() {
    setModalVisible(!modalVisible);
  }
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.iconContainer}>
        <Text style={styles.locationText}>Location</Text>
        <TouchableOpacity onPress={ModalSearch} style={styles.searchContainer}>
          <Icon name="search" size={24} color={color.primary2} />
        </TouchableOpacity>
      </View>
      <FlatList
        data={filter}
        keyExtractor={item => item.id}
        renderItem={({item}) => {
          return (
            <TouchableOpacity
              onPress={() => navigation.navigate('LocationDetail', item)}>
              <View style={styles.imageContainer}>
                <Image
                  style={styles.image}
                  source={require('./../../assets/images/images.jpeg')}
                />
              </View>
              <View style={styles.textsContainer}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.type}>{item.type}</Text>
              </View>
            </TouchableOpacity>
          );
        }}
      />
      <Modal  transparent
        visible={modalVisible}
        onRequestClose={setModalVisible}>
        <View
          style={{
            height: windowHeight,
            justifyContent: 'flex-end',
            alignItems: 'center',
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <TextInput
              placeholder="Search Character"
              style={styles.input}
              onChangeText={Search}
            />
            <TouchableOpacity onPress={() => ModalSearch()}>
              <Icon2 name="cancel" size={24} color={color.primary5} />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
  },
  input: {
    margin: 10,
    padding: 10,
    borderRadius: 20,
    backgroundColor: color.primary5,
  },
});
