import { Injectable } from '@angular/core';
import { ApiService } from '@api/api.service';
import { Word, GameboardState } from './+state/gameboard.interfaces';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class GameboardService {
  constructor(private api: ApiService) {}

  randomWord(): Observable<string> {
    return this.api.get<Word>('/words').pipe(map(data => data.word));
  }

  saveScore(username: string, score: number) {
    return this.api.post<{username: string, score: number}>('/scores', null, {username, score});
  }

  saveGame(username: string, state: GameboardState) {
    return this.api.post<{username: string, state: GameboardState}>('/games', null, {username, state: JSON.stringify(state)});
  }
}
