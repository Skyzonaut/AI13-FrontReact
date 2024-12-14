import { useNavigate, useParams } from "react-router-dom"
import { fetchQuestionnaire } from "../../Services/QuestionnaireAPI";
import { useState, useEffect } from "react";
import Question from "../../Components/Question";
import "../../Assets/Styles/Questionnaire.scss";
import { apiUrl } from "../../Properties";

const Questionnaire = () => {
    const { id, parcours } = useParams();
    const navigate = useNavigate();
    const [questionnaire, setQuestionnaire] = useState(null);
    const [error, setError] = useState(null);
    const [responses, setResponses] = useState({}); // Stocke les réponses des questions

    // Fonction pour mettre à jour une réponse
    const handleResponseChange = (questionId, value) => {
        setResponses((prev) => {
            const updatedResponses = {
                ...prev,
                [questionId]: value,
            };
            return updatedResponses;
        });
    };;

    const handleSubmit = async () => {
        const fetchPromises = Object.entries(responses).map(([key, value]) =>
            fetch(`${apiUrl}/parcours/${parcours}/answer/${value}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
        );
    
        try {
            await Promise.all(fetchPromises); 
        } catch (error) {
            console.error('Erreur réseau :', error);
            alert('Erreur réseau.');
            throw error; 
        }
    };
    
    const finishParcours = async () => {
        try {
            await handleSubmit();
            const res = await fetch(`${apiUrl}/parcours/${parcours}/finish`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
    
            if (!res.ok) {
                alert('Erreur lors de l\'envoi des réponses.');
                return;
            }
    
            alert('Essai validé');
            navigate(`/parcours/${id}`);
        } catch (error) {
            alert('Erreur lors de l\'envoi des réponses ou de la finalisation du parcours.');
        }
    };

    useEffect(() => {
        const loadQuestionnaire = async () => {
            fetchQuestionnaire(id)
                .then((data) => {
                    setQuestionnaire(data);
                    setError(null)
                })
                .catch((err) => {
                    setError(err)
                })
        };
        loadQuestionnaire();
    }, [id]);
    
    if (error != null) {
        return <div>Erreur : {error}</div>;
    }    

    if (!questionnaire) {
        return <div>Loading...</div>;
    }
    
    return (
        <div className="questionnaire">
            <h1 className="display-6" style={{textAlign: 'center'}}>{questionnaire.titre}</h1>
            <form onSubmit={(e) => e.preventDefault()}>
                { 
                    questionnaire?.questions?.map(question => {
                        return (<Question question={question} 
                            key={"question-"+question.id} 
                            onChange={handleResponseChange}/>)
                    })
                }
                <button type="button" onClick={finishParcours}>
                    Valider et envoyer
                </button>
            </form>
        </div>
    )
}
export default Questionnaire;