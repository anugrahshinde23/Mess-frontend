import api from "../api/axios";


export const createMessApi = async(data) => {
    const res = await api.post('/mess/create-mess', data)
    return res.data
}

export const getMessByIdApi = async (messId) => {
    const res = await api.get(`/mess/get-mess/${messId}/details`)
    return res.data
} 


export const getMessApi = async() => {
    const res = await api.get('/mess/get-mess')
    return res.data
}

export const updateMessApi = async(data) => {
    const res = await api.put('/mess/update-mess',data)
    return res.data
}

export const deleteMessApi = async() => {
    const res = await api.delete('/mess/delete-mess')
    return res.data
}

export const activateMessApi = async() => {
    const res = await api.get('/mess/activate-mess')
    return res.data
}

export const getAllMessesApi = async() => {
    const res = await api.get('/mess/get-all-messes')
    return res.data
}