import { useNavigate } from "react-router-dom";
import Button from "./Button";

function BackBN() {
  const navigate = useNavigate();

  return (
    <Button type="back" onClick={(e) => { e.preventDefault(); navigate(-1); }} >
      <span className="material-symbols-rounded">
        arrow_back
      </span>Back
    </Button>
  );
}

export default BackBN;
