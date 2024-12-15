import { useNavigate } from "react-router-dom";
import { fetchAllQuetionnaire, fetchParcoursByUserId, startNewQuestionnaire } from "../../Services/QuestionnaireAPI";
import { useState, useEffect } from "react";
import { apiUrl } from "../../Properties";


const ListeQuestionnaire = () => {
  const [questionnaires, setQuestionnaires] = useState(null);
  const [userParcours, setUserParcours] = useState(null);
  
  const navigate = useNavigate();

  useEffect(() => {
      const loadQuestionnaire = async () => {
        fetchAllQuetionnaire()
          .then((data) => {
            setQuestionnaires(data);
          })
      };

      const loadParcours = async () => {
        fetchParcoursByUserId(localStorage.getItem("userId"))
          .then((data) => {
            setUserParcours(data);
          })
      };
      loadParcours();
      loadQuestionnaire();

  }, []);

  
  const handleNavigation = (id) => {
    if(userParcours.map(obj => obj.questionnaireId).includes(id)) {
      navigate(`/parcours/${id}`);
    } else {

      if (window.confirm("Êtes-vous sûr de vouloir commencer un nouvel essai ?")) {
          startNewQuestionnaire(localStorage.getItem("userId"), id).then((res) => {
            navigate(`/questionnaire/${id}/${res.parcoursId}`)
          })
      }
    }
  };
  
  if (!questionnaires || !userParcours) {
      return <div>Loading...</div>;
  }


  if(questionnaires.length === 0) {
    return <div><i>Aucun questionnaire n'a été trouvé</i></div>
  }

  return (
    <>
      <h1 className="display-6">Liste des questionnaires</h1>
      <table className="table table-striped table-dark table-hover table-responsive">
        <thead>
          <tr>
            <th scope="col">Identifiant</th>
            <th scope="col">Titre</th>
            <th scope="col">Réalisé</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {
            questionnaires.map(questionnaire => {
              const parcoursRealiseDisplay = userParcours
                .map(obj => obj.questionnaireId)
                .includes(questionnaire.id) 
                  ? (
                      <>
                        Oui <br />
                        {
                        userParcours.filter(p => p.questionnaireId === questionnaire.id).length > 1
                          ? userParcours.filter(p => p.questionnaireId === questionnaire.id).length + " essais réalisés"
                          : userParcours.filter(p => p.questionnaireId === questionnaire.id).length + " essai réalisé"
                        }
                      </>
                    )
                  : "Non";

              return (
                <tr key={questionnaire.id} className="align-middle">
                  <td>{questionnaire.id}</td>
                  <td>
                    {questionnaire.titre}
                  </td>
                  <td><i>{parcoursRealiseDisplay}</i>
                  </td>
                  <td className="text-end">
                    <button
                      className="btn btn-link"  // Classe Bootstrap pour un bouton stylisé
                      style={{textDecoration: 'none',}}
                      onClick={() => handleNavigation(questionnaire.id)}
                    >
                      {
                        userParcours.map(obj => obj.questionnaireId).includes(questionnaire.id)
                        ? "Visualiser"
                        : "Commencer"
                      }
                    </button>
                  </td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
      
    </>
  )
};
  
  export default ListeQuestionnaire;