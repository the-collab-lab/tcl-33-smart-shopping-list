import React from 'react';
import { useCollection } from 'react-firebase-hooks/firestore';
import { db } from '../lib/firebase';
import ViewList from '../Pages/ViewList';

function DeletePrompt({ token, doc }) {
  const [list, loading, error] = useCollection(db.collection(token));

  const confirmDelete = () => {
    console.log(doc.data().item);
    // db.collection(token)
    // .doc(docId)
    // .update({
    //   item: firebase.firestore.FieldValue.delete()
    // })
    // .then(() => {
    //   console.log('Document successfully updated!');
    // })
  };

  // const confirmDelete = async (id) => {
  //     await db.collection(list).doc(id).delete();
  //     console.log(id)
  //   };
  return (
    <div className="delete">
      <h3>Are you sure you want to delete this item?</h3>
      <button onClick={confirmDelete}>Yes</button>
      <button>No</button>
    </div>
  );
}

export default DeletePrompt;
