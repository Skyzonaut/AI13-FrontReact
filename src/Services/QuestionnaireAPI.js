
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


export const getUserStats = async(userId) => {
    const parcours = fetchParcoursId(userId);
    const questionnaireId = [...new Set(parcours.map(parcour => {
        return parcour.questionnaireId
    }))];
    
    const questionnaires = questionnaireId.map(questId => {
        return fetchQuestionnaire(questId);
    });
    

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




    parcours.forEach(parcour => {
        
    });
}