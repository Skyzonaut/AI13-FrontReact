import "../Assets/Styles/Parcours.scss"
import { useState } from "react";

const ParcourCard = ({obj, onClick, isSelected}) => {

    return (
        <div className={"parcours-item " + (isSelected ? "selected" : "")} onClick={onClick}>
            <div><h5>{obj.parcourId}</h5></div>
            <div><b>Début : </b>{obj.dateDebut}</div>
            <div><b>Fin : </b>{obj.dateFin}</div>
        </div>
    )
}

export default ParcourCard;