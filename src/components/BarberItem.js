import React from 'react'
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native'
import Stars from './Stars'

export default function BarberItem({data}) {
  return (
    <TouchableOpacity style={styles.Area}>

      <Image source={{uri: data.avatar}} style={styles.Avatar}/>

      <View style={styles.InfoArea}>
          <Text style={styles.UserName}> {data.name} </Text>

          <Stars stars={data.stars} showNumber={true}/>

          <TouchableOpacity style={styles.SeeProfileButton}>
                <Text style={styles.SeeProfileButtonText}>Ver Perfil</Text>
          </TouchableOpacity>
      </View>
       
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  Area: {
    backgroundColor: '#FFFFFF',
    marginBottom: 20,
    borderRadius: 20,
    padding: 15,
    flexDirection: 'row'
  },
  Avatar:{
      width: 88,
      height: 88,
      borderRadius: 20
  },
  InfoArea: {
      marginLeft: 20,
      justifyContent: 'space-between'
  },
  UserName: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  SeeProfileButton: {
    width: 85,
    height: 26,
    borderWidth: 1,
    borderColor: '#4EADBE',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5
  },
  SeeProfileButtonText: {
    fontSize: 13,
    color: '#268596'
  }
})