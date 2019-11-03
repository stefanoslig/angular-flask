import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { GameboardService } from './gameboard.service';
import { GameboardComponent } from './gameboard.component';
import { GameboardFacade } from './+state/gameboard.facade';
import { GameboardEffects } from './+state/gameboard.effects';
import { gameboardReducer, gameboardInitialState } from './+state/gameboard.reducer';
import { GameboardRoutingModule } from './gameboard-routing.module';
import { ResultComponent } from './result/result.component';


@NgModule({
    imports: [
        CommonModule,
        GameboardRoutingModule,
        StoreModule.forFeature('gameboard', gameboardReducer, { initialState: gameboardInitialState }),
        EffectsModule.forFeature([GameboardEffects]),
    ],
    providers: [GameboardService],
    declarations: [GameboardComponent, ResultComponent],
})
export class GameboardModule {}
