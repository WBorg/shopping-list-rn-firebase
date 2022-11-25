import React from 'react'

import { Container, Account, Title, Subtitle } from './styles'
import { ButtonText } from '../../components/ButtonText'
import { Button } from '../../components/Button'
import { Input } from '../../components/Input'
import auth from '@react-native-firebase/auth'

import { useNavigation } from '@react-navigation/native';


export function SignIn() {

  const navigation = useNavigation()

  
  function handleSignIn() {
    auth()
      .signInWithEmailAndPassword('wilicious@gmail.com', '123123')
      .then(() => {
        console.log('Deu tudo certo')
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!')
        }

        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!')
        }

        console.error(error)
      })
  }
  return (
    <Container>
      <Title>MyShopping</Title>
      <Subtitle>monte sua lista de compra te ajudar nas compras</Subtitle>

      <Input placeholder="e-mail" keyboardType="email-address" />

      <Input placeholder="senha" secureTextEntry />

      <Button title="Entrar" onPress={handleSignIn} />

      <Account>
        <ButtonText title="Recuperar senha" onPress={() => {}} />
        <ButtonText title="Criar minha conta" onPress={() => {navigation.navigate('SiginUp')}} />
      </Account>
    </Container>
  )
}
