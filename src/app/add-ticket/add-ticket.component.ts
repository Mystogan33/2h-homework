import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { Ticket } from 'src/interfaces/ticket.interface';
import { User } from 'src/interfaces/user.interface';
import { BackendService } from '../backend.service';

@Component({
  selector: 'app-add-ticket',
  templateUrl: './add-ticket.component.html',
  styleUrls: ['./add-ticket.component.scss']
})
export class AddTicketComponent implements OnInit {
  public ticket: Partial<Ticket>;
  public isLoading = false;
  public isEditMode = false;
  public listOfUsers: User[] = [];

  constructor(private route: ActivatedRoute, private readonly backendService: BackendService, private router: Router) { }

  ngOnInit() {
    this.ticket = {
      completed: false,
      assigneeId: 0,
      description: ""
    }

    this.route.params.subscribe(params => {
      console.log(params);
      if (params['id']) {
        this.backendService
          .ticket(params['id'])
          .subscribe(ticket => {
            this.ticket = ticket;
            this.isEditMode = true;
          });
      }
    });

    this.backendService.users().subscribe(users => this.listOfUsers = users);
  }

  handleSubmit() {
    this.backendService.tickets().subscribe(tickets => {
      if (this.isEditMode) {
        let indexOfTicket = tickets.findIndex(ticket => ticket.id === this.ticket.id);
        this.backendService.storedTickets[indexOfTicket] = <Ticket>this.ticket;
      } else {
        this.backendService
          .newTicket({ description: this.ticket.description })
          .pipe(take(1))
          .subscribe(ticket => this.backendService.assign(ticket.id, this.ticket.assigneeId));
      }
      this.router.navigate(['../']);
    })
  }
}