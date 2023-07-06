import React from 'react';
import { useNavigate } from 'react-router-dom';

const BackButton = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1); // Navegar hacia atrás en el historial
  };

  return (
    <button onClick={handleGoBack}>Back</button>
  );
};

export default BackButton;
