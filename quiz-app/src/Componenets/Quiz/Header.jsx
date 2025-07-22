import React from 'react';
import { useNavigate } from 'react-router-dom';

const Header = () => {
    const Navigate = useNavigate();
    const main_page = () => {
        Navigate('/quiz')
    };
  return (
    <div className="quiz-page-content">
      <h2 className="center-title">📒 Quiz-App</h2>
      <button className="quiz-page" onClick={main_page}>
        Click here to attempt the quiz !
      </button>
    </div>
  );
};

export default Header;
