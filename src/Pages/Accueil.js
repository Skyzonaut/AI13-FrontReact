import { Link } from "react-router-dom";
import "../Assets/Styles/Accueil.scss"
import { useEffect, useState } from "react";
import { fetchUserStats } from "../Services/QuestionnaireAPI";

const Accueil = () => {

  const [stats, setStats] = useState(null);

  useEffect(() => {
    const loadStats = async () => {
      const data = await fetchUserStats("Ae484AZefaze");
      setStats(data)
    };
    loadStats();
    console.log(stats)
  }, [])

  
  if (!stats) {
    return <div>Loading...</div>;
}

  return (
    <>
      <h1 class="display-6">Statistiques</h1>
      <div className="stats-container">
        <div className="graphs-pane">
          Test 
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
              <tr>
                <td></td>
                <td>{stats.moy}</td>
                <td>{stats.min}</td>
                <td>{stats.max}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
};

export default Accueil;