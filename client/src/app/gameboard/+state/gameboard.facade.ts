import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { GameboardState } from './gameboard.interfaces';
import { gameboardQuery } from './gameboard.selectors';
import * as GameboardActions from './gameboard.actions';

@Injectable({providedIn: 'root'})
export class GameboardFacade {
    state$ = this.store.pipe(select(gameboardQuery.gameboardState));
    word$ = this.store.pipe(select(gameboardQuery.word));
    progressWord$ = this.store.pipe(select(gameboardQuery.progressWord));
    wrongChars$ = this.store.pipe(select(gameboardQuery.wrongChars));
    lives$ = this.store.pipe(select(gameboardQuery.lives));
    score$ = this.store.pipe(select(gameboardQuery.score));
    result$ = this.store.pipe(select(gameboardQuery.result));

    constructor(private readonly store: Store<GameboardState>) {}

    randomWord() {
        this.store.dispatch(GameboardActions.getRandomWord());
    }

    character(char: string) {
        this.store.dispatch(GameboardActions.setCharacter({ char }));
    }

    resetGame() {
      this.store.dispatch(GameboardActions.resetGame());
    }

    reduceLifes() {
      this.store.dispatch(GameboardActions.reduceLifes());
    }

    saveScore(score: number) {
      this.store.dispatch(GameboardActions.saveScore({score}));
    }

    saveGame() {
      this.store.dispatch(GameboardActions.saveGame());
    }

    setState(state: GameboardState) {
      this.store.dispatch(GameboardActions.setState({state}));
    }
}
