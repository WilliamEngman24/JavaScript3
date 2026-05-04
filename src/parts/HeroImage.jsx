export default function HeroImage({ src, alt, heading }) {
  return <div className="hero-image-holder">
    <img src={`/images/heroes/${src}`} alt={alt} />
    <h2>{heading}</h2>
  </div>;
}