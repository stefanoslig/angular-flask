import { ChangeDetectionStrategy, Component, Input, Output, EventEmitter } from '@angular/core';
import { Action } from '@ngrx/store';
import { RESULT } from '../+state/gameboard.interfaces';

@Component({
    selector: 'app-result',
    templateUrl: './result.component.html',
    styleUrls: ['result.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResultComponent {
    @Input() result: RESULT;
    @Input() score: number;
    @Output() newGame = new EventEmitter<void>();
    @Output() saveScore = new EventEmitter<number>();
}
