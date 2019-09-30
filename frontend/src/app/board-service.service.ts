import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { task, board, taskList } from './interfaces/interfaces'
import { Observable, BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class BoardService {

  public boardSet: boolean = false

  private httpOptions: any;
  private currentBoard: BehaviorSubject<board> = new BehaviorSubject<board>(null);
  private todo: BehaviorSubject<task[]> = new BehaviorSubject<task[]>([])
  private inProgress: BehaviorSubject<task[]> = new BehaviorSubject<task[]>([])
  private done: BehaviorSubject<task[]> = new BehaviorSubject<task[]>([])
    

  constructor(private http: HttpClient) {
    this.httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
  }

  ngOnInit(){
  }

  getBoard( username ): Observable<board[]>{
    return this.http.get<board[]>( `http://localhost:8000/boards/username/${username}?format=json` )
  }

  private getTasksFromServer( boardId ) : Observable<task[]>{
    return boardId ? this.http.get<task[]>(`http://localhost:8000/my-boards/${boardId}?format=json`) : null;
  }

  private getBoardFromServer(boardUrl): Observable<board> {
    return this.http.get<board>(`http://localhost:8000/boards/url/${boardUrl}?format=json`)
  }

  getTasks(): any{
    return {
      todo: this.todo,
      inProgress: this.inProgress,
      completed: this.done
    }
  }

  setBoard( board ): void{
    console.log("setting board!")
    this.boardSet = true;
    console.log(board)
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
  
  getCurrentBoard(): BehaviorSubject<board>{
    return this.currentBoard
  } 


  getBoardByUrl(boardUrl): Observable<board>{
    return this.http.get<board>(`http://localhost:8000/boards/url/${boardUrl}?format=json`)
  }

  getBoardTasks(){
    this.getTasksFromServer(this.currentBoard.getValue().id).subscribe((response) => {
      this.todo.next(response.filter(element => element.status === "1"));
      this.inProgress.next(response.filter(element => element.status === "2"));
      this.done.next(response.filter(element => element.status === "2"));
    })
  }

  addTask(){
    const newTask: task = {
      id: "string",
      title: "string",
      description: "string",
      points: 85,
      priority: "string",
      status: "string",
      repeat_task: false,
      assigned_to: 4,
      board: 22
    }
    this.todo.next([...this.todo.getValue(), newTask]) 
  }
}


