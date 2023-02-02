import styled from 'styled-components/native'
import {TextInput} from 'react-native'

export const Container = styled(TextInput).attrs({
  placeholderTextColor : '#fff'
})`
  width: 100%;
  height: 56px;
  border: 1px solid orange;
  padding: 8px;
  color: #fff;
  font-size: 24px;
  border-radius: 8px;
  margin-top: 16px;
`
export const Label = styled.Text`
  font-size: 24px;
  color: #fff;
`
