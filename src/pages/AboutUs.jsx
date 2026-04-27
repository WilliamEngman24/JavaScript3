import Lorem from "../parts/Lorem";

//self registration of route info on the component itself,
// then we can do a glob import of all pages and extract the route info from the components
AboutUs.route = {
  path: '/about-us',
  label: 'About us',
  index: 2
}

export default function AboutUs() { 
  return <>
    <h2>About Us</h2>
    <Lorem paragraphCount={4} />
  </>;
}