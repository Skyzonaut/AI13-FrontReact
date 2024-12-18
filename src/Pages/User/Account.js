import { useEffect, useState } from "react";
import "../../Assets/Styles/Account.scss";
import { fetchUser, modifyUser, updatePassword } from "../../Services/UserAPI";

const Account = () => {

    const [user, setUser] = useState(null);
    const [modify, setModify] = useState(false);
    const [hasError, setError] = useState(false);
    const [showPasswordChange, setShowPasswordChange] = useState(false);
    const [passwordData, setPasswordData] = useState({
        newPassword: '',
        confirmPassword: ''
    });
    const [passwordError, setPasswordError] = useState('');

    const handlePasswordChange = (e) => {
        const { name, value } = e.target;
        setPasswordData(prev => ({
            ...prev,
            [name]: value
        }));

        // Vérifier la correspondance des mots de passe
        if (name === 'confirmPassword') {
            if (value !== passwordData.newPassword) {
                setPasswordError('Les mots de passe ne correspondent pas');
            } else {
                setPasswordError('');
            }
        }
        if (name === 'newPassword') {
            if (value !== passwordData.confirmPassword && passwordData.confirmPassword) {
                setPasswordError('Les mots de passe ne correspondent pas');
            } else {
                setPasswordError('');
            }
        }
    };

    const handlePasswordSubmit = async () => {
        if (passwordError) {
            alert('Veuillez corriger les erreurs avant de soumettre');
            return;
        }
        
        if (!passwordData.newPassword || !passwordData.confirmPassword) {
            alert('Veuillez remplir tous les champs');
            return;
        }

        try {
            await updatePassword(user.id, passwordData.newPassword);
            alert('Mot de passe mis à jour avec succès');
            window.location.reload();
        } catch (error) {
            alert('Erreur lors de la mise à jour du mot de passe');
        }
    };

    useEffect(() => {
        const loadUser = async (pseudo) => {
            fetchUser(pseudo)
            .then((data) => {
                setUser(data);
            })
            .catch((err) => {
                setError(err);
            })
        };
        loadUser(JSON.parse(localStorage.getItem("user")).pseudo);
    }, [])

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUser((prevUser) => ({
            ...prevUser,
            [name]: value,
        }));
        console.log(user)
    };

    const handleSave = async () => {
        try {
            await modifyUser(user);
            window.location.reload();
        } catch (error) {
            alert("Une erreur est survenue lors de la mise à jour de vos informations");
        }
    };

    if(hasError) {
        return(
            <div>Erreur...</div>
        )
    }

    if(!user) {
        return(
            <div>Loading...</div>
        )
    }
    
    console.log(user)
    return (
        <div className="account-main-tab container">
            <h2 className="display-6">Mon compte</h2>
            <div className="row">
                <div className="col-md m-3">
                    <label data-bs-theme="dark">Pseudo</label>
                    <input 
                        type="text" 
                        name="pseudo"  // Ajout de name
                        className="form-control" 
                        disabled={!modify} 
                        data-bs-theme="dark" 
                        value={user.pseudo}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="col-md m-3">
                    <label data-bs-theme="dark">Email</label>
                    <input 
                        type="text" 
                        name="mail"  // Ajout de name
                        className="form-control" 
                        disabled={!modify} 
                        data-bs-theme="dark" 
                        value={user.mail}
                        onChange={handleInputChange}
                    />
                </div>
            </div>
    
            <div className="row">
                <div className="col-md m-3">
                    <label data-bs-theme="dark">Nom de famille</label>
                    <input 
                        type="text" 
                        name="nom" 
                        className="form-control" 
                        disabled={!modify} 
                        data-bs-theme="dark" 
                        value={user.nom}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="col-md m-3">
                    <label data-bs-theme="dark">Prénom</label>
                    <input 
                        type="text" 
                        name="prenom"
                        className="form-control" 
                        disabled={!modify} 
                        data-bs-theme="dark" 
                        value={user.prenom}
                        onChange={handleInputChange}
                    />
                </div>
            </div>
    
            <div className="row">
                <div className="col-md m-3">
                    <label data-bs-theme="dark">Entreprise</label>
                    <input 
                        type="text" 
                        name="company"
                        className="form-control" 
                        disabled={!modify} 
                        data-bs-theme="dark" 
                        value={user.company}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="col-md m-3">
                    <label data-bs-theme="dark">Phone</label>
                    <input 
                        type="tel" 
                        name="phone"
                        className="form-control" 
                        disabled={!modify} 
                        data-bs-theme="dark" 
                        value={user.phone}
                        onChange={handleInputChange}
                    />
                </div>
            </div>
                
            <div className="row">
                <div className="col-md m-3">
                    <button 
                        className="btn btn-outline-dark" 
                        style={{border: 'solid grey 2px', color: 'lightgrey'}}
                        onClick={() => setModify(!modify)}
                    >
                        {modify ? "Annuler les modifications" : "Modifier mes informations"}
                    </button>
                    
                    {modify && (
                        <button 
                            className="btn btn-outline-success ms-3" 
                            style={{border: 'solid grey 2px', color: 'lightgrey'}}
                            onClick={handleSave}
                        >
                            Sauvegarder les modifications
                        </button>
                    )}
                    <button 
                        className="btn btn-outline-warning ms-3" 
                        style={{border: 'solid grey 2px', color: 'lightgrey'}}
                        onClick={() => setShowPasswordChange(!showPasswordChange)}
                    >
                        {showPasswordChange ? "Annuler" : "Changer mon mot de passe"}
                    </button>
                </div>
            </div>

            {showPasswordChange && 
            (
                <>
                    <div className="row">
                        <div className="col-md m-3">
                            <label data-bs-theme="dark">Nouveau mot de passe</label>
                            <input 
                                type="password" 
                                className="form-control" 
                                name="newPassword"
                                value={passwordData.newPassword}
                                onChange={handlePasswordChange}
                                data-bs-theme="dark"
                            />
                        </div>
                        <div className="col-md m-3">
                            <label data-bs-theme="dark">Confirmez le mot de passe</label>
                            <input 
                                type="password" 
                                className="form-control" 
                                name="confirmPassword"
                                value={passwordData.confirmPassword}
                                onChange={handlePasswordChange}
                                data-bs-theme="dark"
                            />
                        </div>
                    </div>
                        
                    <div className="row">
                        <div className="col-md m-3">
                            {passwordError && (
                                <div className="text-danger mb-3">{passwordError}</div>
                            )}
                            <button 
                                className="btn btn-outline-success"
                                style={{border: 'solid grey 2px', color: 'lightgrey'}}
                                onClick={handlePasswordSubmit}
                                disabled={!!passwordError}
                            >
                                Confirmer la modification
                            </button>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default Account;