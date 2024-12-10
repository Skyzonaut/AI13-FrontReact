import { Link } from "react-router-dom";
import "../Assets/Styles/Accueil.scss"
import { useEffect, useState } from "react";
import { fetchUserStats } from "../Services/QuestionnaireAPI";

const Accueil = () => {

  const [stats, setStats] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadStats = async () => {
      try {
        const data = await fetchUserStats("pseudo");
        setStats(data)
        setError(null)
      } catch (error) {
        setError(error)
      }
    };
    loadStats();
  }, [])

  if (error != null) {
    return <div>Erreur : {error.message}</div>;
  }
  
  if (!stats) {
    return <div>Loading...</div>;
  }

  console.log(stats)

  return (
    <>
      <h1 className="display-6">Statistiques</h1>
      <div className="stats-container">
        <div className="graphs-pane">
          Test 
        </div>
        <div className="liste-questionnaire">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Titre</th>
                <th>Moyenne</th>
                <th>Minimum</th>
                <th>Maximum</th>
              </tr>
            </thead>
            <tbody>
              {
                Object.entries(stats).map(([questId, questionnaire])=> {
                  return(
                    <tr>
                      <td><i>{questionnaire.questionnaireTitle}</i></td>
                      <td>{questionnaire.moy}</td>
                      <td>{questionnaire.min}</td>
                      <td>{questionnaire.max}</td>
                    </tr>
                  )
                })
              }
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
};

export default Accueil;