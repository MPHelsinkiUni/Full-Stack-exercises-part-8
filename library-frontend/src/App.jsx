import { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import Notify from './components/Notify'
import Recommend from './components/Recommend'
import { useApolloClient, useQuery } from '@apollo/client/react'
import { ALL_AUTHORS, ALL_BOOKS, ALL_GENRES, ME } from './queries'


const App = () => {
  const [token, setToken] = useState(localStorage.getItem('booker-user-token'))
  const [errorMessage, setErrorMessage] = useState(null)
  const [page, setPage] = useState('authors')
  const [genre, pickGenre] = useState(null)
  const user = useQuery(ME, {
    skip: !token
  })
  const current_user = user.data?.me?.favoriteGenre
  const authors = useQuery(ALL_AUTHORS)
  const genres = useQuery(ALL_GENRES)
  const books = useQuery(ALL_BOOKS, {
    variables: { genre }
  })
  const client = useApolloClient()

  if (books.loading) {
    return <div>loading...</div>
  }

  const onLogout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 10000)
  }

  const setRecommendPage = () => {
    pickGenre(current_user)
    setPage('recommend')
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {token && <button onClick={() => setPage('add')}>add book</button>}
        {token && <button onClick={() => setRecommendPage()}>recommend</button>}
        {!token ? <button onClick={() => setPage('loginform')}>login</button> : <button onClick={onLogout}>logout</button>}
      </div>

      <Notify errorMessage={errorMessage} />
      <Authors show={page === 'authors'} authors={authors} token={token}/>
      <Books show={page === 'books'} books={books} genres={genres} genre={genre} pickGenre={pickGenre} />
      <Recommend show={page === 'recommend'} books={books} genre={current_user}/>
      {page === 'add' && <NewBook show={true} />}
      {page === 'loginform' && !token && (
        <LoginForm
          setToken={setToken}
          setError={notify}
        />
      )}
    </div>
  )
}

export default App
