import React from 'react';

function ErrorMessage({ message, setErrorMessage }) {
  return (
    <div className="error">
      <button onClick={(e) => setErrorMessage('')}>Close</button>
      {message}
    </div>
  );
}

export default ErrorMessage;
