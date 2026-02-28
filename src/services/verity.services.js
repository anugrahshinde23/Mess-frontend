import api from '../api/axios.js'

export const askVerityApi = async (data) => {
    const res = await api.post("/verity/ask" ,data )
    return res.data
}