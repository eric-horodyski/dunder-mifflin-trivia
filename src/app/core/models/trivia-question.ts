import { Character } from './character';

export interface TriviaQuestion {
  quote: string;
  answer: Character;
  options: Character[];
}
