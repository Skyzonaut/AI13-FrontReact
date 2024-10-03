import { useParams } from "react-router-dom"
import { fetchQuestionnaire, isParcoursAlreadyDone } from "../../Services/QuestionnaireAPI";
import { useState, useEffect } from "react";
import Question from "../../Components/Question";
import "../../Assets/Styles/Questionnaire.scss";

const Questionnaire = () => {
    const { id } = useParams();
    const [questionnaire, setQuestionnaire] = useState(null);
    
    useEffect(() => {
        const loadQuestionnaire = async () => {
            fetchQuestionnaire(id)
                .then((data) => {
                    setQuestionnaire(data);
                })
        };
        loadQuestionnaire();

    }, [id]);
    
    if (!questionnaire) {
        return <div>Loading...</div>;
    }


    return (
        <div className="questionnaire">
            <h1 className="display-6" style={{textAlign: 'center'}}>{questionnaire.titre}</h1>
            <form>
                { 
                    questionnaire.questions.map(question => {
                        return (<Question question={question}/>)
                    })
                }
            </form>
        </div>
    )
}
export default Questionnaire;