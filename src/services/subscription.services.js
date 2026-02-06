import api from "../api/axios"

export const createSubscriptionApi = async (data) => {
    const res = await api.post('/subscription/create-subscription', data)
    return res.data
}

export const getUserSubscriptionApi = async () => {
    const res = await api.get('/subscription/get-user-subscription')
    return res.data
}

export const getPendingSubscriptionApi = async () => {
    const res = await api.get('/subscription/get-pending-subscription')
    return res.data
}

export const approvedByOwnerApi = async (subscriptionId) => {
    const res = await api.patch(`/subscription/${subscriptionId}/approve`)
    return res.data
}

export const rejectedByOwnerApi = async (subscriptionId) => {
    const res = await api.patch(`/subscription/${subscriptionId}/reject`)
    return res.data
}

export const getSubscriptionByStatusApi = async (status) => {
    const res = await api.get(`/subscription/get-owner-subscription?status=${status}`)
    return res.data
}

