import { Injectable } from '@angular/core';
import { ApiService } from '@api/api.service';
import { Scores, Score, SavedGames, SavedGame } from './+state/dashboard.interfaces';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class DashboardService {
    constructor(private api: ApiService) {}

    scores(): Observable<Score[]> {
        return this.api.get<Scores>('/scores').pipe(map(data => data.scores));
    }

    savedGames(): Observable<SavedGame[]> {
        return this.api.get<SavedGames>('/games').pipe(map(data => data.states));
    }
}
