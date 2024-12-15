import { apiUrl } from "../Properties";

export const fetchQuestionnaire = async(id) => {
    return fetch(`${apiUrl}/questionnaires/${id}`, {
            method: 'GET',
            credentials: 'include', // Important pour envoyer les cookies ou autoriser les identifiants
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            }
        })
        .then((res) => {
            if(!res.ok) {
                const errorMessage = res.text();
                console.log(errorMessage.then)
                throw new Error(errorMessage || `HTTP error! status: ${res.status}`);
            }
            return res.json();
        })
        .then((json) => {
            return json
        })
        .catch((err) => {
            console.error(err.message);
            throw new Error(err.message);
        })
}

export const fetchReponse = async(id) => {
    return fetch(`${apiUrl}/reponse/${id}`, {
            method: 'GET',
            credentials: 'include',
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
            console.error(err.message);
            throw new Error(err.message);
        })
}

export const fetchAllQuetionnaire = async() => {
    return fetch(`${apiUrl}/questionnaires/`, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            }
        })
        .then((res) => {
            if(!res.ok) throw new Error()
            return res.json();
        })
        .catch((err) => {
            console.error(err);
            throw err;
        })
}

export const fetchParcoursByUserId = async(userId) => {
    return fetch(`${apiUrl}/parcours/user/${userId}`, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            }
        })
        .then((res) => {
            if(!res.ok) {
                const errorMessage = res.text();
                throw new Error(errorMessage || `HTTP error! status: ${res.status}`);
            }
            return res.json();
        })
        .then((json) => {
            return json;
        })
        .catch((err) => {
            console.error(err);
            throw err;
        })
}

export const fetchReponseParcours = async(parcourId) => {
    return fetch(`${apiUrl}/parcours/${parcourId}/reponses`, {
        method: "GET",
        credentials: 'include',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
        }
    })
        .then((res) => {
            if(!res.ok) {
                const errorMessage = res.text();
                throw new Error(errorMessage || `HTTP error! status: ${res.status}`);
            }
            return res.json();
        })
        .then((json) => {
            return json;
        })
        .catch((err) => {
            console.error(err);
            throw err;
        })
}

export const fetchReponsesForQuestion = async(questId) => {
    return fetch(`${apiUrl}/reponse/${questId}`, {
        method: "GET",
        credentials: 'include',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
        }
    })
    .then((res) => {
        if(!res.ok) {
            const errorMessage = res.text();
            throw new Error(errorMessage || `HTTP error! status: ${res.status}`);
        }
        return res.json();
    })
    .then((json) => {
        return json;
    })
    .catch((err) => {
        console.error(err.message);
        throw new Error(err.message);
    })
}

export const fetchAllParcours = async(questionnaireId) => {
    return fetch(`${apiUrl}/parcours/byquestionnaire/${questionnaireId}`, {
        method: "GET",
        credentials: 'include',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
        }
    })
    .then((res) => {
        if(!res.ok) {
            const errorMessage = res.text();
            throw new Error(errorMessage || `HTTP error! status: ${res.status}`);
        }
        return res.json();
    })
    .then((json) => {
        return json;
    })
    .catch((err) => {
        console.error(err.message);
        throw new Error(err.message);
    })
}

export const fetchAllParcoursDisplay = async(questionnaireId, userId) => {
    return fetch(`${apiUrl}/parcours/display/data/${questionnaireId}/${userId}`, {
        method: "GET",
        credentials: 'include',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
        }
    })
    .then((res) => {
        if(!res.ok) {
            const errorMessage = res.text();
            throw new Error(errorMessage || `HTTP error! status: ${res.status}`);
        }
        return res.json();
    })
    .then((json) => {
        return json;
    })
    .catch((err) => {
        console.error(err.message);
        throw new Error(err.message);
    })
}

// export const fetchUserStats = async(userId) => {
//     try {
//         const data = await fetchParcoursByUserId(userId);
//         let obj = {}
//         for(let questId of getDifferentQuestIdFromParcour(data)){
//             const questionnaire = await fetchQuestionnaire(questId).catch((err) => {throw err});
//             const parcoursForThisQuest = data.filter(parcour => parcour.questionnaireId === questId && parcour.dateFin !== null);
//             obj[questId] = {
//                 questionnaireTitle: questionnaire.titre,
//                 moy: getMoyenne(parcoursForThisQuest, questionnaire),
//                 min: getMin(parcoursForThisQuest, questionnaire),
//                 max: getMax(parcoursForThisQuest, questionnaire),
//             }
//         }
//         return obj;
//     } catch (err) {
//         console.error("Erreur lors de la récupération des données:", err.message);
//         throw new Error("Erreur lors de la récupération des données:" + err.message); // Propager l'erreur pour que l'appelant puisse la gérer
//     }
// }

export const fetchUserStats = async(userId) => {
    return fetch(`${apiUrl}/parcours/stats/${userId}`, {
        method: "GET",
        credentials: 'include',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
        }
    })
    .then((res) => {
        if(!res.ok) {
            const errorMessage = res.text();
            throw new Error(errorMessage || `HTTP error! status: ${res.status}`);
        }
        return res.json();
    })
    .then((json) => {
        return json;
    })
    .catch((err) => {
        console.error(err.message);
        throw new Error(err.message);
    })
}

export const startNewQuestionnaire = (userId, questionnaireId) => {
    return fetch(`${apiUrl}/parcours/start?userId=${userId}&questionnaireId=${questionnaireId}`, {
        method: 'POST',
        credentials: 'include', 
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
        }
    })
    .then((res) => {
        if(!res.ok) {
            const errorMessage = res.text();
            throw new Error(errorMessage || `HTTP error! status: ${res.status}`);
        }
        return res.json();
    })
    .then((res) => {
        return res;
    })
    .catch((err) => {
        console.error(err.message);
        alert("Une erreur est survenue")
    })
}