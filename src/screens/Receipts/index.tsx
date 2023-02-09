import React, { useState, useEffect, useCallback } from 'react'
import { FlatList, Alert } from 'react-native'
import storage from '@react-native-firebase/storage'
import { Container, PhotoInfo } from './styles'
import { Header } from '../../components/Header'
import { Photo } from '../../components/Photo'
import { File, FileProps } from '../../components/File'
import { useFocusEffect } from '@react-navigation/native'

// import { photosData } from '../../utils/photo.data';

export function Receipts() {
  const [photos, setPhotos] = useState<FileProps[]>([])
  const [photoSelected, setPhotSelected] = useState('')
  const [photoInfo, setPhotoInfo] = useState('')

  async function handleShowImage(path: string) {
    const urlImage = await storage().ref(path).getDownloadURL()
    setPhotSelected(urlImage)
    // trazendo informações do arquivo
    const info = await storage().ref(path).getMetadata()
    setPhotoInfo(
      `Upload realizado em  ${info.timeCreated}  \nTamanho: ${info.size} bytes`
    )
  }
  async function handlDeleteImage(path: string) {
    storage()
      .ref(path)
      .delete()
      .then(() => {
        Alert.alert('Imagem excluída copm sucesso!!')
        fetchImages()
        setPhotSelected('')
        setPhotoInfo('')
      })
      .catch(error => console.log(error))
  }
  async function fetchImages() {
    storage()
      .ref('images')
      .list()
      .then(result => {
        const files: FileProps[] = []

        result.items.forEach(file => {
          files.push({
            name: file.name,
            path: file.fullPath
          })

          setPhotos(files)
        })
      })
  }

  useEffect(() => {
    fetchImages()
  }, [])

  useFocusEffect(
    useCallback(() => {
      fetchImages()
    }, [])
  )

  return (
    <Container>
      <Header title="Comprovantes" />

      <Photo uri={photoSelected} />

      <PhotoInfo>{photoInfo}</PhotoInfo>

      <FlatList
        data={photos}
        keyExtractor={item => item.name}
        renderItem={({ item }) => (
          <File
            data={item}
            onShow={() => handleShowImage(item.path)}
            onDelete={() => handlDeleteImage(item.path)}
          />
        )}
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
        style={{ width: '100%', padding: 24 }}
      />
    </Container>
  )
}
