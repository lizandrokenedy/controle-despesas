import { NgModule } from '@angular/core';

import { EntriesRoutingModule } from './entries-routing.module';
import { EntryListComponent } from './entry-list/entry-list.component';
import { EntryFormComponent } from './entry-form/entry-form.component';
import { CalendarModule } from 'primeng/calendar'
import { IMaskModule } from 'angular-imask'
import { EntryService } from './shared/entry.service';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [EntryListComponent, EntryFormComponent],
  imports: [
    SharedModule,
    EntriesRoutingModule,
    CalendarModule,
    IMaskModule
  ],
  providers: [EntryService]
})
export class EntriesModule { }
