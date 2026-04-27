import { useState } from 'react';
import { Link } from 'react-router';
import { useNavigate } from 'react-router';

import deletePetOwner from '../utils/deletePetOwner';

import useFetch from '../utils/useFetch';
import HeroImage from '../parts/HeroImage';


PetsAndOwners.route = {
  path: '/pets-and-owners',
  label: 'Pets and Owners',
  index: 3
}

export default function PetsAndOwners() {

  const navigate = useNavigate();

  const [pets, petOwners, loading, update] = useFetch(
    '/api/pets',
    '/api/petOwners'
  );

  if (loading) return;
  const petsByOwnerId = Object.groupBy(pets, pet => pet.ownerId);

  const ownerlessPets = petsByOwnerId.null ?? [];

  return !loading && <>
    <HeroImage
      src="dog-and-owner.webp"
      alt="Dog and Owner"
      description="Learn about our pets and their owners!" />
    <h3> Homeless Pets </h3>
    <section className="pets">
      {ownerlessPets.map(({ id, name, species }) => <div key={id}>
        <h4>{name}</h4>
        <p>{name} is a {species}</p>
      </div>)}
    </section>

    <h3> Pet Owners </h3>
    <section className="pet-owners">
      {petOwners
        .map(({ id, name, email }) => {
        const ownedPets = petsByOwnerId[id] ?? []
        return <div key={id}>
          <h4>{name}</h4>
          <p>{name} has the email <a href={`mailto:${email}`}>{email}</a></p>
          {ownedPets.length === 0 ? <p>{name} does not own any pets.</p> : <>
            <p>{name} owns the following pets:</p>
            <ul>
              {ownedPets.map(({ id, name, species }) =>  
                <li key={id}> {name} ({ species }) </li>
              )}
            </ul>
          </>}
          <button className="btn-edit" onClick={() => navigate('/update-owner/' + id)}> Edit {name} </button>
          <button className="btn-delete" onClick={() => deletePetOwner(id, pets, update)}>Delete {name}</button>
        </div>
      })}
    </section>
  </>;
}