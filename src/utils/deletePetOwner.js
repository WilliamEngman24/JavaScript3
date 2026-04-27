export default async function deletePetOwner(id, pets, update) { 

  //alt to using cascade in the database
  await stopOwningAnyPets(id, pets);

  let error, data;
  // try networks errors
  try {
    let response = await fetch('/api/petOwners/' + id, { method: 'DELETE' });
    data = await response.json();
  }
  catch (_error) { 
    error = _error;
  }
  //errors can also come from the rest api
  error = error || data.error;

  // found error to avoid updating the ui with deleted pet owner
  if (error) { 
    alert('Could not delete pet owner: ' + error);
  }

  //update list of pets if any become ownerless
  update();

  async function stopOwningAnyPets(petOwnerId, pets) {
    //get pets to owner bu filter
    const ownedPets = pets.filter(({ ownerId }) => ownerId === petOwnerId);
    //loop set ownerId to null
    for (let { id } of ownedPets) {
      await fetch('api/pets/' + id, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ownerId: null })
      })
    }
  }
}