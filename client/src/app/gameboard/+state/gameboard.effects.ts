import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { GameboardService } from '../gameboard.service';
import * as GameboardActions from './gameboard.actions';
import { switchMap, map, catchError, withLatestFrom } from 'rxjs/operators';
import { of } from 'rxjs';
import { DashboardFacade } from '@dashboard/+state/dashboard.facade';
import { Router } from '@angular/router';
import { GameboardFacade } from './gameboard.facade';

@Injectable()
export class GameboardEffects {
    randomWord$ = createEffect(() =>
        this.actions$.pipe(
            ofType(GameboardActions.getRandomWord),
            switchMap(action =>
                this.gameboardService.randomWord().pipe(
                    map(word => GameboardActions.getRandomWordSuccess({ word })),
                    catchError(error => of(GameboardActions.getRandomWordFail({ error }))),
                ),
            ),
        ),
    );

    saveScore$ = createEffect(() =>
        this.actions$.pipe(
            ofType(GameboardActions.saveScore),
            withLatestFrom(this.dashboardFacade.username$),
            switchMap(([action, username]) =>
                this.gameboardService.saveScore(username, action.score).pipe(
                    map(_ => {
                        this.router.navigate(['dashboard']);
                        return GameboardActions.saveScoreSuccess();
                    }),
                    catchError(error => of(GameboardActions.saveScoreFail({ error }))),
                ),
            ),
        ),
    );

    saveGame$ = createEffect(() =>
        this.actions$.pipe(
            ofType(GameboardActions.saveGame),
            withLatestFrom(this.gameboardFacade.state$, this.dashboardFacade.username$),
            switchMap(([action, state, username]) =>
                this.gameboardService.saveGame(username, state).pipe(
                    map(_ => {
                        this.router.navigate(['dashboard']);
                        return GameboardActions.saveGameSuccess();
                    }),
                    catchError(error => of(GameboardActions.saveGameFail({ error }))),
                ),
            ),
        ),
    );

    constructor(
        private readonly actions$: Actions,
        private readonly gameboardService: GameboardService,
        private readonly dashboardFacade: DashboardFacade,
        private readonly gameboardFacade: GameboardFacade,
        private router: Router,
    ) {}
}
