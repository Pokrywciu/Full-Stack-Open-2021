import axios from 'axios'

const baseUrl = "http://localhost:3001/anecdotes"

const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

const createAnecdote = async (content) =>{
    const newObject = {content, votes: 0}
    const response = await axios.post(baseUrl, newObject)
    return response.data

}

const vote = async (anecdote) => {
    const response = await axios.patch(`${baseUrl}/${anecdote.id}`, anecdote)
    return response.data
}

export default {getAll, createAnecdote, vote}