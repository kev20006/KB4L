import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { task, board, taskList } from './interfaces/interfaces'
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiService } from './api-service.service'


@Injectable({
  providedIn: 'root'
})

export class BoardService {

  constructor( private api: ApiService ) {}

  public boardSet: boolean = false
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
    this.api.getBoardListByUser(username).subscribe(data => {
      if (data) {
        this.boardList = data.boards;
      }
    })
  }

  getTasks(): any{
    return {
      todo: this.todo$,
      inProgress: this.inProgress$,
      completed: this.completed$
    }
  }

  setBoard( board ): void{
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
    this.api.getBoardByUrl(url).subscribe(data => {
      if(data){
        this.setBoard(data)
      }
    })
  }
  
  getCurrentBoard(): board{
    return this.currentBoard.getValue()
  } 

  getBoardTasks(){
    this.api.getTasksByBoard(this.currentBoard.getValue().id).subscribe((response) => {
      this._tasks.next(response);
    })
  }

  updateTasksStatus(task: task){
    this.tasks = this.tasks.map(element => task.id ===  element.id ? task : element);
  }

  addTask(newTask: task){
    this.api.postTask(newTask).subscribe(
      result => this.tasks = [...this.tasks, result]
    )
  }

  addBoard(board: board){
    this.api.postBoard(board).subscribe(
      result => this.boardList = [...this.boardList, result]
    );
  }

  deleteBoard( boardUrl: string ) {
    this.api.deleteBoardByUrl( boardUrl ).subscribe(
      result => {
        if(result.success){
          this.boardList = this.boardList.filter(board => board.board_url != `/${boardUrl}/`)
        }
      }
    )
  }
}

