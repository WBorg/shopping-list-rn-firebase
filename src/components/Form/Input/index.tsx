import { TextInputProps } from 'react-native'
import { Container, Label } from './styles'

type Props = TextInputProps

export function Input({ ...rest }: Props) {
  return (
    <>
      <Container {...rest} />
    </>
  )
}
