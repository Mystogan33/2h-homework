import { Component, OnInit } from '@angular/core';
import { take, tap } from 'rxjs/operators';
import { BackendService } from '../backend.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public numberOfTickets: number = 0;

  constructor(private readonly backendService: BackendService) { }

  ngOnInit(): void {
    this.backendService.tickets()
    .pipe(
      take(1),
      tap(tickets => this.numberOfTickets = tickets.length)
    )
    .subscribe();
  }

}
