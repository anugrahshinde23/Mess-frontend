import api from '../api/axios.js'


export const createWalletApi = async (data) => {
    const res = await api.post('/wallet/create', data)
    return res.data
}

export const getUserWalletApi = async () => {
    const res = await api.get('/wallet/get-wallet')
    return res.data
}