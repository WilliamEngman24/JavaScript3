export default function HeroImage({ src, alt, description }) { 
  return <div className="hero-image-holder">
    <img src={`/images/heroes/${src}`} alt={alt} />
    <h2>{description}</h2>
  </div>;
}