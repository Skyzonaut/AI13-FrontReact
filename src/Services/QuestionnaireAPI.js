
export const fetchQuestionnaire = async(id) => {
    return fetch("/questionnaire.json")
        .then((res) => {
            if(!res.ok) throw new Error()
            return res.json();
        })
        .then((json) => {
            return json[0]
        })
        .catch((err) => {
            console.error(err);
            throw err;
        })
}

export const fetchAllQuetionnaire = async() => {
    return fetch("/questionnaire.json")
        .then((res) => {
            if(!res.ok) throw new Error()
            return res.json();
        })
        .catch((err) => {
            console.error(err);
            throw err;
        })
}

export const fetchParcoursId = async(userId) => {
    return fetch("/parcours.json")
        .then((res) => {
            if(!res.ok) throw new Error()
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
    return Math.min(...data.map(parcour => getNoteSur20(getScoreParcours(parcour), maxNote)))
}

const getMax = (data) => {
    const maxNote = getParcourMaxNote(data[0])
    return Math.max(...data.map(parcour => getNoteSur20(getScoreParcours(parcour), maxNote)))
}


export const fetchUserStats = async(userId) => {
    try {
        const data = await fetchParcoursId(userId);
        const obj = {
            moy: getMoyenne(data),
            min: getMin(data),
            max: getMax(data),
        };
        return obj;
    } catch (err) {
        console.error("Erreur lors de la récupération des données:", err);
        throw err; // Propager l'erreur pour que l'appelant puisse la gérer
    }
    // const questionnaireId = [...new Set(parcours.map(parcour => {
    //     return parcour.questionnaireId
    // }))];
    
    // const questionnaires = questionnaireId.map(questId => {
    //     return fetchQuestionnaire(questId);
    // });
    

//TODO : à implémenter ta racez
// const questionnaireMap = parcours.reduce((acc, parcour) => {
//     const questionnaireId = parcour.questionnaireId;

//     // Si la clé `questionnaireId` n'existe pas encore dans l'objet accumulé, on l'initialise avec un tableau vide
//     if (!acc[questionnaireId]) {
//         acc[questionnaireId] = [];
//     }

//     // On ajoute le parcours à la liste correspondant au `questionnaireId`
//     acc[questionnaireId].push(parcour);

//     return acc; // On retourne l'objet accumulateur
// }, {});

// console.log(questionnaireMap);
}