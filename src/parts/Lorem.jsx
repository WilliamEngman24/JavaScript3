import { LoremIpsum } from "lorem-ipsum";

export default function LoremIpsumPage({ paragraphCount }) {

  const lorem = new LoremIpsum({
    sentencesPerParagraph: {
      max: 8,
      min: 4
    },
    wordsPerSentence: {
      max: 16,
      min: 4
    }
  });

  const paragraphs = lorem.generateParagraphs(paragraphCount) .split('\n');

  console.log(paragraphs);

  return <>
    {paragraphs.map((paragraph, index) => (
      <p key={index}>
        {paragraph}
      </p>
    ))}
  </>;
}