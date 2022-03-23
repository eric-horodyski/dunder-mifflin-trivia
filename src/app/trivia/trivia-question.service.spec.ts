import { TestBed } from '@angular/core/testing';

import { TriviaQuestionService } from './trivia-question.service';

describe('TriviaQuestionService', () => {
  let service: TriviaQuestionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TriviaQuestionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
