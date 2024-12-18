import { useState, useEffect } from "react";
import "../Assets/Styles/Reponse.scss";
import { fetchReponsesForQuestion } from "../Services/QuestionnaireAPI";

const ParcourReponse = ({reponse, question}) => {
    const [reponsesPossibles, setReponsesPossibles] = useState(null)
    
    useEffect(() => {
        fetchReponsesForQuestion(question.id)
            .then((data) => {
                setReponsesPossibles(data);
            });
    }, [])

    if (!question || !reponsesPossibles || !reponse) {
        return <div>Loading...</div>;
    }

    if(reponse.length === 0) {
        return <div>Information de la question {question.id} introuvable</div>
    }

    return (
        <div className="parcour-reponse">
            <h4>{question.titre}</h4>
            {
                reponsesPossibles.map(resp => {
                    return (
                        <div className={"form-check lfp " + (resp.vrai ? "right-answer" : "")}
                            style={{paddingLeft:"2vw"}}>
                            <input 
                                className="form-check-input" 
                                id={resp.id} 
                                type="radio"
                                checked={resp.id === reponse[0].reponse.id ? true : false}
                                disabled={true}
                                style={{opacity: "1"}}
                            />
                            <label 
                                className="form-check-label" 
                                for={resp.id}
                                style={{opacity: "1"}}
                            >
                                {resp.text}
                            </label>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default ParcourReponse;