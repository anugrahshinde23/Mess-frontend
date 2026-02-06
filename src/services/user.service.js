import api from "../api/axios"

export const getUserApi = async () => {
    const res = await api.get('/user/getMe')
    return res.data
}