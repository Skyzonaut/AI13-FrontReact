import { Link } from "react-router-dom";
import "../../index.scss"
import "../../Assets/Styles/Account.scss"
import { AuthContext } from "../../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { login } from "../../Services/UserAPI";

const Login = () => {

    window.history.pushState(null, document.title, window.location.href);
    window.addEventListener('popstate', function(event) {
        window.history.pushState(null, document.title, window.location.href);
    });

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { setLoginConf } = useContext(AuthContext);
    const navigate = useNavigate();
  
    const handleLogin = async () => {
        login(username, password)
            .then((res) => {
                setError("")
                setLoginConf(res.token, res.user); 
                navigate('/'); 
            })
            .catch((err) => {
                console.log(err)
                setError("Impossible de vous connecter. Vos informations de connexions sont incorrectes")
            })
        
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
          e.preventDefault(); // Empêche le comportement par défaut du navigateur
          handleLogin(e); // Appelle la fonction de soumission
        }
      };

    return (
        <div className="main-layout account-layout">
            <img 
                style={{height: '28vh'}}
                src={process.env.PUBLIC_URL + "/logo.svg"} 
                alt="react-logo"
            />
            <h1 style={{textAlign: 'center'}}>Application Questionnaire</h1>
            <div className="container account-main-tab">
                <div className="row m-3">
                    <div className="col-md m-3">
                        <h1 className="display-6">Connexion</h1>
                        <h5 className="display-15" style={{color:"red"}}><i>{error}</i></h5>
                    </div>
                </div>
                <form>
                    <div className="row m-3">
                        <div className="col-md m-3">
                            <label data-bs-theme="dark" for="pseudo">Pseudo</label>
                            <input 
                                data-bs-theme="dark" 
                                className="form-control" 
                                type="text" 
                                id="pseudo" 
                                name="pseudo" 
                                placeholder="Votre pseudo"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                onKeyDown={handleKeyDown}
                            />
                        </div>
                    </div>
                    <div className="row m-3">
                        <div className="col-md m-3">
                            <label data-bs-theme="dark" for="password">Mot de passe</label>
                            <input 
                                data-bs-theme="dark" 
                                className="form-control"
                                type="password" 
                                name="password" 
                                placeholder="Entrez votre mot de passe" 
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                onKeyDown={handleKeyDown}
                            />
                        </div>
                    </div>
                </form>
                <div className="row m-3">
                    <div className="col-md m-3">
                        <inputButton 
                            data-bs-theme="dark" 
                            className="form-control"
                            style={{width: '6vw', textAlign:"center"}}
                            onClick={handleLogin}>Login
                        </inputButton>
                    </div>
                </div>
                <div className="row m-3">
                    <div className="col-md m-3" data-bs-theme="dark">
                        <Link to="/forgot">
                            J'ai oublié mon mot de passe
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default Login;