/* eslint-disable no-underscore-dangle */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';

import { Character } from '../core/models';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CharacterService {
  characters: Character[] = [];
  private endpoint = `${environment.apiBaseUrl}/characters`; // v1/quote for random quote

  constructor(private http: HttpClient) {}

  loadCharacters(): Observable<void> {
    return this.http.get<{ data: Character[] }>(this.endpoint).pipe(
      map(({ data }) => {
        this.characters = data;
      }),
      catchError((err, caught) => {
        console.log(err);
        return caught;
      })
    );
  }

  generateOptions(answer: Character): Character[] {
    const characters = this.characters.filter((el) => el._id !== answer._id);
    const options: Character[] = [];

    for (let i = 0; i < 4; i++) {
      const idx = Math.floor(Math.random() * characters.length);
      options.push(characters[idx]);
      characters.splice(idx, 1);
    }
    options[Math.floor(Math.random() * options.length)] = answer;
    return options;
  }
}
