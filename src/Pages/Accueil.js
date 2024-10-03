import { Link } from "react-router-dom";
import "../Assets/Styles/Accueil.scss"
import { useEffect } from "react";

const Accueil = () => {

  useEffect(() => {
    
  })

  return (
    <>
      <h1 class="display-6">Statistiques</h1>
      <div className="stats-container">
        <div className="graphs-pane">
          Test pute
        </div>
        <div className="liste-questionnaire">
          <table className="table table-striped">
            <thead>
              <th>Questionnaire</th>
              <th>Moyenne</th>
              <th>Minimum</th>
              <th>Maximum</th>
            </thead>
            <tbody>

            </tbody>
          </table>
        </div>
      </div>
    </>
  )
};

export default Accueil;