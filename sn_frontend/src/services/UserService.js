import axios from "axios"

// const baseUrl = 'http://localhost:3001/users' //! test json server
const baseUrl = 'http://localhost:3001/api/users'

const getAll = () => {
    const req = axios.get(baseUrl)
    return req.then(res => res.data)
}
const getById = (id) => {
    const req = axios.get(`${baseUrl}/${id}`)
    return req.then(res => res.data)
}
const login = (loginInfo) => {
    const req = axios.post(`${baseUrl}`, loginInfo)
    return req.then(res => res.data)
}
const create = (newObject) => {
    const req = axios.post(baseUrl, newObject)
    return req.then(res => res.data)
}

export default {getAll, getById, login, create}