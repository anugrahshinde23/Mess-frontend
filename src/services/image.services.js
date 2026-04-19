import api from "../api/axios"

export const generateImageApi = async(data) => {
    const res = await api.post('/image/generate', data)
    return res.data
}