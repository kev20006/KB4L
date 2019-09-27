import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { task, board } from './interfaces/interfaces'
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BoardService {

  private boardList: any;
  private httpOptions: any;
  private errors: any;
  private currentBoard: board;

  constructor(private http: HttpClient) {
    this.httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
  }

  getBoard( username ): Observable<any>{
    return this.http.get( `http://localhost:8000/boards/username/${username}?format=json` )
  }

  getTasks( boardId ) : Observable<any>{
    return boardId ? this.http.get(`http://localhost:8000/my-boards/${boardId}?format=json`) : null;
    
  }

  setBoard( board ): void{
    this.currentBoard = board;
  }
  
  getCurrentBoard(): board{
    return this.currentBoard
  } 

  getBoardByUrl(boardUrl): Observable<any>{
    return this.http.get(`http://localhost:8000/boards/url/${boardUrl}?format=json`)
  }
}
