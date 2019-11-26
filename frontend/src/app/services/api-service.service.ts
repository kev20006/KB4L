import { Injectable, OnInit } from '@angular/core';
import { task, board, subscription } from '../interfaces/interfaces'
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { isDevMode } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class ApiService {

  private urlPrefix: string = isDevMode() ? 'http://localhost:8000/' : ''
  
  
  constructor(
    private http: HttpClient,
   ) { }

  /* Board API Methods */
  getBoardListByUser(username: string ) : Observable<any> {
    return this.http.get<board[]>(`${this.urlPrefix}api/boards/username/${username}?format=json`)
  }

  getBoardByUrl( boardUrl: string ): Observable<board> {
    return this.http.get<board>(`${this.urlPrefix}api/boards/url/${boardUrl}?format=json`)
  }

  postBoard(newBoard: board, username: string): Observable<any> {
    let postObject: { [k: string]: any } = {}
    if (newBoard.board_url) {
      console.log(newBoard.board_url)
      postObject.board_url = `/${newBoard.board_url}/`
    }
    postObject.name = newBoard.name
    postObject.description = newBoard.description
    return this.http.post<board>(`${this.urlPrefix}api/boards/username/${username}`, postObject)
  }

  deleteBoardById( boardId: string ): Observable<any> {
    return this.http.delete<any>(`${this.urlPrefix}api/boards/id/${boardId}`)
  }

  getNumberOfBoards( user_id: string): Observable<any>{
    return this.http.get(`${this.urlPrefix}api/boards/member/count/${user_id}` )
  }

  /* Task API Methods */
  getTasksByBoard(boardId): Observable<task[]> {
    return boardId ? this.http.get<task[]>(`${this.urlPrefix}api/tasks/${boardId}?format=json`) : null;
  }

  getTasksByUser(userId): Observable<any[]> {
    return this.http.get<task[]>(`${this.urlPrefix}api/tasks/all/${userId}?format=json`);
  }

  postTask( newTask: task ): Observable<any> {
    newTask.id = null;
    return this.http.post<task>(`${this.urlPrefix}api/tasks/${newTask.board}`, newTask)
  }

  completeTask(task: task): Observable<any> {
    return this.http.delete<task>(`${this.urlPrefix}api/tasks/${task.board}/tasks/${task.id}`)
  }

  updateTask(task: task): Observable<any> {
    return this.http.put<task>(`${this.urlPrefix}api/tasks/${task.board}/tasks/${task.id}`, task)
  }

  /* User API Methods */
  postUser( newUser: any): Observable<any>{
    return this.http.post<task>(`${this.urlPrefix}api/user/member`, newUser)
  }

  getUsersByBoard(boardId: number): Observable<any>{
    return this.http.get(`${this.urlPrefix}api/boards/member/${boardId}`)
  }

  postMemberByBoard(postData: any): Observable<any> {
    return this.http.post<any>(`${this.urlPrefix}api/boards/members/new`, postData)
  }

  postMembers(listOfMembers){
    return this.http.post<any>(`${this.urlPrefix}api/boards/members`, listOfMembers)
  }

  getSubByUser( username: string ): Observable<any>{
    return this.http.get(`${this.urlPrefix}api/user/member/subscription/${username}`);
  }

  updateSubByUser( username: string, sub: subscription){
    return this.http.put<subscription>(`${this.urlPrefix}api/user/member/subscription/${username}`, sub);
  }

  getUserNameById( id: number): Observable<any>{
    return this.http.get(`${this.urlPrefix}api/user/${id}`);
  }
  getIdByUsername(username: string): Observable<any> {
    return this.http.get(`${this.urlPrefix}api/user/${username}`);
  }

  getRecentActivityByUser(username: string): Observable<any>{
    return this.http.get(`${this.urlPrefix}api/recent/user/${username}`);
  }
}
