import api from "../api/axios"

export const oneTimeOrderApi = async (data) => {
    const res = await api.post("/order/oneTime-order",data)
    return res.data
}

export const getOrderHistoryApi = async () => {
    const res = await api.get('/order/get-order-history')
    return res.data
}

export const cancelOrderApi = async (orderId) => {
    const res = await api.patch(`/order/cancel/${orderId}/order`)
    return res.data
}

export const getOrdersApi = async () => {
    const res = await api.get('/order/get-orders')
    return res.data
}

export const assignOrderToDboy = async (data) => {
    const res = await api.post('/order/assign-order/request', data)
    return res.data
}

export const getOrderReqApi = async (dBoyId) => {
    const res = await api.get(`/order/get-order/${dBoyId}/request`)
    return res.data
}