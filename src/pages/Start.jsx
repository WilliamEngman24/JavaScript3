import Lorem from "../parts/Lorem";
import HeroImage from "../parts/HeroImage";

Start.route = {
  path: '/',
  label: 'Start',
  index: 1
};

export default function Start() {
  return <>
    <HeroImage
      src="cat.webp"
      alt="A napping cute cat"
      heading="Welcome!"
    />
    <Lorem paragraphCount={4} />
  </>;
}