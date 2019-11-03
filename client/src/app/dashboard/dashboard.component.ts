import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { DashboardFacade } from './+state/dashboard.facade';
import { MODE } from './+state/dashboard.interfaces';
import { Router } from '@angular/router';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['dashboard.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent implements OnInit {
    username = '';
    mode = {
      easy: MODE.easy,
      difficult: MODE.difficult
    };
    scores$ = this.dashboardFacade.scores$;
    savedGames$ = this.dashboardFacade.savedGames$;
    mode$ = this.dashboardFacade.mode$;

    constructor(private dashboardFacade: DashboardFacade, private router: Router) {}

    ngOnInit() {
      this.dashboardFacade.scores();
      this.dashboardFacade.savedGames();
    }

    startGame() {
      this.router.navigate(['gameboard']);
    }

    addUsername(username: string) {
      this.dashboardFacade.setUsername(username);
    }

    onChangeMode(mode: MODE) {
      this.dashboardFacade.selectMode(mode);
    }
}
