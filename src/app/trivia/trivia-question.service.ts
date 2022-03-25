import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { TriviaQuestion } from '../core/models';

import { CharacterService } from './character.service';

@Injectable({
  providedIn: 'root',
})
export class TriviaQuestionService {
  private endpoint = `${environment.apiBaseUrl}/quote`;

  constructor(private http: HttpClient, private characters: CharacterService) {}

  getTriviaQuestion(): Observable<TriviaQuestion> {
    return this.http.get<{ data: any }>(this.endpoint).pipe(
      map((response) => response.data),
      map((data) => ({
        quote: data.content,
        answer: data.character,
        options: this.characters.generateOptions(data.character),
      }))
    );
  }
}
