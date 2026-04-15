import "../Pages_css/BackButton.css";
import { useNavigate, useParams } from "react-router-dom";

export default function BackButton(page) {
  const navigate = useNavigate();

  const goToBack = () => {
    navigate(-1);
  };

  return (
    <div>
      <button className="back-button" aria-label="Go back" onClick={goToBack}>
        ←
      </button>
    </div>
  );
}
