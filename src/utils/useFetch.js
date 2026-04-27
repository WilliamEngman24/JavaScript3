import { useState, useEffect } from 'react';

//memory cache for in progress fetches
const inProgress = {};

export default function useFetch(...urls) { 
  
  // create empty data array
  const [data, setData] = useState(new Array(urls.length).fill(null));
  // flag for if fetching is in progress
  const [loading, setLoading] = useState(true);

  function update() {
    //protects against StrictMode

    inProgress[urls] = inProgress[urls] ||
      urls.map(url => fetch(url).then(response => response.json()));
    
    (async () => { 
      //wait for all fetches to complete and set data
      setData(await Promise.all(inProgress[urls]));
      setLoading(false);

      //empty in progress cache for urls
      delete inProgress[urls];
    })();
  }

  useEffect(update, [])

  // return the data and loading flag
  return [...data, loading, update];
}