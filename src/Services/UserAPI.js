import { apiUrl } from "../Properties";

export const fetchUser = async(login) => {
    return fetch(`${apiUrl}/users/pseudo/${login}`, {
            method: 'GET',
            credentials: 'include', // Important pour envoyer les cookies ou autoriser les identifiants
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then((res) => {
            if(!res.ok) throw new Error()
            return res.json();
        })
        .then((json) => {
            return json
        })
        .catch((err) => {
            console.error(err);
            throw err;
        })
}