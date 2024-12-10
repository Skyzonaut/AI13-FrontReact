import "../Assets/Styles/Reponse.scss";

const ParcourReponse = ({reponse, question}) => {
    
    const reponseChoisieId = reponse.id; 
    
    if (!question) {
        return <div>Loading...</div>;
    }

    return (
        <div className="parcour-reponse">
            <h4>{question[0].titre}</h4>
            {
                question[0].reponses.map(resp => {
                    return (
                        <div className={"form-check lfp " + (resp.vrai ? "right-answer" : "")}
                            style={{paddingLeft:"2vw"}}>
                            <input 
                                className="form-check-input" 
                                id={resp.id} 
                                type="radio"
                                checked={resp.id === reponseChoisieId ? true : false}
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