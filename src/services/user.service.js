import api from "../api/axios"

export const getUserApi = async () => {
    const res = await api.get('/user/getMe')
    return res.data
}

export const getAllUsersApi = async () => {
    const res = await api.get('/user/all-users')
    return res.data
}