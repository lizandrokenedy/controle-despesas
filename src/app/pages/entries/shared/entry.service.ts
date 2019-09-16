import { Injectable, Injector } from '@angular/core';
import { Entry } from './entry.model';
import { CategoryService } from '../../categories/shared/category.service';
import { BaseResourceService } from 'src/app/shared/services/base-resource.service';
import { flatMap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EntryService extends BaseResourceService<Entry> {

  constructor(protected injector: Injector,
              private categoryService: CategoryService) { 
                super('http://localhost:3000/entries', injector)
               }


  create(entry: Entry): Observable<Entry>{
    return this.categoryService.getById(entry.categoryId).pipe(
      flatMap(category => {
        entry.category = category
        return super.create(entry)
      })
    )
  }

  update(entry: Entry): Observable<Entry>{
    return this.categoryService.getById(entry.categoryId).pipe(
      flatMap(category => {
        entry.category = category
        return super.update(entry)
      })
    )  
  }


  protected jsonDataToResources(jsonData: any[]): Entry[]{
    const entries: Entry[] = []
    jsonData.forEach(element => {
      let entry = Object.assign(new Entry(), element)
      entries.push(entry)
    })
    return entries
  }

  protected jsonDataToResource(jsonData: any): Entry{
    return Object.assign(new Entry(), jsonData)
  }

}
