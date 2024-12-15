import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import Layout from './Pages/Layout/Layout';
import ListeQuestionnaire from './Pages/Questionnaires/ListeQuestionnaire';
import Questionnaire from './Pages/Questionnaires/Questionnaire';
import ParcoursParQuestionnaire from './Pages/Questionnaires/ParcoursParQuestionnaire';
import Accueil from './Pages/Accueil';
import Account from './Pages/User/Account';
import Login from './Pages/User/Login';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.scss';
import ProtectedRoute from './Context/ProtectedRoute';
import { AuthProvider  } from './Context/AuthContext';

export default function Index() {

  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="login" element={<Login />} />
          <Route path="/" element={<Layout titre={"Questionnaires"}/>} >
            <Route index element={<ProtectedRoute><Accueil /></ProtectedRoute>} />
            <Route path="questionnaire" element={<ProtectedRoute><ListeQuestionnaire /></ProtectedRoute>} />
            <Route path="questionnaire/:id/:parcours" element={<ProtectedRoute><Questionnaire /></ProtectedRoute>} />
            <Route path="parcours/:id" element={<ProtectedRoute><ParcoursParQuestionnaire /></ProtectedRoute>} />
            <Route path="account/" element={<ProtectedRoute><Account /></ProtectedRoute>} />
          </Route>
          <Route path="*" element={<Login />}/>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Index />);