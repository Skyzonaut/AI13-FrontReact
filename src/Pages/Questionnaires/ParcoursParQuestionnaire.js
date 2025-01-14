import { fetchAllParcoursDisplay, fetchQuestionnaire, fetchReponseParcours, startNewQuestionnaire } from "../../Services/QuestionnaireAPI";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom"
import "../../Assets/Styles/Parcours.scss";
import ParcourCard from "../../Components/ParcourCard";
import ParcourView from "../../Components/ParcourView";
import { apiUrl} from "../../Properties";

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
            startNewQuestionnaire(localStorage.getItem("userId"), questionnaire.id).then((res) => {
                navigate(`/questionnaire/${questionnaire.id}/${res.parcoursId}`)
            })
            
        }
    }


    useEffect(() => {
        const loadParcours = async () => {
            fetchAllParcoursDisplay(id, localStorage.getItem("userId"))
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
                                    isSelected={parcour.parcoursId === selectedParcourId}
                                />
                            )
                        })
                    }
                </div>
                {questionnaire.enabled === true ? (
                    <button 
                        className="add-parcours" 
                        type="button"
                        onClick={startQuestionnaire}
                        data-bs-theme="dark"
                    >
                        Nouvel essai
                    </button>
                    ) : (
                    <button 
                        className="add-parcours" 
                        type="button"
                        disabled
                        data-bs-theme="dark"
                    >
                        Désactivé
                    </button>
                    )}
            </div>
            <div className="parcours-view-pane">
                <ParcourView parcour={parcourContent} questionnaire={questionnaire} />
            </div>
        </div>
    )
}
export default ParcoursParQuestionnaire;