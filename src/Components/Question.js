import Form from 'react-bootstrap/Form';
import Reponse from "../Components/Reponse";
import "../Assets/Styles/Question.scss";
import FloatingLabel from 'react-bootstrap/FloatingLabel';

function Question({question, done}) {
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
                    question.reponses.map(reponse => {
                        return (<Reponse reponse={reponse} />)
                    })
                }
                </Form.Select>
            </FloatingLabel>
        </div>
    )
}

export default Question;