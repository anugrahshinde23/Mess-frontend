import api from '../api/axios.js'

export const askVerityApi = async (data) => {
    const res = await api.post("/verity/ask" ,data )
    return res.data
}

export const createNewChatApi = async () => {
    const res = await api.post("/verity/new-chat")
    return res.data
}

export const sendMessageApi = async (data) => {
    const res = await api.post("/verity/send-msg", data)
    return res.data
}

export const getChatApi = async (chatId) => {
    const res = await api.get(`/verity/get-chat/${chatId}`)
    return res.data
}

export const getAllChatsApi = async () => {
    const res = await api.get('/verity/get-all-chats')
    return res.data
}

export const updateChatTitleApi = async (chatId, title) => {
    const res = await api.put(`/verity/update-chat-title/${chatId}`, { title });
    return res.data
};

export const deleteChatApi = async (chatId) => {
    const res = await api.delete(`/verity/delete-chat/${chatId}`)
    return res.data
}