import { Component, OnInit } from '@angular/core';
import { tick } from '@angular/core/testing';
import { Observable } from 'rxjs';
import { Ticket } from 'src/interfaces/ticket.interface';
import { User } from 'src/interfaces/user.interface';
import { BackendService } from '../backend.service';

@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.scss']
})
export class TicketListComponent implements OnInit {
  public searchQuery = '';
  public ticketsList: Ticket[] = [];
  public filteredList: Ticket[] = [];
  public isLoading = false;

  public readonly users$: Observable<User[]> = this.backendService.users();
  public readonly tickets$: Observable<Ticket[]> = this.backendService.tickets();

  constructor(private readonly backendService: BackendService) {}

  ngOnInit() {
    this.isLoading = true;
    this.tickets$.subscribe(tickets => {
      this.ticketsList = tickets;
      this.filteredList = tickets;
      this.isLoading = !this.isLoading;
    });
  }

  searchForTickets() {
    if (this.searchQuery && this.searchQuery.trim() != '') {
      this.filteredList = this.ticketsList.filter(ticket => {
        return (ticket.description.toLowerCase().indexOf(this.searchQuery.toLowerCase()) > -1);
      });
    } else this.filteredList = this.ticketsList;
  }

  removeItem(ticketId: number) {
    this.ticketsList = this.ticketsList.filter(ticket => ticket.id !== ticketId);
    this.filteredList = this.ticketsList;
    this.backendService.storedTickets$.next(this.ticketsList)
  }
}
