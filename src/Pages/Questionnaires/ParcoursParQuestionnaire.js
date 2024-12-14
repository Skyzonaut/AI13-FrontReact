import { fetchAllParcoursDisplay, fetchQuestionnaire, fetchReponseParcours } from "../../Services/QuestionnaireAPI";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom"
import "../../Assets/Styles/Parcours.scss";
import ParcourCard from "../../Components/ParcourCard";
import ParcourView from "../../Components/ParcourView";
import { apiUrl, userId } from "../../Properties";

const ParcoursParQuestionnaire = () => {
    const { id } = useParams();
    const [parcours, setParcours] = useState(null);
    const [parcourContent, setParcoursContent] = useState(null)
    const [questionnaire, setQuestionnaire] = useState(null);
    // const [reponses, setReponses] = useState(null);
    const [selectedParcourId, setSelectedParcourId] = useState(null); // Ajout de l'état pour la sélection
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    const changeContent = (content) => {
        setParcoursContent(content);
        setSelectedParcourId(content.parcoursId);
    }

    const startQuestionnaire = () => {
        if (window.confirm("Êtes-vous sûr de vouloir commencer un nouvel essai ?")) {
            fetch(`${apiUrl}/parcours/start?userId=${userId}&questionnaireId=${questionnaire.id}`, {
                method: 'POST',
                credentials: 'include', // Important pour envoyer les cookies ou autoriser les identifiants
                headers: {
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
                navigate(`/questionnaire/${id}/${res.parcoursId}`)
            })
            .catch((err) => {
                console.error(err.message);
                alert("Une erreur est survenue")
            })
            
        }
    }


    useEffect(() => {
        const loadParcours = async () => {
            fetchAllParcoursDisplay(id, userId)
                .then((data) => {
                    setParcours(data);
                })
                .catch((error) => {
                    setError(error);
                })
        };
        
        const loadQuestionnaire = async () => {
            fetchQuestionnaire(id)
                .then((data) => {
                    setQuestionnaire(data);
                })
                .catch((error) => {
                    setError(error);
                })
        };

        loadQuestionnaire();
        loadParcours();

    }, []);
    

    if (error != null) {
        return <div>Erreur : {error.message}</div>;
    }

    if (!parcours) {
        return <div>Loading...</div>;
    }

    if(parcours.length === 0) {
        return <div><i>Aucun parcour n'a été trouvé</i></div>
    }

    return (
        <div className="parcours-main-pane">
            <div className="parcours-left-pane">
                <div className="parcours-selection-pane">
                    {
                        parcours.map(parcour => {
                            return(
                                <ParcourCard 
                                    obj={parcour}   
                                    key={parcour.parcourId}
                                    onClick={() => changeContent(parcour)}
                                    isSelected={parcour.parcourId === selectedParcourId}
                                />
                            )
                        })
                    }
                </div>
                <button 
                    className="add-parcours" 
                    type="button"
                    onClick={startQuestionnaire}
                >
                    Nouvel essai
                </button>
            </div>
            <div className="parcours-view-pane">
                <ParcourView parcour={parcourContent} questionnaire={questionnaire} />
            </div>
        </div>
    )
}
export default ParcoursParQuestionnaire;