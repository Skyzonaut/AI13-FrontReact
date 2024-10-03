import { useEffect, useState } from "react";
import "../../Assets/Styles/Account.scss";
import { fetchUser } from "../../Services/UserAPI";

const Account = () => {

    const [user, setUser] = useState(null);
    const [modify, setModify] = useState(false);

    useEffect(() => {
        const loadUser = async () => {
            fetchUser()
                .then((data) => {
                    setUser(data);
                })
        };
        loadUser();
    }, [])

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUser((prevUser) => ({
            ...prevUser,
            [name]: value,
        }));
    };

    if(!user) {
        return(
            <div>Loading...</div>
        )
    }
    return (
        <div className="account-main-tab container">
            <h2 className="display-6">Mon compte</h2>
            <div class="row">
                <div className="col-md m-3">
                    <label data-bs-theme="dark">Pseudo</label>
                    <input 
                        type="text" 
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
                        className="form-control" 
                        disabled={!modify} 
                        data-bs-theme="dark" 
                        value={user.mail}
                        onChange={handleInputChange}
                    />
                </div>
            </div>
            <div class="row">
                <div className="col-md m-3">
                    <label data-bs-theme="dark">Nom de famille</label>
                    <input 
                        type="text" 
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
                        className="form-control" 
                        disabled={!modify} 
                        data-bs-theme="dark" 
                        value={user.prenom}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="row">
                    <div className="col-md m-3">
                        <button 
                            className="btn btn-outline-dark" 
                            style={{border: 'solid grey 2px', color: 'lightgrey'}}
                            onClick={() => setModify(!modify)}
                        >
                            Modifier mes informations
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Account;