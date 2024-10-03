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

export default function Index() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout titre={"Questionnaires"}/>} >
          <Route index element={<Accueil />} />
          <Route path="questionnaire" element={<ListeQuestionnaire />} />
          <Route path="questionnaire/:id" element={<Questionnaire />} />
          <Route path="parcours/:id" element={<ParcoursParQuestionnaire />} />
          <Route path="account/" element={<Account />} />
        </Route>
        <Route path="login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Index />);