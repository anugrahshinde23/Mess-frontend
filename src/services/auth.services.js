import api from '../api/axios.js'


export const loginApi = async(data) => {
    const res = await api.post("/auth/login", data)

    return res.data
}

export const registerApi = async(data) => {
    const res = await api.post('/auth/register', data)
    return res.data
}

export const logoutApi = async() => {
    const res = await api.post('/auth/logout')
    return res.data
}

export const sendOtpApi = async (data) => {
    const res = await api.put("/auth/send/otp", data)
    return res.data
}

export const verifyOtpApi = async (data) => {
    const res = await api.put("/auth/verify/otp",data)
    return res.data
}

export const resetPassApi = async (data) => {
    const res = await api.put("/auth/reset-pass", data)
    return res.data
}