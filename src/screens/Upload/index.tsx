import React, { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import storage from '@react-native-firebase/storage';
import { Button } from '../../components/Button';
import { Header } from '../../components/Header';
import { Photo } from '../../components/Photo';

import { Container, Content, Progress, Transferred } from './styles';
import { Alert } from 'react-native';

export function Upload() {
  const [image, setImage] = useState('');
  const [bytesTrasnferred, setBytesTransferred]  = useState('');
  const [progress, setProgress] = useState('0');

  async function handlePickImage() {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status == 'granted') {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        aspect: [4, 4],
        quality: 1,
      });

      if (!result.cancelled) {
        setImage(result.uri);
      }
    }
  };

  async function handleUpload(){
    // criar um nome para o arquivo
    const fileName = new Date().getTime() // valor timestamp de data e hora do momento
    // pegar a extensão da imagem
    const MIME = image.match(/\.(?:.(?!\.))+$/)
    console.log(MIME)
    console.log(image)
    // pegar a referência de onde o arquivo vai ser salvo
    const reference = storage().ref(`/images/${fileName}${MIME}`)

    // uplaod
    // reference
    // .putFile(image)
    // .then(() => Alert.alert('Upload concluído!'))
    // .catch((error) => console.log(error))

    const uploadTask = reference.putFile(image)
    uploadTask.on('state_changed', taskSnapshot => {
      // percentual de total de bytes transeridos por total de bytes que contém o arquivo
      const percent = ((taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) * 100).toFixed(0)
      setProgress(percent)
      setBytesTransferred(`${taskSnapshot.bytesTransferred} tranferidos de ${taskSnapshot.totalBytes}`)
    })

    uploadTask.then(() => {
      Alert.alert('upload concluído com sucesso!!!')
    })
    
  }
  return (
    <Container>
      <Header title="Lista de compras" />

      <Content>
        <Photo uri={image} onPress={handlePickImage} />

        <Button
          title="Fazer upload"
          onPress={handleUpload}
        />

        <Progress>
          {progress}%
        </Progress>

        <Transferred>
          {bytesTrasnferred}
        </Transferred>
      </Content>
    </Container>
  );
}
