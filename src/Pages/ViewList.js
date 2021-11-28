import React, { useState, useMemo } from 'react';
import { useCollection } from 'react-firebase-hooks/firestore';
import EmptyListPrompt from '../components/EmptyListPrompt';
import DeletePrompt from '../components/DeletePrompt';
import { db } from '../lib/firebase';
import { doc } from 'prettier';
import styled from '@emotion/styled';
import { css, jsx } from '@emotion/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBan } from '@fortawesome/free-solid-svg-icons';

//  #################### VIEW LIST COMPONENT ###################

const ViewList = ({ token, checkItem }) => {
  const [list, loading, error] = useCollection(db.collection(token));
  const [deleteButton, setDeleteButton] = useState(false);
  const [filterValue, setFilterValue] = useState('');
  const [docValue, setDocValue] = useState('');

  const confirmDelete = (doc) => {
    setDeleteButton(true);
    setDocValue(doc);
  };

  const yesDeleteButton = (e) => {
    e.preventDefault();
    db.collection(token)
      .doc(docValue.id)
      .delete()
      .then(() => {
        setDeleteButton(false);
      })
      .catch((error) => {
        console.error('removing document: ' + error);
      });
  };

  const noDeleteButton = (e) => {
    setDeleteButton(false);
  };

  const handleFilterChange = (e) => {
    e.preventDefault();
    setFilterValue(e.target.value);
  };

  const filteredDocs = useMemo(() => {
    if (loading || error || !list) {
      return [];
    }

    return list.docs.filter((doc) => {
      if (!filterValue) {
        return true;
      }
      return doc.data().item.toLowerCase().includes(filterValue.toLowerCase());
    });
  }, [list, loading, error, filterValue]);

  const handleItemCheck = (doc) => {
    if (isExpired(doc)) {
      checkItem(doc);
    }
  };

  return (
    <div>
      <h2>Grocery List</h2>
      <div>
        <form action="#">
          <label htmlFor="filter-list">Filter List</label>
          <br />
          <input
            type="search"
            id="filter-list"
            value={filterValue}
            onChange={handleFilterChange}
            placeholder="Enter your item"
          />
        </form>
      </div>

      <List
        deleteButton={deleteButton}
        loading={loading}
        error={error}
        docs={filteredDocs}
        handleItemCheck={handleItemCheck}
        isFiltered={!!filterValue}
        yesDeleteButton={yesDeleteButton}
        noDeleteButton={noDeleteButton}
        confirmDelete={confirmDelete}
      />
    </div>
  );
};

const ListItemsStyling = styled('li')`
  background-color: #a7d82e;
  margin-bottom: 1rem;
`;

const List = ({
  loading,
  error,
  docs,
  handleItemCheck,
  isFiltered,
  deleteButton,
  yesDeleteButton,
  noDeleteButton,
  confirmDelete,
}) => {
  if (error) {
    return <strong>Error: {JSON.stringify(error)}</strong>;
  }

  if (loading) {
    return <span>Collection: Loading...</span>;
  }

  if (!isFiltered && docs.length === 0) {
    return <EmptyListPrompt />;
  }

  if (docs) {
    return (
      <div>
        {deleteButton ? (
          <DeletePrompt
            yesDeleteButton={yesDeleteButton}
            noDeleteButton={noDeleteButton}
          />
        ) : null}
        <ul>
          {docs.map((doc) => (
            <ListItemsStyling
              key={doc.id}
              style={{ listStyleType: 'none' }}
              className="listItemStylingClass"
            >
              <div className="checkboxDiv">
                <input
                  type="checkbox"
                  onChange={() => handleItemCheck(doc)}
                  checked={!isExpired(doc)}
                  value={doc.id}
                />{' '}
              </div>
              <div className="itemDiv">{doc.data().item} </div>
              <div className="deleteButtonDiv">
                <FontAwesomeIcon
                  icon={faBan}
                  className="banButton"
                  onClick={() => confirmDelete(doc)}
                />
              </div>
              <div className="timesPurchasedDiv">
                {doc.data().timesPurchased}{' '}
              </div>
            </ListItemsStyling>
          ))}
        </ul>
      </div>
    );
  }
};

// ################### IS-EXPIRED FUNCTION ##################

const isExpired = (doc) => {
  if (doc.data().lastPurchased === null) return true;

  const checkedTime = doc.data().lastPurchased.toDate();
  let expireTime = checkedTime;

  expireTime.setDate(checkedTime.getDate() + 1);
  return expireTime < new Date();
};

export default ViewList;
