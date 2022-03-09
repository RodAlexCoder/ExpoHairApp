import React from 'react'
import {View, Text, StyleSheet} from 'react-native'

import StarFull from '../assets/star.svg'
import StarHalf from '../assets/star_half.svg'
import StarEmpty from '../assets/star_empty.svg'


export default  function Stars({stars, showNumbers}) {
    let s = [0 , 0 , 0 , 0 , 0 ]
    let floor = Math.floor(stars)
    let left = stars - floor

    for(var i = 0; i<floor; i++){
        s[i] = 2
    } 

    if(left > 0){
        s[i] = 1
    }

  return (
    <View style={styles.StarArea}>
        {s.map((i, k) => (
            <View key={k}>
                {i === 0 && <StarEmpty width='18' height='18' fill='#ff9200'/>}
                {i === 1 && <StarHalf width='18' height='18' fill='#ff9200'/>}
                {i === 2 && <StarFull width='18' height='18' fill='#ff9200'/>}
            </View>
        ))}

          {!showNumbers && <Text style={styles.StartText}>{stars}</Text>}
    </View>
  )
}

const styles = StyleSheet.create({
    StarArea: {
        flexDirection: 'row'
    },
    StartText: {
        fontSize: 12,
        fontWeight: 'bold',
        marginLeft: 5,
        color: '#737373',
    }
})
