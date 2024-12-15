import { apiUrl } from "../Properties";

export const fetchUser = async(login) => {
    return fetch(`${apiUrl}/users/pseudo/${login}`, {
            method: 'GET',
            credentials: 'include', // Important pour envoyer les cookies ou autoriser les identifiants
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
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

export const login = async (username, password) => {
    return fetch(`${apiUrl}/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ "pseudo":username, "password":password }),
    })
    .then((res) => {
        if(!res.ok) {
            const errorMessage = res.text();
            throw new Error(errorMessage || `HTTP error! status: ${res.status}`);
        }
        return res.json();
    })
    .then((data) => {
        return data;
    })
    .catch((err) => {
        console.error(err.message);
        throw new Error(err.message)
    });
  };