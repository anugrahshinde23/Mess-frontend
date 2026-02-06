import api from "../api/axios"

export const getNotifictaionApi = async () => {
    const res = await api.get('/notification/get-notification')
    return res.data
}

export const markAsReadApi = async (notificationId) => {
    const res = await api.patch(`/notification/mark-as-read/${notificationId}/notification`)
    return res.data
}