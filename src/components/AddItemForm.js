import React from 'react';

function AddItemForm() {
  return (
    <div>
      <h2>Item Name</h2>
      <div onChange={this.onChangeValue}>
        <input type="radio" value="7" name="Urgency" /> Soon
        <input type="radio" value="14" name="Urgency" /> Kind of Soon
        <input type="radio" value="30" name="Urgency" /> Not Soon
      </div>
    </div>
  );
}

export default AddItemForm;
