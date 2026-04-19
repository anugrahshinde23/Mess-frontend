import api from "../api/axios";

export const createFeedbackApi = async (data) => {
    const res = await api.post('/feedback/create', data)
    return res.data
}