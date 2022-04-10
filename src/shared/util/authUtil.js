export const retriveStoredToken = () => {
    // const storedToken = localStorage.getItem("token");
    // const storedExpirationDate = localStorage.getItem("expirationTime");
    const storedUserId = localStorage.getItem('userId')

    return {
        storedUserId: storedUserId,
    }
}
