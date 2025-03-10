import axios from 'axios'

const url = 'http://localhost:3001/anecdotes'

const getAll = () => axios.get(url).then(response => response.data)

const create = content => axios
    .post(url, { content, votes: 0 })
    .then(response => response.data)
    .catch(error => console.error(error.response.data.error))

export default { getAll, create }