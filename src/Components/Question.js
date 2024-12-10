import Form from 'react-bootstrap/Form';
import Reponse from "../Components/Reponse";
import "../Assets/Styles/Question.scss";
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { useState, useEffect } from "react";
import { fetchReponse } from '../Services/QuestionnaireAPI';

function Question({question, done}) {
    

    const [reponses, setReponse] = useState(null);
    
    useEffect(() => {
        const loadReponse = async (qId) => {
            fetchReponse(qId)
                .then((data) => {
                    setReponse(data);
                })
        };
        loadReponse(question.id);
    }, []);
    if (!reponses) {
        return <div>Loading...</div>;
    }

    console.log(reponses)

    return (
        <div key={question.id} className="question">
            <FloatingLabel 
                    controlId={question.id} 
                    label={question.titre} 
                    data-bs-theme="dark">
                <Form.Select
                    disabled = {done ? "disabled" : ""}
                    aria-label="Reponses"
                    name={question.id}
                    className="question-select"
                    data-bs-theme="dark">
                {
                    reponses.map(reponse => {
                        return (<Reponse reponse={reponse} />)
                    })
                }
                </Form.Select>
            </FloatingLabel>
        </div>
    )
}

export default Question;