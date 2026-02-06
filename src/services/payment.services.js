import api from "../api/axios"

export const createPaymentApi = async (data) => {
    const res = await api.post('/payment/create-payment', data)
    return res.data
}

export const getPaymentHistoryForUserApi = async() => {
    const res = await api.get('/payment/get-payment-history-user')
    return res.data
}