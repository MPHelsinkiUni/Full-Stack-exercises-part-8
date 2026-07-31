const { GraphQLError } = require('graphql')
const { v1: uuid } = require('uuid')

let authors = [
  {
    name: "Robert Martin",
    id: "afa51ab0-344d-11e9-a414-719c6709cf3e",
    born: 1952,
  },
  {
    name: "Martin Fowler",
    id: "afa5b6f0-344d-11e9-a414-719c6709cf3e",
    born: 1963,
  },
  {
    name: "Fyodor Dostoevsky",
    id: "afa5b6f1-344d-11e9-a414-719c6709cf3e",
    born: 1821,
  },
  {
    name: "Joshua Kerievsky", // birthyear not known
    id: "afa5b6f2-344d-11e9-a414-719c6709cf3e",
  },
  {
    name: "Sandi Metz", // birthyear not known
    id: "afa5b6f3-344d-11e9-a414-719c6709cf3e",
  },
]

let books = [
  {
    title: "Clean Code",
    published: 2008,
    author: "Robert Martin",
    id: "afa5b6f4-344d-11e9-a414-719c6709cf3e",
    genres: ["refactoring"],
  },
  {
    title: "Agile software development",
    published: 2002,
    author: "Robert Martin",
    id: "afa5b6f5-344d-11e9-a414-719c6709cf3e",
    genres: ["agile", "patterns", "design"],
  },
  {
    title: "Refactoring, edition 2",
    published: 2018,
    author: "Martin Fowler",
    id: "afa5de00-344d-11e9-a414-719c6709cf3e",
    genres: ["refactoring"],
  },
  {
    title: "Refactoring to patterns",
    published: 2008,
    author: "Joshua Kerievsky",
    id: "afa5de01-344d-11e9-a414-719c6709cf3e",
    genres: ["refactoring", "patterns"],
  },
  {
    title: "Practical Object-Oriented Design, An Agile Primer Using Ruby",
    published: 2012,
    author: "Sandi Metz",
    id: "afa5de02-344d-11e9-a414-719c6709cf3e",
    genres: ["refactoring", "design"],
  },
  {
    title: "Crime and punishment",
    published: 1866,
    author: "Fyodor Dostoevsky",
    id: "afa5de03-344d-11e9-a414-719c6709cf3e",
    genres: ["classic", "crime"],
  },
  {
    title: "Demons",
    published: 1872,
    author: "Fyodor Dostoevsky",
    id: "afa5de04-344d-11e9-a414-719c6709cf3e",
    genres: ["classic", "revolution"],
  },
]

const resolvers = {
  Query: {
    bookCount: () => books.length,
    authorCount: () => authors.length,
    allBooks: (root, args) => {
      let result = books
      if (args.author) {
        result = result.filter(book => book.author === args.author)
      }
      if (args.genre) {
        result = result.filter(book => book.genres.includes(args.genre))
      }
      return result
    },
    allAuthors: () => authors,
    findBook: (root, args) =>
      books.find(book => book.title === args.name)
  },

  Author: {
    bookCount: (root) =>
      books.filter(book => book.author === root.name).length
  },

  Mutation: {
    addBook: (root, args) => {
      const book = { ...args, id: uuid() }
      books = books.concat(book)

      if (authors.filter(author => author.name === args.author).length === 0) {
        const newAuthor = {
          name: args.author,
          id: uuid()
        }
        authors = authors.concat(newAuthor)
      }
      return book
    },
    editAuthor: (root, args) => {
      if (authors.filter(author => author.name === args.name).length === 0) {
        return null
      }
      const author = authors.filter(author => author.name === args.name)[0]
      author.born = args.setBornTo
      authors = authors.filter(author => author.name !== args.name)
      authors = authors.concat(author)
      return author
    }
  }
}

module.exports = resolvers