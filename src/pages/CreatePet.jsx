import { useState } from 'react';
import { useNavigate } from 'react-router';
import useFetch from '../utils/useFetch';

CreatePet.route = {
  path: '/create-pet',
  label: 'Create a pet',
  index: 6
}
export default function CreatePet() {

  //dubble binding form
  const formInitialState = {
    name: '',
    species: '',
    //will trans 0 to null in updateFormData
    ownerId: '0'
  }
  

  const [formData, setFormData] = useState(formInitialState);
  const [formSent, setFormSent] = useState(false);
  
  const navigate = useNavigate();

  const [petOwners, loading] = useFetch('/api/petOwners/');
  const [unique_species, loadingSpecies] = useFetch('/api/unique_species/');
  const [showSpeciesInput, setShowSpeciesInput] = useState(false);

  if (loading || loadingSpecies) return <p>Loading...</p>

  function updateFormData(event) {
    const { name: key, value } = event.target;
    //[key] dynamic object key, we want to update the value of the key that matches the name of the input field
    if (key === "ownerId" && value === "0") {
      setFormData({ ...formData, [key]: '' });
    }
    setFormData({ ...formData, [key]: value });
    // console.log(key, value)
    // console.log("Event update: ",event);
  }

  async function sendForm(event) { 
    event.preventDefault();
    // console.log("Event: ",event);

    const response = await fetch('api/pets/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      // using 0 for ownerId as value in form
      // api want null so we transform
      body: JSON.stringify(formData, (key, value) => key === "ownerId" && value === '0' ? null : value)
    });

    //console.log("send Format response: ", response);

    setFormSent(true);
  }


  function setSpecies(event) {
    //console.log(event);
    if (event.target.value !== "__new__") {
      setShowSpeciesInput(false);
      setFormData({ ...formData, species: event.target.value });
    } else { 
      setShowSpeciesInput(true);
      setFormData({...formData, species: '' });
    }
  }
  if (formSent) {
    return <>
      <p>The pet owner {formData.name} has been created.</p>
      <button onClick={() => {
        setFormSent(false),
        setFormData({ ...formInitialState });}}>
        Create another pet
      </button>
      <button onClick={() => navigate('/pets-and-owners')}>
        Go to pet owners list
      </button>
    </>;
    
  } else {

  return <>
    <h2>Create a new pet</h2>
    <form onSubmit={sendForm}>
      <label>
        Name: <input required
          name="name"
          type="text"
          placeholder="Name"
          value={formData.name}
          onChange={updateFormData} />
      </label>
      <br/>
      <label>
        Species:
        <select name="unique_species" onChange={setSpecies}>
          <option key="" value="" > Select a species </option>
            { 
              unique_species.map(specie =>
                <option key={specie.species} value={specie.species}>
                  {specie.species}
                </option>
              )
            }
            <option value="__new__">Other (addnew species...)</option>
          </select>
          { showSpeciesInput &&
            <input required
            type="text"
            name="species"
            placeholder="Species"
            value={formData.species}
            onChange={updateFormData} />
          }
      </label>
      <br />
      <label>
        Owner:
        <select name="ownerId" value={formData.ownerId} onChange={updateFormData}>
          <option key="0" value="0"> No owner </option>
          {
            petOwners.map(owner =>
              <option
                key={owner.id}
                value={owner.id}>
                {owner.name}
              </option>)
          }
        </select>
      </label>
      <br />
      <button type="submit"> Create </button>
    </form>
  </>;
  }
}