import HeroImage from '../parts/HeroImage';
import Lorem from '../parts/Lorem';

Start.route = {
  path: '/',
  label: 'Start',
  index: 1
}
export default function Start() {
  return <>
    <HeroImage
      src="cat.webp"
      alt="Sleeping cat"
      description="Welcome to the pet shelter!" />
    <Lorem paragraphCount={4} />
  </>;
}

