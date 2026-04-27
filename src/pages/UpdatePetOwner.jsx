import { useState, useEffect  } from 'react';
import { useNavigate, useParams } from 'react-router';

import useFetch from '../utils/useFetch';

UpdatePetOwner.route = {
  path: '/update-owner/:id',
}
export default function UpdatePetOwner() {

  const { id } = useParams();

  const [formData, setFormData] = useState({
    id: '',
    name: '',
    email: ''
  });

  const [formSent, setFormSent] = useState(false);
  const navigate = useNavigate();

  const [petOwner, loading] = useFetch('/api/petOwners/' + id);

  console.log(petOwner);

  useEffect(() => {
    if (!loading && petOwner) {
      setFormData({
        id: petOwner.id ?? '',
        name: petOwner.name ?? '',
        email: petOwner.email ?? ''
      })
    }
  }, [loading, petOwner]);

  if (loading) return <p>Loading...</p>

  function updateFormData(event) {
    const { name: key, value } = event.target;
    //[key] dynamic object key, we want to update the value of the key that matches the name of the input field
    setFormData({ ...formData, [key]: value });
    // console.log(key, value)
    // console.log("Event update: ",event);
  }

  async function sendForm(event) { 
    event.preventDefault();
    // console.log("Event: ",event);

    const response = await fetch('/api/petOwners/' + id, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });

    //console.log("send Format response: ", response);

    setFormSent(true);
  }

  if (formSent) {
    return <>
      <p>The pet owner {formData.name} has been updated.</p>
      <button onClick={() => navigate('/pets-and-owners')}>
        Return to pet owners list
      </button>
    </>;
    
  } else {

  return <>
    <h2>Edit {petOwner.name}</h2>
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
        Update
      </button>
    </form>
  </>;
  }
}