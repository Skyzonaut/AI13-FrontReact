import { apiUrl } from "../Properties";

export const fetchQuestionnaire = async(id) => {
    return fetch(`${apiUrl}/questionnaires/${id}`, {
            method: 'GET',
            credentials: 'include', // Important pour envoyer les cookies ou autoriser les identifiants
            headers: {
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

export const fetchAllQuetionnaire = async() => {
    return fetch(`${apiUrl}/questionnaires/`, {
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
        .catch((err) => {
            console.error(err);
            throw err;
        })
}

export const fetchParcoursByUserId = async(userId) => {
    return fetch("/parcours.json")
        .then((res) => {
            if(!res.ok) {
                const errorMessage = res.text();
                throw new Error(errorMessage || `HTTP error! status: ${res.status}`);
            }
            return res.json();
        })
        .then((json) => {
            return json
                .filter(item => item.userId === userId);
        })
        .catch((err) => {
            console.error(err);
            throw err;
        })
}

export const isParcoursAlreadyDone = async(userId, questionnaireId) => {
    return fetch("/parcours.json")
    .then((res) => {
        if(!res.ok) throw new Error()
        return res.json();
    })
    .then((json) => {
        return json
            .filter(item => item.userId === userId)
            .some(obj => obj.questionnaireId === parseInt(questionnaireId));
    })
}

export const fetchAllParcours = async(questionnaireId) => {
    console.log(questionnaireId)
    return fetch("/parcours.json")
    .then((res) => {
        if(!res.ok) throw new Error()
        return res.json();
    })
    .then((json) => {
        console.log(json)
        return json
            .filter(item => item.questionnaireId === parseInt(questionnaireId));
    })
}

const getScoreParcours = (parcour) => {
    return parcour.questions.filter(question => question.reponse.vrai === true).length   
}

const getParcourMaxNote = (parcour) => {
    return parcour.questions.length;
}

const getNoteSur20 = (note, maxNote) => {
    return (note/maxNote)*20
}

const getMoyenne = (data) => {
    const maxNote = getParcourMaxNote(data[0])
    let somme = 0;
    data.forEach(parcour => {
        somme += getNoteSur20(getScoreParcours(parcour), maxNote)
    });
    if(maxNote !== 0) return (somme/maxNote).toFixed(2)
    else return NaN
}

const getMin = (data) => {
    const maxNote = getParcourMaxNote(data[0])
    return Math.min(...data.map(parcour => getNoteSur20(getScoreParcours(parcour), maxNote))).toFixed(2)
}

const getMax = (data) => {
    const maxNote = getParcourMaxNote(data[0])
    return Math.max(...data.map(parcour => getNoteSur20(getScoreParcours(parcour), maxNote))).toFixed(2)
}

const getDifferentQuestIdFromParcour = (data) => {
    return data.map(parcour => parcour.questionnaireId).filter((value, index, array) => {
        return array.indexOf(value) === index;
    });
}

export const fetchUserStats = async(userId) => {
    try {
        const data = await fetchParcoursByUserId(userId);
        let obj = {}
        for(let questId of getDifferentQuestIdFromParcour(data)){
            const parcoursForThisQuest = data.filter(parcour => parcour.questionnaireId === questId);
            obj[questId] = {
                questionnaireTitle: (await fetchQuestionnaire(questId).catch((err) => {throw err})).titre,
                moy: getMoyenne(parcoursForThisQuest),
                min: getMin(parcoursForThisQuest),
                max: getMax(parcoursForThisQuest),
            }
        }
        return obj;
    } catch (err) {
        console.error("Erreur lors de la récupération des données:", err.message);
        throw new Error("Erreur lors de la récupération des données:" + err.message); // Propager l'erreur pour que l'appelant puisse la gérer
    }
}