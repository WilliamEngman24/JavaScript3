import { LoremIpsum } from "lorem-ipsum";

export default function Lorem({ paragraphCount }) {

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

  const paragraphs = lorem.generateParagraphs(paragraphCount).split('\n');

  return <>
    {paragraphs.map((paragraph, i) => <p key={i}>{paragraph}</p>)}
  </>;

}