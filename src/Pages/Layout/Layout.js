import { Outlet, NavLink, useNavigate } from "react-router-dom";
import "../../Assets/Styles/Layout.scss";
const Layout = ({titre}) => {

  const navigate = useNavigate();

  return (
    <div>
      <div className="App-header">
        <NavLink 
          to="/" 
          className="header-logo-container"
          
          style={
            ({ isActive }) => ({
            color: isActive ? 'grey' : '', 
          })}
        >
          <img 
            className="App-logo"
            src={process.env.PUBLIC_URL + "/logo.svg"} 
            alt="react-logo"
          />
          <span 
            className="application-title"
          >{titre}</span>
        </NavLink>
          
        <NavLink to="/questionnaire" 
              className="App-header-link"
              style={
                ({ isActive }) => ({
                color: isActive ? 'grey' : '', 
              })}
        >
          <div>Liste des questionnaires</div>
        </NavLink>
        <NavLink 
          to="/account"
          className="header-logo-container"
          style={{marginLeft:'auto',marginRight:'0'}}
        > 
            <img alt="Compte" 
            id="account-logo"
            title="Compte"
            src={process.env.PUBLIC_URL + "/account.png"} 
            />
          
        </NavLink>
        <div 
          // to="/login"
          className="header-logo-container"
          style={{marginLeft:'0',marginRight:'2vw'}}
          onClick={() => {
            if (window.confirm("Êtes-vous sûr de vouloir vous déconnecter ?")) {
                navigate(`/login`)
            }
        }}
        > 
            <img alt="Deconnexion" 
            id="account-logo"
            title="Deconnexion"
            src={process.env.PUBLIC_URL + "/deconnect.png"} 
            />
          
        </div>
      </div>
      
      <div className="main-layout">
        
        <Outlet />
      </div>
    </div>
  )
};

export default Layout;