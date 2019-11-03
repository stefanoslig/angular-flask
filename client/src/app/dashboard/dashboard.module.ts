import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardService } from './dashboard.service';
import { dashboardReducer, dashboardInitialState } from './+state/dashboard.reducer';
import { DashboardEffects } from './+state/dashboard.effects';
import { DashboardFacade } from './+state/dashboard.facade';
import { DashboardComponent } from './dashboard.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        DashboardRoutingModule,
        StoreModule.forFeature('dashboard', dashboardReducer, { initialState: dashboardInitialState }),
        EffectsModule.forFeature([DashboardEffects]),
    ],
    providers: [DashboardFacade, DashboardService],
    declarations: [DashboardComponent],
})
export class DashboardModule {}
