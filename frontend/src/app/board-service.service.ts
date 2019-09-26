import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BoardService {

  private boardList: any;
  private httpOptions: any;
  private errors: any;
  private currentBoard: any;
  constructor(private http: HttpClient) {
    this.httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
  }

  getBoard( username ){
    return this.http.get( `http://localhost:8000/boards/${username}?format=json` )
  }

  getTasks( boardId ){
    return this.http.get(`http://localhost:8000/my-boards/${boardId}?format=json`)
  }

  setBoard( board ){
    this.currentBoard = board;
  }
  
  getCurrentBoard(){
    return this.currentBoard;
  } 
}
