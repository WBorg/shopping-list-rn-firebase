import styled from 'styled-components/native'
import {TouchableOpacity } from 'react-native'

export const Container = styled(TouchableOpacity)`
  flex: 1;
  min-height: 56px;
  max-height: 56px;
  background-color: #528F33;
  border-radius: 8px;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-top: 42px;

`

export const Title = styled.Text`
  color: #fff;
  font-size: 24px;
  border-radius: 8px;
`