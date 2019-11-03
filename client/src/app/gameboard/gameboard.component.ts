import { Component, ChangeDetectionStrategy, OnInit, HostListener, OnDestroy } from '@angular/core';
import { GameboardFacade } from './+state/gameboard.facade';
import { Observable, timer, Subject, merge } from 'rxjs';
import { DashboardFacade } from '@dashboard/+state/dashboard.facade';
import { switchMap, map, takeWhile, tap } from 'rxjs/operators';
import { MODE } from '@dashboard/+state/dashboard.interfaces';
import { Router } from '@angular/router';

const DURATION_EASY_MODE = 10;
const DURATION_DIFFICULT_MODE = 5;

@Component({
    selector: 'app-gameboard',
    templateUrl: './gameboard.component.html',
    styleUrls: ['gameboard.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameboardComponent implements OnInit, OnDestroy {
    word$ = this.gameboardFacade.word$;
    progressWord$ = this.gameboardFacade.progressWord$;
    wrongChars$ = this.gameboardFacade.wrongChars$;
    lives$ = this.gameboardFacade.lives$;
    triggerTimer$ = new Subject<void>();
    timer$: Observable<number>;
    result$ = this.gameboardFacade.result$;
    score$ = this.gameboardFacade.score$;
    mode$ = this.dashboardFacade.mode$;


    // to use fromEvent here and then merge win or gameOver
    @HostListener('window:keyup', ['$event']) keyEvent(event: KeyboardEvent) {
        if (event.which >= 48 && event.which <= 90) { // 0...9, a...z
            this.gameboardFacade.character(event.key);
            this.triggerTimer$.next();
        }
    }

    constructor(private gameboardFacade: GameboardFacade, private dashboardFacade: DashboardFacade, private router: Router) {}

    ngOnInit() {
        this.triggerTimer$.next();
        this.gameboardFacade.randomWord();
        this.timer$ = merge(this.triggerTimer$, this.mode$).pipe(
            switchMap(mode =>
                timer(0, 1000).pipe(
                    map(t => (mode === MODE.difficult ? DURATION_DIFFICULT_MODE - t : DURATION_EASY_MODE - t)),
                    tap(t => {
                      if ( t === 0 ) {
                        this.triggerTimer$.next();
                        this.gameboardFacade.reduceLifes();
                      }
                    }),
                    takeWhile(t => t >= 0),
                ),
            ),
        );
    }

    onNewGame() {
      this.router.navigate(['dashboard']);
    }

    onSaveScore(score: number) {
      this.gameboardFacade.saveScore(score);
    }

    saveGame() {
      this.gameboardFacade.saveGame();
    }

    ngOnDestroy() {
      this.gameboardFacade.resetGame();
    }
}
