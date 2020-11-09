import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { AddTicketComponent } from './add-ticket/add-ticket.component';
import { TicketDetailsComponent } from './ticket-details/ticket-details.component';
import { TicketListComponent } from './ticket-list/ticket-list.component';

const routes: Routes = [
  { path: '', redirectTo: '/tickets', pathMatch: 'full' },
  { path: 'tickets', component: TicketListComponent, pathMatch: 'full' },
  { path: 'tickets/new', component: AddTicketComponent, pathMatch: 'full' },
  { path: 'tickets/:id', component: TicketDetailsComponent, pathMatch: 'full' },
  { path: 'tickets/:id/edit', component: AddTicketComponent, pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }