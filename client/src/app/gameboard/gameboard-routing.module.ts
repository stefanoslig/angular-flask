import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GameboardComponent } from './gameboard.component';
import { GameboardGuard } from './gameboard.guard';


const routes: Routes = [
    {
        path: '',
        component: GameboardComponent,
        canActivate: [GameboardGuard],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class GameboardRoutingModule {}
