import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap, take, tap } from 'rxjs/operators';
import { Ticket } from 'src/interfaces/ticket.interface';
import { BackendService } from '../backend.service';

interface TicketDetails extends Ticket {
  assigneeName: string;
}

@Component({
  selector: 'app-ticket-details',
  templateUrl: './ticket-details.component.html',
  styleUrls: ['./ticket-details.component.scss']
})
export class TicketDetailsComponent implements OnInit {
  public ticket: TicketDetails;
  public isLoading = false;

  constructor(private route: ActivatedRoute, private readonly backendService: BackendService) {}

  ngOnInit() {
    this.isLoading = true;

    this.backendService.ticket(this.route.snapshot.params.id)
    .pipe(
      take(1),
      switchMap(ticket => {
        this.ticket = {
          ...ticket,
          assigneeName: ""
        };
        return this.backendService.user(ticket.assigneeId)
      }),
    )
    .subscribe(user => {
      this.ticket.assigneeName = user.name;
      this.isLoading = false;
    });
  }
}
