import { Injectable } from '@angular/core';
import { task, board, taskList, subscription } from '../interfaces/interfaces'
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private http: HttpClient,
   ) { }

  /* Board API Methods */
  getBoardListByUser(username: string ) : Observable<any> {
    return this.http.get< board []>(`http://localhost:8000/api/boards/username/${username}?format=json`)
  }

  getBoardByUrl( boardUrl: string ): Observable<board> {
    return this.http.get<board>(`http://localhost:8000/api/boards/url/${boardUrl}?format=json`)
  }

  postBoard(newBoard: board, username: string): Observable<any> {
    let postObject: { [k: string]: any } = {}
    if (newBoard.board_url) {
      postObject.board_url = `/${newBoard.board_url}/`
    }
    postObject.name = newBoard.name
    postObject.board_picture = newBoard.board_picture
    postObject.description = newBoard.description
    return this.http.post<board>(`http://localhost:8000/api/boards/username/${username}`, postObject)
  }

  deleteBoardById( boardId: string ): Observable<any> {
    return this.http.delete<any>(`http://localhost:8000/api/boards/id/${boardId}`)
  }

  getNumberOfBoards( user_id: string): Observable<any>{
    return this.http.get( `http://localhost:8000/api/boards/member/count/${user_id}` )
  }

  /* Task API Methods */
  getTasksByBoard(boardId): Observable<task[]> {
    return boardId ? this.http.get<task[]>(`http://localhost:8000/api/tasks/${boardId}?format=json`) : null;
  }

  getTasksByUser(userId): Observable<any[]> {
    return this.http.get<task[]>(`http://localhost:8000/api/tasks/all/${userId}?format=json`);
  }

  postTask( newTask: task ): Observable<any> {
    newTask.id = null;
    return this.http.post<task>(`http://localhost:8000/api/tasks/${newTask.board}`, newTask)
  }

  /* User API Methods */
  postUser( newUser: any): Observable<any>{
    return this.http.post<task>(`http://localhost:8000/api/user/member`, newUser)
  }

  getUsersByBoard(boardId: number): Observable<any>{
    return this.http.get(`http://localhost:8000/api/boards/member/${boardId}`)
  }

  postMemberByBoard(postData: any): Observable<any> {
    return this.http.post<any>(`http://localhost:8000/api/boards/members/new`, postData)
  }

  postMembers(listOfMembers){
    return this.http.post<any>(`http://localhost:8000/api/boards/members`, listOfMembers)
  }

  getSubByUser( username: string ): Observable<any>{
    return this.http.get(`http://localhost:8000/api/user/member/subscription/${username}`);
  }

  updateSubByUser( username: string, sub: subscription){
    return this.http.put<subscription>(`http://localhost:8000/api/user/member/subscription/${username}`, sub);
  }

  getUserNameById( id: number): Observable<any>{
    return this.http.get(`http://localhost:8000/api/user/${id}`);
  }
  getIdByUsername(username: string): Observable<any> {
    return this.http.get(`http://localhost:8000/api/user/${username}`);
  }

  getRecentActivityByUser(username: string): Observable<any>{
    return this.http.get(`http://localhost:8000/api/recent/user/${username}`);
  }
}
