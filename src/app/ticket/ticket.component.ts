import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Ticket } from 'src/interfaces/ticket.interface';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.scss']
})
export class TicketComponent implements OnInit {
  @Input() ticket: Ticket;
  @Output() onRemove = new EventEmitter<number>();

  constructor() { }

  ngOnInit(): void {
  }

  removeItem(ticketId: number) {
    this.onRemove.emit(ticketId);
  }

}
