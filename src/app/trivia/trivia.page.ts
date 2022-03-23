import { Component, OnInit } from '@angular/core';
import { Character } from '../core/models';
import { CharacterService } from './character.service';

@Component({
  selector: 'app-trivia',
  templateUrl: './trivia.page.html',
  styleUrls: ['./trivia.page.scss'],
})
export class TriviaPage implements OnInit {
  characters: Character[] = [];

  constructor(private trivia: CharacterService) {}

  ngOnInit() {
    this.trivia.loadCharacters().subscribe(() => {
      this.characters = this.trivia.characters;
      console.log(this.characters[0]);
      const options = this.trivia.generateOptions(this.characters[0]);
      console.log(options);
    });
  }
}
