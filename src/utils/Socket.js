import { io } from "socket.io-client";


export const initializeSocket = (currentUser) => {
    return io('https://sehelo.onrender.com',
        {
            auth: {
                userDetail: {
                    name: currentUser.name
                },
                token: currentUser.accessToken,
            },
        });
}
