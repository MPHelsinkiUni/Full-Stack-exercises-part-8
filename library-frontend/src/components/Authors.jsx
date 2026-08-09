import { useState } from 'react'
import { ALL_AUTHORS, ALL_BOOKS, UPDATE_AUTHOR } from '../queries'
import { useMutation } from '@apollo/client/react'

const Authors = (props) => {
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')
  const [updateAuthor] = useMutation(UPDATE_AUTHOR, {
    refetchQueries: [
      { query: ALL_BOOKS },
      { query: ALL_AUTHORS }
    ]
  })

  if (!props.show) {
    return null
  }

  if (props.authors.loading) {
    return <div>loading...</div>
  }

  
  const authors = props.authors.data.allAuthors

  const update = async (event) => {
    event.preventDefault()

    await updateAuthor({ variables: { name, born: Number(born) } })

    console.log('update author...')

    setName('')
    setBorn('')
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.id}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {props.token && 
      <div>
        <h2>Set birthyear</h2>
        <form onSubmit={update}>
          <div>
            <label for="name">
              name
              <select id="name" label={"name"} name="name" value={name} onChange={({ target }) => setName(target.value)}>
                {authors.map((a) => (
                  <option key={a.id} value={a.name}>{a.name}</option>
                ))}
              </select>
            </label>
          </div>
          <div>
            <label for="born"> 
              born
              <input
                id="born"
                value={born}
                onChange={({ target }) => setBorn(target.value)}
                required
              />
            </label>
          </div>
          <button name="update author" type="submit">update author</button>
        </form>
      </div>
      }
    </div>
  )
}

export default Authors
