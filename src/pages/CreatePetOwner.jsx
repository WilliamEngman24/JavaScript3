import { useState } from 'react';
import { useNavigate } from 'react-router';

CreatePetOwner.route = {
  path: '/create-pet-owner',
  label: 'Create a pet owner',
  index: 4
}
export default function CreatePetOwner() {

  //dubble binding form
  const formInitialState = {
    name: '',
    email: ''
  }

  const [formData, setFormData] = useState(formInitialState);
  const [formSent, setFormSent] = useState(false);
  const navigate = useNavigate();

  async function sendForm(event) { 
    event.preventDefault();
    // console.log("Event: ",event);

    const response = await fetch('api/petOwners', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });

    //console.log("send Format response: ", response);

    setFormSent(true);
  }


  function updateFormData(event) {
    const { name: key, value } = event.target;
    //[key] dynamic object key, we want to update the value of the key that matches the name of the input field
    setFormData({ ...formData, [key]: value });
    // console.log(key, value)
    // console.log("Event update: ",event);
  }

  if (formSent) {
    return <>
      <p>The pet owner {formData.name} has been created.</p>
      <button onClick={() => {
        setFormSent(false),
        setFormData({ ...formInitialState });}}>
        Create another pet owner
      </button>
      <button onClick={() => navigate('/pets-and-owners')}>
        Go to pet owners list
      </button>
    </>;
    
  } else {

  return <>
    <h2>Create a new pet owner</h2>
    <form onSubmit={sendForm}>
      <label>
        Name: <input
          name="name"
          type="text"
          placeholder="Name"
          value={formData.name}
          onChange={updateFormData} />
      </label>
      <br/>
      <label>
        Email: <input
          name="email"
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={updateFormData} />
      </label>
      <br/>
      <button type="submit">
        Create
      </button>
    </form>
  </>;
  }
}