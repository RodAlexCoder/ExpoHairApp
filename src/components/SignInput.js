import React from 'react'
import {View, StyleSheet, TextInput} from 'react-native'

export default function SignInput({IconSvg, placeholder, value, onChangeText, password}) {
  return (
    <View style={styles.InputArea}>
        <IconSvg width='24' height='24' fill='#268596' />

        <TextInput 
        style={styles.textInput} 
        placeholder={placeholder} 
        placeholderTextColor='#268596'
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={password}
        />
    </View>
  )
}

const styles = StyleSheet.create({
    InputArea: {
        width: '100%',
        height: 60,
        backgroundColor: '#83d6e3',
        flexDirection: 'row',
        borderRadius: 30,
        paddingHorizontal: '10',
        alignItems: 'center',
        marginBottom: 15,
    },

    textInput: {
        flex: 1,
        fontSize: 16,
        color: '#268596',
        marginLeft: 10
    }
})
