import axios from 'axios'

const url = 'http://localhost:3001/anecdotes'

const getAll = () => axios.get(url).then(response => response.data)

const create = anecdoteToCreate => axios.post(url, anecdoteToCreate)

export default { getAll, create }