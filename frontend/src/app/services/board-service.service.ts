import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { task, board, member } from '../interfaces/interfaces'
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
  private _memberList: BehaviorSubject<member[]> = new BehaviorSubject<member[]>([]);

  readonly currentBoard$ = this.currentBoard.asObservable();
  readonly tasks$ = this._tasks.asObservable();
  readonly boardList$ = this._boardList.asObservable();
  readonly memberList$ = this._memberList.asObservable();

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

  get memberList(): member[] {
    return this._memberList.getValue()
  }

  set memberList(val: member[]) {
    this._memberList.next(val);
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
      this.getMemberList(this.currentBoard.getValue().id)
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

  deleteBoard( boardId: string ) {
    this.api.deleteBoardById( boardId ).subscribe(
      result => {
        if(result.success){
          this.boardList = this.boardList.filter(board => board.id != + boardId)
        }
      }
    )
  }

  getMemberList ( boardId: number ) {
    this.api.getUsersByBoard( boardId ).subscribe(
      result => {
        if(!result.error){
          console.log(result)
          this.memberList = result.memberNames.map((element, index) => {
            return {
              username: element,
              score: result.memberScores[index],
              is_admin: result.admins.includes(element)
            }
          })
        }
      }
    )
  }

  addMembers ( mailingList: any ) {
    const validMembers = mailingList.emails.filter(element => {
      if(!element.invalid){
        return element.value
      }
    })
    const postObject = {
      boardCode: mailingList.boardCode,
      emails: validMembers
    }
    this.api.postMembers(postObject).subscribe(
      result=> {
        this.getMemberList(this.getCurrentBoard().id)
      }
    );
  }
}

