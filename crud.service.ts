import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MarkSheet, MarksSheet } from 'src/app/admin/_models/marks-sheet/marks-sheet.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MarksSheetService {



  constructor(private _http: HttpClient) { }

  getMarks(page): Observable<MarksSheet[]> {
    return this._http.get<MarksSheet[]>(environment.apiUrl + `/mark_sheet?page=${page}`)
  }

   getMark(id): Observable<MarkSheet[]>{
      return this._http.get<MarkSheet[]>(environment.apiUrl + `/mark_sheet/${id}`);
   }

   editMark(id, mark): Observable<MarkSheet[]> {
     return this._http.put<MarkSheet[]>(environment.apiUrl + `/mark_sheet/${id}`, mark);
   }

}

