import axios from 'axios'

const url = 'http://localhost:3001/anecdotes'

const getAll = () => axios.get(url).then(response => response.data)

const create = content => axios
    .post(url, { content, votes: 0 })
    .then(response => response.data)

const vote = anecdote => axios
    .put(`${url}/${anecdote.id}`, { ...anecdote, votes: anecdote.votes + 1 })
    .then(response => response.data)

export default { getAll, create, vote }