import {
  StyleSheet,
  Text,
  View,
  FlatList,
  SafeAreaView,
  Image,
  TouchableOpacity,
  Modal,
  TextInput,
  useWindowDimensions,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/dist/Fontisto';
import Icon2 from 'react-native-vector-icons/dist/MaterialIcons';

import color from '../../constants/color';
import {useNavigation} from '@react-navigation/native';

export default function Character() {
  const windowHeight = useWindowDimensions().height;
  const [characterData, setCharacterData] = useState(null);
  const [filter, setFilter] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();
  const AllCharacter = () => {
    fetch('https://rickandmortyapi.com/api/character')
      .then(res => res.json())
      .then(data => {
        setCharacterData(data.results);
        setFilter(data.results);
        console.log(data);
      });
  };

  useEffect(() => {
    AllCharacter();
  }, []);

  const Search = text => {
    const filterList = characterData.filter(({name}) => {
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
        <Icon name="persons" size={24} color={color.primary} />
        <TouchableOpacity onPress={ModalSearch}>
          <View style={styles.searchContainer}>
            <Icon name="search" size={24} color={color.primary2} />
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.charactersText}>Characters</Text>
        <Text style={styles.mainText}>Main characters</Text>
      </View>
      <FlatList
        horizontal
        data={filter}
        keyExtractor={item => item.id}
        renderItem={({item, index}) => {
          return (
            <TouchableOpacity
              style={{padding: 10}}
              onPress={() =>
                navigation.navigate('Detail', item, {
                  customColor: index % 1 === 1 ? '#D5D41D' : '#E08440',
                })
              }>
              <Image style={styles.image} source={{uri: item.image}} />
              <Text style={styles.nameText}>{item.name}</Text>
              <Text style={styles.speciesText}>{item.species}</Text>
            </TouchableOpacity>
          );
        }}
      />
      <Modal
        transparent
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
  searchContainer: {
    height: 35,
    width: 35,
    backgroundColor: color.primary,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  textContainer: {
    marginTop: 60,
    marginHorizontal: 20,
  },
  charactersText: {
    fontSize: 30,
    fontWeight: '700',
    color: color.primary,
  },
  mainText: {
    fontSize: 18,
    fontWeight: '500',
    marginTop: 20,

    color: color.primary3,
  },
  image: {
    height: 200,
    width: 170,
    borderRadius: 20,
  },
  nameText: {
    fontWeight: '700',
    fontSize: 16,
  },
  speciesText: {
    fontWeight: '500',
    fontSize: 15,
  },
  titleImage: {
    borderRadius: 20,
    position: 'absolute',
  },
  imagecontainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50,
    resizeMode: 'contain',
    borderRadius: 10,
  },
  coomingTextContainer: {
    marginTop: 10,
    marginLeft: 53,
  },
  coomingText: {
    fontSize: 23,
    fontWeight: '700',
    color: 'blue',
    zIndex: 1,
    position: 'absolute',
    marginTop: 10,
  },
  input: {
    margin: 10,
    padding: 10,
    borderRadius: 20,
    backgroundColor: color.primary5,
  },
});
