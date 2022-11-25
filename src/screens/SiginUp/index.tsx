import { Button } from '../../components/Form/Button'
import { Input } from '../../components/Form/Input'
import { Container } from './styles'

export function SiginUp() {
  return (
    <Container>
      <Input placeholder="E-mail" />
      <Input placeholder="Senha" secureTextEntry />
      <Input placeholder="Confirme a senha" secureTextEntry />
      <Button title="Cadastrar" />
    </Container>
  )
}
