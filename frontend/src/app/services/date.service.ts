import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateService {

  constructor() { }

  // this function is taken from my project 3, with only minor alterations to support typescript
  formatDate(dateString){
    const date = new Date(dateString)
    const diff = new Date().getTime() - date.getTime() ; // the difference in milliseconds

    if (diff < 1000) {
      // less than 1 second
      return 'right now';
    }

    const sec = Math.floor(diff / 1000); // convert diff to seconds

    if (sec < 60) {
      return `${sec} sec. ago`;
    }

    const min = Math.floor(diff / 60000); // convert diff to minutes
    if (min < 60) {
      return `${min} min. ago`;
    }

    // format the date
    // add leading zeroes to single-digit day/month/hours/minutes
    
    let d: string[] = [
      `0${date.getDate()}`,
      `0${date.getMonth() + 1}`,
      `${date.getFullYear()}`,
      `0${date.getHours()}`,
      `0${date.getMinutes()}`
    ].map(component => component.slice(-2)); // take last 2 digits of every component

    // join the components into date
    return `${d.slice(0, 3).join('.')} ${d.slice(3).join(':')}`;
  };
}
