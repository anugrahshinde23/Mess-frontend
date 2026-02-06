import api from "../api/axios"

export const getAllPlansApi = async() => {
    const res = await api.get('/plan/get-all-plans')
    return res.data
}

export const addPlanToMessApi = async(data) => {
    const res = await api.post('/plan/add-plan-to-mess', data)
    return res.data
}

export const removePlanFromMessApi = async (planId) => {
    const res = await api.delete('/plan/remove-plan-from-mess', {data : {planId}})
    return res.data
}

export const getAllMessPlansApi = async (messId) => {
    const res = await api.get(`/plan/get-all-mess-plans/${messId}`)
    return res.data
}