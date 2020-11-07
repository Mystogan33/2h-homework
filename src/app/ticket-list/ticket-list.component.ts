import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Ticket } from 'src/interfaces/ticket.interface';
import { User } from 'src/interfaces/user.interface';
import { BackendService } from '../backend.service';

@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.css']
})
export class TicketListComponent implements OnInit {
  public searchQuery = '';
  public ticketsList: Ticket[] = [];
  public readonly users$: Observable<User[]> = this.backendService.users();
  public readonly tickets$: Observable<Ticket[]> = this.backendService.tickets();

  constructor(private readonly backendService: BackendService) {}

  ngOnInit() {
    this.tickets$.subscribe(tickets => this.ticketsList = tickets)
  }

  searchForTickets() {
    if (this.searchQuery && this.searchQuery.trim() != '') {
      this.ticketsList = this.ticketsList.filter(ticket => {
        return (ticket.description.toLowerCase().indexOf(this.searchQuery.toLowerCase()) > -1);
      });
    } else {
      this.tickets$.subscribe(tickets => this.ticketsList = tickets);
    }
  }

  removeItem(ticketId: number) {
    this.ticketsList = this.ticketsList.filter(ticket => ticket.id !== ticketId);
  }
}
