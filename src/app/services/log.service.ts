import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { Log } from '../models/Log';

@Injectable()
export class LogService {
  logs: Log[];

  private logSource = new BehaviorSubject<Log>({
    id: null, text: null, date: null
  });
  selectedLog = this.logSource.asObservable();

  private stateSource = new BehaviorSubject<boolean>(true);
  stateClear = this.stateSource.asObservable();

  constructor() {
    this.logs = [
      {id: '1', text: 'Generated Component', date: new Date('03/02/2018 02:54:23')},
      {id: '2', text: 'added bootsrap Component', date: new Date('03/02/2018 06:24:23')},
      {id: '3', text: 'added formsComponent', date: new Date('03/02/2018 12:35:17')},
    ];
   }
  getLogs(): Observable<Log[]> {
    if (localStorage.getItem('logs') === null) {
      this.logs = [ ]; } else {
      this.logs = JSON.parse(localStorage.getItem('logs'));
       }
    return of(this.logs.sort((a, b) => {
      return b.date = a.date ;
    }));
  }
  setFormLog(log: Log) {
    this.logSource.next(log);
  }
  addLog(log: Log) {
    this.logs.unshift(log);
    // add to localStorage
    localStorage.setItem('logs', JSON.stringify(this.logs) );
  }
  updateLog(log: Log) {
    this.logs.forEach(( cur, index) => {
      if (log.id === cur.id) {
        this.logs.splice(index, 1);
      }
    });
    this.logs.unshift(log);
    // update to localStorage
    localStorage.setItem('logs', JSON.stringify(this.logs) );

  }
  deleteLog(log: Log) {
    this.logs.forEach(( cur, index) => {
      if (log.id === cur.id) {
        this.logs.splice(index, 1);
      }
    });
    // delete to localStorage
    localStorage.setItem('logs', JSON.stringify(this.logs) );

  }
  clearState() {
    this.stateSource.next(true);
  }
}
