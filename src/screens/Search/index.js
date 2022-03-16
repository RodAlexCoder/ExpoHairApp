import React, {useState} from 'react'
import {View, SafeAreaView, Text,TextInput, StyleSheet, ScrollView, ActivityIndicator} from 'react-native'
import BarberItem from '../../components/BarberItem'
import api from '../../api'


export default function Search() {

  const [searchText, setSearchText] = useState('')
  const [loading, setLoading] = useState(false)
  const [empty, setEmpty] = useState(false)
  const [list, setList] = useState([])

  const searchBarbers =  async () => {
      setLoading(true)
      setList([])
      setEmpty(false)

      if(searchText != ''){
          let res = await api.search(searchText)
          if(res.error == ''){
            if(res.list.length > 0){
               setList(res.list)
            }else {
              setEmpty(true)
            }
           
          }else{
            alert('Erro: ' + res.error)
          }
      }

      setLoading(false)
  }

  return (
    <SafeAreaView style={styles.container}>
        <View style={styles.searchArea}>
          
            <TextInput
            style={styles.searchInput} 
            placeholder='Digite o nome do barbeiro'
            placeholderTextColor='#FFFFFF'
            value={searchText}
            onChangeText={text => setSearchText(text)}
            onEndEditing={searchBarbers}
            returnKeyType='search'
            autoFocus
            selectTextOnFocus
            />
        </View>

        <ScrollView style={styles.Scroller} 
>
            {loading && 
            <ActivityIndicator  style={styles.loadingIcon} 
            size='large' color= '#000000'/>}

            {empty && <Text style={{textAlign: 'center', marginTop: 30, color: '#FFF', fontSize: 20}}>Não Encontrei barbeiros com o nome {searchText}</Text>}

            <View  style={styles.listArea} 
>
                {list.map((item, key) => (
                    <BarberItem key={key} data={item}/>
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
