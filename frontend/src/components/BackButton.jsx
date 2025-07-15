import React from 'react';
import { useNavigate } from 'react-router-dom';

const BackButton = ({ className = '' }) => {
  const navigate = useNavigate();

  return (
    <button
      className={`btn btn-secondary mb-3 ${className}`}
      onClick={() => navigate(-1)}
    >
      ← Back
    </button>
  );
};

export default BackButton;
