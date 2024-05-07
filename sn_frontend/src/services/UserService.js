import axios from "axios"

// const baseUrl = 'http://localhost:3001/users' //! test json server
const baseUrl = 'http://localhost:3001/api/users'

const getAll = async () => {
    const res = await axios.get(baseUrl)
    return res.data
}
const getById = async (id) => {
    const req = await axios.get(`${baseUrl}/${id}`)
    return res.data
}

export default {getAll, getById}