import { useParams } from "react-router-dom"
import { fetchQuestionnaire } from "../../Services/QuestionnaireAPI";
import { useState, useEffect } from "react";
import Question from "../../Components/Question";
import "../../Assets/Styles/Questionnaire.scss";

const Questionnaire = () => {
    const { id } = useParams();
    const [questionnaire, setQuestionnaire] = useState(null);
    const [error, setError] = useState(null);
    
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
            <form>
                { 
                    questionnaire?.questions?.map(question => {
                        return (<Question question={question} key={"question-"+question.id}/>)
                    })
                }
            </form>
        </div>
    )
}
export default Questionnaire;