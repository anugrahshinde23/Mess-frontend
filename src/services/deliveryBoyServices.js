import api from "../api/axios"

export const registerDeliveryBoyApi = async (servicePinCodes) => {
    const res = await api.post('/deliveryboy/register', {
        servicePinCodes
    })
    return res.data
}

export const getDeliveryBoyInfoApi = async () => {
    const res = await api.get('/deliveryboy/get-delivery-boy')
    return res.data
}

export const getMessByPincodeApi = async () => {
    const res = await api.get('/deliveryboy/get-messes')
    return res.data
}

export const joinMessApi = async (messId) => {
    const res = await api.post(`/deliveryboy/join/${messId}/mess`)
    return res.data
}

export const getDeliveryBoyRequestApi = async (messId) => {
    const res = await api.get(`/deliveryboy/get-delivery-boy/${messId}/request`)
    return res.data
}

export const approveRequestApi = async (reqId) => {
    const res = await api.put(`/deliveryboy/approve/${reqId}/request`)
    return res.data
}

export const rejectRequestApi = async (reqId) => {
    const res = await api.put(`deliveryboy/reject/${reqId}/request`)
    return res.data
}

export const checkDeliveryBoyPinMatchesUsersPinApi = async (userPin, messId) => {
    const res = await api.get('deliveryboy/get-matching-dboy', {
        params : {userPin, messId}
    })
    return res.data
}

export const approveOrderRequestApi = async (data) => {
    const res = await api.put('deliveryboy/approve-order-request', data)
    return res.data
}

export const rejectOrderRequestApi = async (data) => {
    const res = await api.put("deliveryboy/reject-order-request", data)
    return res.data
}