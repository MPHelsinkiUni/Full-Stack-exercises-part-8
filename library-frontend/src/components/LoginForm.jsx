import { useState } from 'react'
import { useMutation } from '@apollo/client/react'
import { LOGIN } from '../queries'

const LoginForm = ({ setError, setToken }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [ login ] = useMutation(LOGIN, {
    onCompleted: (data) => {
      const token = data.login.value
      setToken(token)
      localStorage.setItem('booker-user-token', token)
    },
    onError: (error) => {
      setError(error.message)
    }
  })

  const submit = (event) => {
    event.preventDefault()
    login({ variables: { username, password } })
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          <label for="username">username <input
            id="username"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
          </label>
        </div>
        <div>
          <label for="password">password <input
            id="password"
            type='password'
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
          </label>
        </div>
        <button type='submit'>login</button>
      </form>
    </div>
  )
}

export default LoginForm