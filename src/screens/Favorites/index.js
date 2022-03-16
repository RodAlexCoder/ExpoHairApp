import React, { useState, useEffect } from 'react'
import { View, SafeAreaView, Text, TextInput, StyleSheet, ScrollView, ActivityIndicator , RefreshControl} from 'react-native'
import BarberItem from '../../components/BarberItem'
import api from '../../api'


export default function Search() {

  const [loading, setLoading] = useState(false)
  const [list, setList] = useState([])

  useEffect(()=> {
      getFavorites()
  }, [])

  const getFavorites = async () => {
    setLoading(true)
    setList([])

    let res= await api.getFavorites()
    if(res.error == ''){
      if(res.list.length > 0){
        setList(res.list)
      }else {
        alert('Error' + res.error)
      }
    }

    setLoading(false)

  }


  return (
    <SafeAreaView style={styles.container}>

      <View style={{
        height: 40,
        justifyContent: 'center'
      }}>
        <Text style={{
          paddingHorizontal: 20,
          paddingVertical: 0,
          fontSize: 18,
          color: '#FFFFFF',
          fontWeight: 'bold',
          textAlign: 'left'
        }}
        >Favoritos</Text>
      </View>

      <ScrollView style={styles.Scroller}
      refreshControl={
        <RefreshControl refreshing={loading} onRefresh={getFavorites}/>
      }
      >

        {!loading  && list.length === 0 &&
          <Text style={{textAlign: 'center', marginTop: 30, color: '#FFF', fontSize: 20}}>Não há favoritos</Text>
        }
        <View style={styles.listArea}
        >
          {list.map((item, key) => (
            <BarberItem key={key} data={item} />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#63c2d1'
  },
  searchArea: {
    backgroundColor: '#4eadbe',
    height: 40,
    borderRadius: 20,
    paddingLeft: 30,
    margin: 20
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#FFFFFF'
  },
  Scroller: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 10
  },
  loadingIcon: {
    marginTop: 30
  },
  listArea: {
    marginVertical: 20
  }
})
