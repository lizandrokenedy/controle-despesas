import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable, throwError } from 'rxjs';
import { map, catchError, flatMap } from 'rxjs/operators'
import { Entry } from './entry.model';

@Injectable({
  providedIn: 'root'
})
export class EntryService {

 private API_URL = 'http://localhost:3000/entries'

  constructor(private http: HttpClient) { }

  getAll(): Observable<Entry[]> {
    return this.http.get(this.API_URL).pipe(
      catchError(this.handleError),
      map(this.jsonDataToEntries)
    )
  }

  getById(id: number): Observable<Entry>{
    const url = `${this.API_URL}/${id}`;
    return this.http.get(url).pipe(
      catchError(this.handleError),
      map(this.jsonDataToEntry)
    )
  }

  create(entry: Entry): Observable<Entry>{
    return this.http.post(this.API_URL, entry).pipe(
      catchError(this.handleError),
      map(this.jsonDataToEntry)
    )
  }

  update(entry: Entry): Observable<Entry>{
    const url = `${this.API_URL}/${entry.id}`
    return this.http.put(url, entry).pipe(
      catchError(this.handleError),
      map(() => entry)
    )
  }

  delete(id: number): Observable<any>{
    const url = `${this.API_URL}/${id}`
    return this.http.delete(url).pipe(
      catchError(this.handleError),
      map(()=> null)
    )
  }

  private jsonDataToEntries(jsonData: any[]): Entry[]{
    const entries: Entry[] = []
    jsonData.forEach(element => {
      let entry = Object.assign(new Entry(), element)
      entries.push(entry)
    })
    return entries
  }

  private jsonDataToEntry(jsonData: any): Entry{
    return jsonData as Entry
  }

  private handleError(error: any): Observable<any>{
    console.log("Erro na requisição ", error)
    return throwError(error)
  }

}
