import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { task, board, taskList } from './interfaces/interfaces'
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})

export class BoardService {

  constructor(private http: HttpClient) {
    this.httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
  }

  public boardSet: boolean = false
  private httpOptions: any;
  private currentBoard: BehaviorSubject<board> = new BehaviorSubject<board>(null);
  private _tasks: BehaviorSubject<task[]> = new BehaviorSubject<task[]>([]);
  private _boardList: BehaviorSubject<board[]> = new BehaviorSubject<board[]>([]);

  readonly currentBoard$ = this.currentBoard.asObservable();
  readonly tasks$ = this._tasks.asObservable();
  readonly boardList$ = this._boardList.asObservable();

  readonly todo$ = this.tasks$.pipe(
    map(tasks => tasks.filter(task => task.status === "1"))
  )

  readonly inProgress$ = this.tasks$.pipe(
    map(tasks => tasks.filter(task => task.status === "2"))
  )

  readonly completed$ = this.tasks$.pipe(
    map(tasks => tasks.filter(task => task.status === "3"))
  )
    
  get tasks(): task[]{
    return this._tasks.getValue();
  }

  set tasks(val: task[]) {
    this._tasks.next(val);
  }

  get boardList(): board[]{
    return this._boardList.getValue()
  }

  set boardList(val: board[]) {
    this._boardList.next(val);
  }

  setBoardListByUser( username ){
    this.http.get<any>(`http://localhost:8000/boards/username/${username}?format=json`).subscribe(data => {
      if (data) {
        this.boardList = data.boards;
      }
    })
  }

  private getTasksFromServer( boardId ) : Observable<task[]>{
    return boardId ? this.http.get<task[]>(`http://localhost:8000/my-boards/${boardId}?format=json`) : null;
  }

  private getBoardFromServer(boardUrl): Observable<board> {
    return this.http.get<board>(`http://localhost:8000/boards/url/${boardUrl}?format=json`)
  }

  getTasks(): any{
    return {
      todo: this.todo$,
      inProgress: this.inProgress$,
      completed: this.completed$
    }
  }

  setBoard( board ): void{
    console.log("setting board!")
    this.boardSet = true;
    if (board.id=== -1){
      this.boardSet = false;
      this.currentBoard.next(null) 
    }
    else{
      this.currentBoard.next(board) 
      this.getBoardTasks()
    }
    
  }

  setBoardByUrl(url){
    this.getBoardFromServer(url).subscribe(data => {
      if(data){
        this.setBoard(data)
      }
    })
  }
  
  getCurrentBoard(): board{
    return this.currentBoard.getValue()
  } 


  getBoardByUrl(boardUrl): Observable<board>{
    return this.http.get<board>(`http://localhost:8000/boards/url/${boardUrl}?format=json`)
  }

  getBoardTasks(){
    this.getTasksFromServer(this.currentBoard.getValue().id).subscribe((response) => {
      this._tasks.next(response);
    })
  }

  updateTasksStatus(task: task){
    this.tasks = this.tasks.map(element => task.id ===  element.id ? task : element);
  }

  addTask(newTask: task){
    this.tasks = [...this.tasks, newTask]
  }

  postBoard(newBoard: board):Observable<any>{
    let postObject: { [k: string]: any } = {}
    if (newBoard.board_url){
      postObject.board_url = `/${newBoard.board_url}/`
    }
    postObject.name = newBoard.name
    postObject.board_picture = newBoard.board_picture
    postObject.description = newBoard.description
    console.log(postObject)
    return this.http.post<board>('http://localhost:8000/boards/username/admin', postObject)
  }

  addBoard(board: board){
    this.boardList = [...this.boardList, board]
  }
}


