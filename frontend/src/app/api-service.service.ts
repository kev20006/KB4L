import { Injectable } from '@angular/core';
import { task, board, taskList } from './interfaces/interfaces'
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  /* Board API Methods */
  getBoardListByUser(username: string ) : Observable<any> {
    return this.http.get< board []>(`http://localhost:8000/boards/username/${username}?format=json`)
  }

  getBoardByUrl( boardUrl: string ): Observable<board> {
    return this.http.get<board>(`http://localhost:8000/boards/url/${boardUrl}?format=json`)
  }

  postBoard(newBoard: board): Observable<any> {
    let postObject: { [k: string]: any } = {}
    if (newBoard.board_url) {
      postObject.board_url = `/${newBoard.board_url}/`
    }
    postObject.name = newBoard.name
    postObject.board_picture = newBoard.board_picture
    postObject.description = newBoard.description
    console.log(postObject)
    return this.http.post<board>('http://localhost:8000/boards/username/admin', postObject)
  }

  deleteBoardByUrl( boardUrl: string ): Observable<any> {
    return this.http.delete<any>(`http://localhost:8000/boards/url/${boardUrl}?format=json`)
  }

  /* Task API Methods */
  getTasksByBoard(boardId): Observable<task[]> {
    return boardId ? this.http.get<task[]>(`http://localhost:8000/my-boards/${boardId}?format=json`) : null;
  }

  postTask( newTask: task ): Observable<any> {
    newTask.id = null;
    return this.http.post< task >(`http://localhost:8000/my-boards/${newTask.board}`, newTask)
  }






}
