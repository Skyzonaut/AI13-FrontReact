import ParcourReponse from "./ParcourReponse";
import Question from "./Question";

const ParcourView = ({ content, questionnaire }) => {

    if (!content) {
        return <div><i>Sélectionnez un parcours</i></div>
    }

    return (
      <div className="parcours-view">
        {
            content.questions.map(question => {
                const questionQuestionnaire = questionnaire.questions
                    .filter(q => q.id === question.id);
                    console.log(questionQuestionnaire)
                return (
                    <ParcourReponse 
                        reponse={question.reponse} 
                        question={questionQuestionnaire}
                    />
                )
            })
        }
      </div>
    );
  };
  
  export default ParcourView;