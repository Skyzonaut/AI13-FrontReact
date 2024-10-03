import { Link } from "react-router-dom";
import { componentDidMount } from "react";
import "../../index.scss"
import "../../Assets/Styles/Account.scss"

const Login = () => {

    window.history.pushState(null, document.title, window.location.href);
    window.addEventListener('popstate', function(event) {
        window.history.pushState(null, document.title, window.location.href);
    });

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
                                style={{height: '4vh'}}
                                name="pseudo" 
                                placeholder="Votre pseudo"
                            />
                        </div>
                    </div>
                    <div className="row m-3">
                        <div className="col-md m-3">
                            <label data-bs-theme="dark" for="password">Mot de passe</label>
                            <input 
                                data-bs-theme="dark" 
                                className="form-control"
                                style={{height: '4vh'}}
                                type="text" 
                                name="password" 
                                placeholder="Enter your password" 
                                id="password"
                            />
                        </div>
                    </div>
                </form>
                <div className="row m-3">
                    <div className="col-md m-3">
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