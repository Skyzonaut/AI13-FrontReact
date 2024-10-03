import { fetchAllParcours, fetchQuestionnaire } from "../../Services/QuestionnaireAPI";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom"
import "../../Assets/Styles/Parcours.scss";
import ParcourCard from "../../Components/ParcourCard";
import ParcourView from "../../Components/ParcourView";

const ParcoursParQuestionnaire = () => {
    const { id } = useParams();
    const [parcours, setParcours] = useState(null);
    const [parcourContent, setParcoursContent] = useState(null)
    const [questionnaire, setQuestionnaire] = useState(null);
    const [selectedParcourId, setSelectedParcourId] = useState(null); // Ajout de l'état pour la sélection

  
    const navigate = useNavigate();

    const changeContent = (content) => {
        setParcoursContent(content);
        setSelectedParcourId(content.parcourId);
    }

    useEffect(() => {
        const loadParcours = async () => {
            fetchAllParcours(id)
                .then((data) => {
                    setParcours(data);
                })
        };
        
        const loadQuestionnaire = async () => {
            fetchQuestionnaire(id)
                .then((data) => {
                    setQuestionnaire(data);
                })
        };

        loadQuestionnaire();
        loadParcours();

    }, []);
    
    if (!parcours) {
        return <div>Loading...</div>;
    }

    if(parcours.length == 0) {
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
                    onClick={() => {
                        if (window.confirm("Êtes-vous sûr de vouloir commencer un nouvel essai ?")) {
                            navigate(`/questionnaire/${id}`)
                        }
                    }}
                >
                    Nouvel essai
                </button>
            </div>
            <div className="parcours-view-pane">
                <ParcourView content={parcourContent} questionnaire={questionnaire} />
            </div>
        </div>
    )
}
export default ParcoursParQuestionnaire;