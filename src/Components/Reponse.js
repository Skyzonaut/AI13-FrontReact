import "../Assets/Styles/Reponse.scss";

const Reponse = ({reponse}) => {
    return (
        <option id={reponse.id} value={reponse.id}>
            {reponse.text}
        </option>
    )
}

export default Reponse;