import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { DashboardFacade } from '@dashboard/+state/dashboard.facade';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { GameboardState } from './+state/gameboard.interfaces';
import { GameboardFacade } from './+state/gameboard.facade';

@Injectable({
    providedIn: 'root',
})
export class GameboardGuard implements CanActivate {
    constructor(private dashboardFacade: DashboardFacade, private router: Router, private gameboardFacade: GameboardFacade) {}

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        const gameState: GameboardState = JSON.parse('state' in next.queryParams &&  next.queryParams['state']);
        const user: string = 'username' in next.queryParams && next.queryParams['username'];
        if (gameState) {
            this.dashboardFacade.setUsername(user);
            this.gameboardFacade.setState(gameState);
            return of(true);
        }
        return this.dashboardFacade.username$.pipe(
            map(username => {
                if (!username) {
                    this.router.navigate(['dashboard']);
                }
                return !!username;
            }),
        );
    }
}
