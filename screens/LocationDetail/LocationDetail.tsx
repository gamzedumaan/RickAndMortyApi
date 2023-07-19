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
import React, {useState, useEffect} from 'react';
import color from '../../constants/color';
import Icon from 'react-native-vector-icons/dist/FontAwesome5';
import {useNavigation} from '@react-navigation/native';
import Icon2 from 'react-native-vector-icons/dist/MaterialIcons';

export default function LocationDetail({route}) {
  const windowHeight = useWindowDimensions().height;

  const [characterData, setCharacterData] = useState(null);
  const [filter, setFilter] = useState('');
  const [modalVisible, setmodalVisible] = useState(false);
  console.log(route.params);
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
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.iconContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="chevron-left" size={24} color={color.primary2} />
        </TouchableOpacity>
      </View>
      <Image
        style={styles.image}
        source={require('./../../assets/images/images.jpeg')}
      />
      <View style={{flex: 1}}>
        <View style={styles.imageContainer} />
        <Text style={styles.name}>{route.params.name}</Text>
        <View style={{alignItems: 'center', justifyContent: 'center'}}>
          <View style={styles.detailArea}>
            <View style={styles.statusContainer}>
              <Text style={styles.type}>Type :</Text>
              <Text style={styles.typeText}>{route.params.type}</Text>
            </View>
            <View style={styles.statusContainer}>
              <Text style={styles.dimension}>Dimension :</Text>
              <Text style={styles.dimensionText}>{route.params.dimension}</Text>
            </View>
          </View>
        </View>
        <View>
          <Text style={styles.residentsText}>Residents :</Text>
        </View>
        <FlatList
          horizontal
          data={filter}
          keyExtractor={item => item.id}
          renderItem={({item}) => {
            return (
              <>
                <Image style={styles.images} source={{uri: item.image}} />
              </>
            );
          }}
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
  iconContainer: {
    zIndex: 1,
    position: 'absolute',
    marginTop: 22,
  },
  image: {
    flex: 1,
    width: '100%',
    borderBottomLeftRadius: 40,
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  detailArea: {
    width: '80%',
    borderWidth: 1,
    borderColor: color.primary4,
    borderRadius: 10,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  name: {
    fontSize: 30,
    fontWeight: '700',
    color: color.primary,
    marginHorizontal: 37,
    marginTop: 20,
    marginBottom: 10,
  },
  type: {
    color: color.primary5,
    padding: 5,
    margin: 5,
    fontSize: 14,
  },
  typeText: {
    color: color.primary3,
    padding: 5,
    margin: 5,
    fontSize: 14,
  },
  dimension: {
    color: color.primary5,
    padding: 5,
    margin: 5,
    fontSize: 17,
  },
  dimensionText: {
    color: color.primary3,
    padding: 5,
    margin: 5,
    fontSize: 15,
  },
  images: {
    height: 40,
    width: 40,
    margin: 10,
    borderRadius: 10,
  },
  residentsText: {
    color: color.primary5,
    padding: 5,
    margin: 5,
    fontSize: 17,
    marginLeft: 40,
  },
});
