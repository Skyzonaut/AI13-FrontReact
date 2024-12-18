import "../Assets/Styles/Parcours.scss";

const ParcourCard = ({ obj, onClick, isSelected }) => {
    
    const formatDate = (dateString) => {
        if (!dateString) return "Non définie";
        const date = new Date(dateString);
        return date.toLocaleString('fr-FR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };
    
    const getNoteBorderColor = (note) => {
        switch (true) {
            case (note < 5):
                return "#FF4444";
            case (note < 10):
                return "#FFA500";
            case (note < 15):
                return "#FFD700";
            case (note <= 20):
                return "#4CAF50";
            default:
                return "#808080";
        }
    }

    const getNoteColor = (note) => {
        switch (true) {
            case (note < 5):
                return "#FF4444";
            case (note < 10):
                return "#FFA500";
            case (note < 15): 
                return "#FFD700";
            case (note <= 20):
                return "#4CAF50";
            default:
                return "#808080";
        }
    }
    
    return (
        <div 
            className={`parcours-item ${isSelected ? "selected" : ""}`} 
            onClick={onClick}
            style={{ 
                borderLeft: `10px solid ${getNoteBorderColor(obj.note)}`,
                backgroundColor: isSelected ? '#3d3d3d' : ''  // Ajout du background pour la sélection
            }}
        >
            <div>
                <h5 style={{ color: getNoteColor(obj.note) }}>{obj.note}/20</h5>
            </div>
            <div>
                <b>Début : </b>{formatDate(obj.dateDebut)}
            </div>
            <div>
                <b>Fin : </b>{formatDate(obj.dateFin)}
            </div>
        </div>
    );
};

export default ParcourCard;