/* eslint-disable no-underscore-dangle */
import { Component, OnInit } from '@angular/core';
import { Character, TriviaQuestion } from '../core/models';
import { ScoreService } from '../core/score.service';
import { CharacterService } from './character.service';
import { TriviaQuestionService } from './trivia-question.service';

type QuestionState = 'Playing' | 'Correct' | 'Incorrect';

@Component({
  selector: 'app-trivia',
  templateUrl: './trivia.page.html',
  styleUrls: ['./trivia.page.scss'],
})
export class TriviaPage implements OnInit {
  triviaQuestion: TriviaQuestion;
  loading = true;
  state: QuestionState = 'Playing';
  selectedOption = -1;

  constructor(
    private character: CharacterService,
    private trivia: TriviaQuestionService,
    private score: ScoreService
  ) {}

  async ngOnInit() {
    await this.score.loadScore();
    this.loading = true;
    this.character.loadCharacters().subscribe(() => this.loadTriviaQuestion());
  }

  loadTriviaQuestion() {
    this.selectedOption = -1;
    this.state = 'Playing';
    this.loading = true;
    this.trivia.getTriviaQuestion().subscribe((question) => {
      this.triviaQuestion = question;
      this.loading = false;
    });
  }

  async selectAnswer(character: Character, idx: number) {
    this.selectedOption = idx;
    if (this.isCorrectAnswer(character)) {
      this.state = 'Correct';
      await this.score.incrementScore();
    } else {
      this.state = 'Incorrect';
    }
  }

  isCorrectAnswer(character: Character) {
    return this.triviaQuestion.answer._id === character._id;
  }
}
