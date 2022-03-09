import React , {useState}from 'react'
import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity } from 'react-native'
import {useNavigation} from '@react-navigation/native'


import BarberLogo from '../../assets/BarberLogo.svg'
import SignInput from '../../components/SignInput'
import EmailIcon from '../../assets/email.svg'
import LockIcon from '../../assets/lock.svg'


export default function SignIn() {

  const navigation = useNavigation()

  const [emailField, setEmailField] = useState('')
  const [passwordField, setPasswordField] = useState('')


  const handleMessageButtonClick = () => {
    //Não deixa o usuario voltar para a tela, sem efetuar o login
      navigation.reset({
        routes: [{name: 'SignUp'}]
      })
  }

  const handleSignClick = () => {

  }


  return (
    <SafeAreaView style={styles.container}>
      <BarberLogo width='100%' height='160' />

      <View style={styles.inputArea}>

        <SignInput 
        IconSvg={EmailIcon} 
        placeholder='Digite seu email'
        value={emailField}
        onChangeText={text => setEmailField(text)}
        password={false}

        />


        <SignInput 
        IconSvg={LockIcon}
        placeholder='Digite sua senha'
        value={passwordField}
        onChangeText={text => setPasswordField(text)}
        password={true}

        />
        

          <TouchableOpacity style={styles.customButton} onPress={handleSignClick}>
            <Text style={styles.customButtonText}>LOGIN</Text>
          </TouchableOpacity>

      </View>

    <TouchableOpacity style={styles.SignMessageButton} onPress={handleMessageButtonClick}>
        <Text style={styles.SignMessageButtonText}>Ainda não possui uma conta?</Text>
        <Text style={styles.SignMessageButtonTextBold}>Cadastre-se</Text>
    </TouchableOpacity>
   


    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#63c2d1',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },

  inputArea:{
    padding: 40,
    width: '100%'
  },

  customButton: {
    height: 60,
    backgroundColor: '#268596',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center'
  },

  customButtonText: {
    fontSize: 18,
    color: '#FFF'
  },

  SignMessageButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 50,
    marginBottom: 20
  },

  SignMessageButtonText: {
    fontSize: 16,
    color: '#268596'
  },

  SignMessageButtonTextBold: {
    fontSize: 16,
    color: '#268596',
    fontWeight: 'bold',
    marginLeft: 5
  }
})