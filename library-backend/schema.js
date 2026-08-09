const typeDefs = `
  type Book {
    title: String!
    published: Int!
    author: Author!
    id: ID!
    genres: [String!]!
  }
  type Author {
    name: String!
    id: ID!
    born: Int
    bookCount: Int!
  }
  enum YesNo {
    YES
    NO
  }
  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String, filter: String): [Book!]!
    allAuthors: [Author!]!
    findBook(name: String!): Book
    personCount: Int!
    allPersons(phone: YesNo): [Person!]!
    findPerson(name: String!): Person
    me: User
  }
  type Mutation {
    addBook(
      title: String!
      published: Int!
      author: String!
      genres: [String!]!
    ): Book
    editAuthor(
      name: String!
      setBornTo: Int!
    ): Author
    createUser(
      username: String!
      favoriteGenre: String!
    ): User
    login(
      username: String!
      password: String!
    ): Token
    addAsFriend(name: String!): User
    addPerson(
      name: String!
      phone: String
      street: String!
      city: String!
    ): Person
    _resetDatabase: Boolean
  }
  type User {
    username: String!
    favoriteGenre: String!
    friends: [Person!]!
    id: ID!
  }
  type Token {
    value: String!
  }
  enum YesNo {
    YES
    NO
  }
  type Address {
    street: String!
    city: String!
  }
  type Person {
    name: String!
    phone: String
    address: Address!
    id: ID!
  }
`

module.exports = typeDefs