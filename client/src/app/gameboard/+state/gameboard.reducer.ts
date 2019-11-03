import { Action, createReducer, on } from '@ngrx/store';
import { GameboardState } from './gameboard.interfaces';
import * as GameboardActions from './gameboard.actions';

export const gameboardInitialState: GameboardState = {
    word: '',
    progressWord: [],
    character: '',
    wrongChars: [],
};

const reducer = createReducer(
    gameboardInitialState,
    on(GameboardActions.getRandomWordSuccess, (state, action) => {
        return { ...state, word: action.word, progressWord: action.word.split('').map(c => '*') };
    }),
    on(GameboardActions.setCharacter, (state, action) => {
        const progressWord = state.word.split('').reduce((acc: string[], char: string, index: number) => {
            return action.char === char ? addItemInArrayImmut(acc, char, index) : acc;
        }, state.progressWord);
        return {
            ...state,
            character: action.char,
            progressWord,
            wrongChars: state.word.indexOf(action.char) > -1 ? state.wrongChars : [...state.wrongChars, action.char],
        };
    }),
    on(GameboardActions.resetGame, (state, action) => {
        return gameboardInitialState;
    }),
    on(GameboardActions.reduceLifes, (state, action) => {
        return {
            ...state,
            wrongChars: [...state.wrongChars, ''],
        };
    }),
    on(GameboardActions.setState, (state, action) => {
        return {
            ...action.state,
        };
    }),
);

export function gameboardReducer(state: GameboardState, action: Action): GameboardState {
    return reducer(state, action);
}

function addItemInArrayImmut<T>(array: T[], item: T, index: number): T[] {
    return [...array.slice(0, index), item, ...array.slice(index + 1)];
}
