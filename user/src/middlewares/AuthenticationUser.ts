import axios from 'axios';

const local_server = process.env.REACT_APP_LOCAL_SERVER;
const network_server = process.env.REACT_APP_NETWORK_SERVER;

export const checkUser = async () => {
    try {
        const responseLocal = await axios.get(`${local_server}/api/user`, {
            withCredentials: true
        });

    } catch (err) {
        try {
            const responseNetwork = await axios.get(`${network_server}/api/user`, {
                withCredentials: true
            });

        } catch (err: any) {
            if (err.response && err.response.status === 401) {
                console.log('JWT token expired');
            } else {
                window.location.href = "/login";
            }
            window.location.href = "/login";
        }
    }
};
