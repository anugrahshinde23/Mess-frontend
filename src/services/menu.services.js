import api from "../api/axios"

export const getTodaysMenuApi = async () => {
    const res = await api.get('/menu/get-todays-menu')
    return res.data
}

export const setTodaysMenuApi = async (data) => {
    const res = await api.post('/menu/today-menu', data)
    return res.data
}

export const getTodaysMenuByIdApi = async (messId) => {
    const res = await api.get(`/menu/get-menu/${messId}/details`)
    return res.data
}