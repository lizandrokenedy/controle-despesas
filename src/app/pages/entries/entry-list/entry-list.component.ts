import { Component, OnInit } from '@angular/core';
import { EntryService } from '../shared/entry.service';
import { Entry } from '../shared/entry.model';

@Component({
  selector: 'app-entry-list',
  templateUrl: './entry-list.component.html',
  styleUrls: ['./entry-list.component.css']
})
export class EntryListComponent implements OnInit {

  entries: Entry[] = []

  constructor(private entryService: EntryService) { }

  ngOnInit() {
    this.entryService.getAll().subscribe(
      (entries) => {
        this.entries = entries.sort((a, b) => b.id - a.id)
      },
      (error: Error) => {
        alert('Não foi possível carregar as categorias.')
      }
    )
  }

  deleteEntry(entry: Entry): void {

    const mustDelete = confirm(`Deseja realmente excluir esta categoria: ${entry.name}?`)

    if (mustDelete) {
      this.entryService.delete(entry.id).subscribe(
        () => {
          this.entries = this.entries.filter((element) => element != entry),
            (error: Error) => {
              alert('Erro ao tentar excluir')
            }
        }
      )
    }
  }

}
