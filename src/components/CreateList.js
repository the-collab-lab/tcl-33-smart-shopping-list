import React from 'react';
import { useHistory } from 'react-router-dom';

function CreateList() {
  const history = useHistory();
  const handleClick = () => history.push('/NewList');

  return (
    <div>
      <button onClick={handleClick}>Create Shopping List </button>
    </div>
  );
}

export default CreateList;
