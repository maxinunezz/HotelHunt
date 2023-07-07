import { useNavigate } from 'react-router-dom';
import {ArrowLeft}from "@phosphor-icons/react";

const BackButton = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1); // Navegar hacia atrás en el historial
  };

  return (
    <button
      onClick={handleGoBack}
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
    >
      <ArrowLeft size={32} />
    </button>
    )
};

export default BackButton;
