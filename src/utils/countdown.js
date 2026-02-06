export const calculateTimeLeft = (endDate) => {
    const diff = new Date(endDate) - new Date()

    if(diff <= 0) return null

    return {
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60)
    }
}