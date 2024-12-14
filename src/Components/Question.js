import Form from 'react-bootstrap/Form';
import Reponse from "../Components/Reponse";
import "../Assets/Styles/Question.scss";
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { useState, useEffect } from "react";
import { fetchReponse } from '../Services/QuestionnaireAPI';

function Question({question, done, onChange}) {
    
    const [reponses, setReponse] = useState(null);
    
    const handleInputChange = (event) => {
        onChange(question.id, parseInt(event.target.value)); 
    };

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
                    data-bs-theme="dark"
                    onChange={handleInputChange}>
                        <option disabled selected value></option>
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