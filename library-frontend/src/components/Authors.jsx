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
      <h2>Set birthyear</h2>
      <form onSubmit={update}>
        <div>
          name
          <input
            label={"name"}
            value={name}
            onChange={({ target }) => setName(target.value)}
            required
          />
        </div>
        <div>
          born
          <input
            label={"born"}
            value={born}
            onChange={({ target }) => setBorn(target.value)}
            required
          />
        </div>
        <button type="submit">update author</button>
      </form>
    </div>
  )
}

export default Authors
