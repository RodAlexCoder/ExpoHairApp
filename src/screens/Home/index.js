import React , {useState, useEffect} from 'react'
import { View, Text, SafeAreaView, StyleSheet, Button,RefreshControl, TouchableOpacity, TextInput, ScrollView, Platform, ActivityIndicator} from 'react-native'
import SearchIcon from '../../assets/search.svg'
import MyLocationIcon from '../../assets/my_location.svg'
import {useNavigation} from '@react-navigation/native'
import * as Location from 'expo-location';
import api from '../../api'
import BarberItem from '../../components/BarberItem'


export default function Home() {
  const navigation = useNavigation()
  const [ locationText, setLocationText] = useState('')
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(false)
  const [list , setList] = useState([])
  const [refreshing, setRefreshing] = useState(false)

  const handleLocationFinder = async () => {
      setLocation(null)

      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        alert('Permissao Negada')
        return;
      }

      setLoading(true)
      setLocationText('')
      setList([])

      let location = await Location.getCurrentPositionAsync({});
      
      setLocation(location.coords);
      getBarbers()
  }

  const getBarbers = async () => {
      setLoading(true)
      setList([])

      let res = await api.getBarbers()
      console.log(res)

      if(res.error == ''){

        if(res.loc){
          setLocationText(res.loc)
        }
          setList(res.data)

      } else {
          alert('Erro:' , error)
      }

      setLoading(false)
  }

  useEffect(() => {
    getBarbers()
  }, [])

  const onRefresh = () => {
    setRefreshing(false)
    getBarbers()
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.Scroller} refreshControl={
        <RefreshControl  refreshing={refreshing} onRefresh={onRefresh}/>
      }>
        <View style={styles.HeaderArea}>
          <Text style={styles.headerTitle} numberOfLines={2}>Encontre o seu barbeiro favorito</Text>

          <TouchableOpacity style={styles.searchButton} onPress={()=> navigation.navigate('Search')}>
            <SearchIcon width='30' height='30' color='#FFF' />
          </TouchableOpacity>
        </View>


        <View style={styles.InputArea}>

        <TouchableOpacity onPress={handleLocationFinder}>
            <MyLocationIcon width='24' height='24' fill='#FFF'/>
        </TouchableOpacity>
          

          <TextInput
            placeholder='Onde você está'
            placeholderTextColor='#FFF'
            style={styles.textInput}
            value={locationText}
            onChangeText={ text => setLocationText(text)}
          />
        </View>

      {loading && <ActivityIndicator style={{marginTop: 30}} size='large' color='#FFF'/> }
      
      <View style={styles.listArea}>
        {list.map((item, key) => (
          <BarberItem key={key} data={item}/>
        ))}
      </View>

      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  InputArea: {
    width: '100%',
    height: 60,
    backgroundColor: '#4EADBE',
    flexDirection: 'row',
    borderRadius: 30,
    paddingHorizontal: '10',
    alignItems: 'center',
    marginTop: 15,
    paddingLeft: 15
  },

  textInput: {
    flex: 1,
    fontSize: 16,
    color: '#268596',
    marginLeft: 10
  },
  Scroller: {
    flex: 1,
    padding: 20
  },
  HeaderArea: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  headerTitle: {
    fontSize: 24, 
    fontWeight: 'bold',
    color: '#FFF',
    width: 250
  },
  searchButton: {
    width: 26,
    height: 26,
  },

  container: {
    backgroundColor: '#63c2d1',
    flex: 1
  },
  listArea: {
    marginVertical: 30
  }

})
