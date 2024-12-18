import ParcourReponse from "./ParcourReponse";
import Question from "./Question";

const ParcourView = ({parcour, questionnaire }) => {
    
    if (!parcour) {
        return <div><i>Sélectionnez un parcours</i></div>
    }

    if (!questionnaire) {
        return <div><i>Impossible de trouver le questionnaire associé</i></div>
    }
    
    return (
      <div className="parcours-view">
        {
            questionnaire.questions.map(question => {
                return (
                    <ParcourReponse 
                        reponse={parcour.questions?.filter(q => q.id === question.id)} 
                        question={question}
                    />
                )
            })
        }
      </div>
    );
  };
  
  export default ParcourView;