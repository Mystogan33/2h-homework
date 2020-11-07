import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, of, pipe } from 'rxjs';
import { map } from 'rxjs/operators';
import { Ticket } from 'src/interfaces/ticket.interface';
import { BackendService } from './backend.service';

@Injectable({ providedIn: 'root'})
export class RecipesResolverService implements Resolve<Ticket> {
  constructor(private readonly backendService: BackendService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot)
  : Ticket | Observable<Ticket> | Promise<Ticket> {
    let foundTicket: Ticket[] = [];

    return this.backendService.tickets()
      .pipe(
        map(tickets => tickets.filter(ticket => ticket.id !== route.params.id)),
        map(tickets => tickets[0])
      );
  }
}
