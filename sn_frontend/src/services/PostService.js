import axios from "axios"

// const baseUrl = 'http://localhost:3001/posts' //! test json server
const baseUrl = 'http://localhost:3001/api/posts'

const getAll = async () => {
    const res = await axios.get(baseUrl)
    return res.data
}

const getById = async (id) => {
    const res = await axios.get(`${baseUrl}/${id}`)
    return res.data
}

const upload = async info => {
    const res = await axios.post(`${baseUrl}/upload`,info)
    return res
}

const create = async newObject => {
    const res = await axios.post(baseUrl, newObject)
    return res.data
}

export default {getAll, getById, upload, create}