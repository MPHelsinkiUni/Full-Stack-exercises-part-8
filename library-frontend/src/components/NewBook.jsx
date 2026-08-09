import { useState } from 'react'
import { CREATE_BOOK, ALL_BOOKS, ALL_AUTHORS } from '../queries'
import { useMutation } from '@apollo/client/react'


const NewBook = (props) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [published, setPublished] = useState('')
  const [genre, setGenre] = useState('')
  const [genres, setGenres] = useState([])

  const [createBook] = useMutation(CREATE_BOOK, {
    refetchQueries: [
      { 
        query: ALL_BOOKS,
        variables: { genre: null }
       },
      { query: ALL_AUTHORS }
    ]
  })

  if (!props.show) {
    return null
  }

  const submit = async (event) => {
    event.preventDefault()

    await createBook({ variables: { title, author, published: Number(published), genres: genres.length > 0 ? genres : [undefined] } })

    console.log('add book...')

    setTitle('')
    setPublished('')
    setAuthor('')
    setGenres([])
    setGenre('')
  }

  const addGenre = () => {
    setGenres(genres.concat(genre))
    setGenre('')
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          <label for="title">
            title
            <input
              id="title"
              value={title}
              onChange={({ target }) => setTitle(target.value)}
              required
            />
          </label>
        </div>
        <div>
          <label for="author">
            author
            <input
              id="author"
              value={author}
              onChange={({ target }) => setAuthor(target.value)}
              required
            />
          </label>
        </div>
        <div>
          <label for="published">
            published
            <input
              id="published"
              type="number"
              value={published}
              onChange={({ target }) => setPublished(target.value)}
              required
            />
          </label>
        </div>
        <div>
          <label for="genre">
            genre
            <input
              id="genre"
              value={genre}
              onChange={({ target }) => setGenre(target.value)}
            />
            <button onClick={addGenre} type="button">
              add genre
            </button>
          </label>
        </div>
        <div>genres: {genres.join(' ')}</div>
        <button type="submit">create book</button>
      </form>
    </div>
  )
}

export default NewBook
