import Lorem from "../parts/Lorem";

AboutUs.route = {
  path: '/about-us',
  label: 'About us',
  index: 2
};

export default function AboutUs() {
  return <>
    <h2>About us</h2>
    <Lorem paragraphCount={3} />
  </>;
}