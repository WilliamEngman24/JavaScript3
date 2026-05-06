import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';

import useFetch from '../utils/useFetch';
import buildPetOwnersUrl from '../utils/buildPetOwnersUrl';
import deletePetOwner from '../utils/deletePetOwner';

PetOwners.route = {
  path: '/pet-owners',
  label: 'Pet owners',
  index: 3.1
};


export default function PetOwners() { 

  const navigate = useNavigate();

  const [search, setSearch] = useState('');

  const [page, setPage] = useState(1);

  const url = buildPetOwnersUrl(search, page);

  const [petOwners, loading, update] = useFetch(url);
  

  useEffect(() => update(), [search, page] );

  if (loading) { return; }

  const { pageCount, total } = petOwners.pagination;

  function changePage(add) { 
    setPage(page + add);
    scrollTo(0, 0);
  }


  return <>
    <h3>Pet owners</h3>
    <label>
      Search by name:
      <input type="text" value={search} onChange={event => setSearch(event.target.value)}/>
    </label>
    <p><b>Found: { total }</b></p>
      <section className="pet-owners">
        {
          petOwners.map(({ documentId: id, firstName, lastName, email, pets }) => {
            return <div key={id}>
              <h4>{firstName} {lastName}</h4>
              <p>{firstName} has the email <a href={`mailto:${email}`}>{email}</a>.</p>
              <button onClick={() => navigate('/update-owner/' + id)}>Edit {name}</button>
              <button onClick={() => deletePetOwner(id, update)}>Delete {name}</button>
              {pets.length === 0 ? <p>{firstName} has no pets</p> : <>
                <p>{firstName} has the pets:</p>
                <ul>
                  {pets.map(({ documentId: id, name, species }) => {
                    // if the function body is wrapped in {} we must return explicitly
                    return <li key={id}>{name} ({species})</li>;
                  })}
                </ul>
              </>
              }
            </div>;
          })
        }
      </section>
    <hr />
    <button disabled={page <= 1} onClick={() => changePage(-1)}>&lt;</button>
    &nbsp;
    <p><b>{page}/{pageCount}</b></p>
    &nbsp;
    <button disabled={page >= pageCount} onClick={() => changePage(1)}>&gt;</button>
  </>;
}