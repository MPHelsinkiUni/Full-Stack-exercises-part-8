const Recommend = (props) => {
  
  if (!props.show) {
    return null
  }

  if (props.books.loading) {
    return <div>loading...</div>
  }
  console.log(props.genre)
  
  const books = props.books.data.allBooks

  return (
    <div>
      <h2>recommendations</h2>

      {props.genre === null ? (<div>you have no <b>favourite</b> genre</div>) : (<div>books in your favorite genre <b>{props.genre}</b></div>)}

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.id}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Recommend
