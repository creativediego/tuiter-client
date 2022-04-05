import React from 'react';
import './Tuits.css';
import Tuit from './Tuit';
/**
 * A container to display a list of tuits.
 */
const Tuits = ({ tuits = [] }) => {
  return (
    <div>
      <ul className='ttr-tuits list-group'>
        {tuits &&
          Object.values(tuits).map((tuit) => {
            return tuit ? <Tuit key={tuit.id} tuitFromList={tuit} /> : null;
          })}
      </ul>
    </div>
  );
};

export default Tuits;
