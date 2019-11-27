import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { task, member, board } from '../interfaces/interfaces'
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiService } from './api-service.service'


@Injectable({
  providedIn: 'root',
})
export class BoardService {
  constructor(private api: ApiService) {}

  public boardSet: boolean = false;
  public currentBoard: BehaviorSubject<board> = new BehaviorSubject<board>(null);
  private _tasks: BehaviorSubject<task[]> = new BehaviorSubject<task[]>([]);
  private _boardList: BehaviorSubject<board[]> = new BehaviorSubject<board[]>([]);
  private _memberList: BehaviorSubject<member[]> = new BehaviorSubject<member[]>([]);
  private _boardCount: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  private _currentTasks: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);

  readonly currentBoard$ = this.currentBoard.asObservable();
  readonly tasks$ = this._tasks.asObservable();
  readonly boardList$ = this._boardList.asObservable();
  readonly memberList$ = this._memberList.asObservable();
  readonly boardCount$ = this._boardCount.asObservable();
  readonly currentTasks$ = this._currentTasks.asObservable();

  readonly todo$ = this.tasks$.pipe(map(tasks => tasks.filter(task => task.status === '1')));

  readonly inProgress$ = this.tasks$.pipe(map(tasks => tasks.filter(task => task.status === '2')));

  readonly completed$ = this.tasks$.pipe(map(tasks => tasks.filter(task => task.status === '3')));

  get tasks(): task[] {
    return this._tasks.getValue();
  }

  set tasks(val: task[]) {
    this._tasks.next(val);
  }

  get boardList(): board[] {
    return this._boardList.getValue();
  }

  set boardList(val: board[]) {
    this._boardList.next(val);
  }

  get memberList(): member[] {
    return this._memberList.getValue();
  }

  set memberList(val: member[]) {
    this._memberList.next(val);
  }

  get boardCount(): number{
    return this._boardCount.getValue();
  }

  set boardCount(val: number){
    this._boardCount.next(val);
  }

  get currentTasks(): any[] {
    return this._currentTasks.getValue();
  }

  set currentTasks(val: any[]) {
    this._currentTasks.next(val);
  }

  setBoardListByUser(username) {
    this.api.getBoardListByUser(username).subscribe(data => {
      if (data) {
        this.boardList = data.boards;
      }
    });
  }

  getCurrentTasksByUser(username){
    return this.api.getTasksByUser(username).subscribe(data => {
      this.currentTasks = data;
    });
  }

  getTasks(): any {
    return {
      todo: this.todo$,
      inProgress: this.inProgress$,
      completed: this.completed$,
    };
  }

  setBoard(board): void {
    this.boardSet = true;
    if (board.id === -1) {
      this.boardSet = false;
      this.currentBoard.next(null);
    } else {
      this.currentBoard.next(board);
      this.getBoardTasks();
      this.getMemberList(this.currentBoard.getValue().id);
    }
  }

  setBoardByUrl(url) {
    this.api.getBoardByUrl(url).subscribe(data => {
      if (data) {
        this.setBoard(data);
      }
    });
  }

  getCurrentBoard(): board {
    return this.currentBoard.getValue();
  }

  getBoardTasks() {
    this.api.getTasksByBoard(this.currentBoard.getValue().id).subscribe(response => {
      this._tasks.next(response);
    });
  }

  getBoardCount(user_id: string){
    this.api.getNumberOfBoards(user_id).subscribe(data => {
      this.boardCount = data.board_count
    });
  }

  updateTasksStatus(task: task) {
    console.log(task)
    //this.tasks = this.tasks.map(element => (task.id === element.id ? task : element));
    this.api.updateTask(task).subscribe( response =>{
      this.getBoardTasks();
    })
  }

  addTask(newTask: task) {
    this.api.postTask(newTask).subscribe(result => (this.tasks = [...this.tasks, result]));
  }

  scoreTask(task: task, username: string) {
    this.api.completeTask(task).subscribe(data => {
      this.getBoardTasks();
      if (data.results === "completed"){
        this.getBoardTasks();
        this.setBoardListByUser(username)
      }
    })
  }

  addBoard(board: board, username: string) {
    this.api.postBoard(board, username).subscribe(
      result => {
        console.log(result)
        if (result.error){
          console.log(`error ${result.error}`)
          return result.error
        }
        this.boardList = [...this.boardList, result];
        this.boardCount = this.boardCount += 1;
      })
  }

  deleteBoard(boardId: string) {
    this.api.deleteBoardById(boardId).subscribe(result => {
      if (result.success) {
        this.boardCount = this.boardCount -= 1;
        this.boardList = this.boardList.filter(board => board.id != +boardId);
      }
    });
  }

  getMemberList(boardId: number) {
    this.api.getUsersByBoard(boardId).subscribe(result => {
      if (!result.error) {
        this.memberList = result.memberNames.map((element, index) => {
          return {
            username: element,
            score: result.memberScores[index],
            is_admin: result.admins.includes(element),
          };
        });
      }
    });
  }

  addMembers(mailingList: any) {
    const validMembers = mailingList.emails.filter(element => {
      if (!element.invalid) {
        return element.value;
      }
    });
    const postObject = {
      boardCode: mailingList.boardCode,
      emails: validMembers,
    };
    this.api.postMembers(postObject).subscribe(result => {
      this.getMemberList(this.getCurrentBoard().id);
    });
  }
}

