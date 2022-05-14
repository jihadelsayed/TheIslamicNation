import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WaitingServiceService {
  private count = 0;
  private spinner$ = new BehaviorSubject<string>('');

  constructor() { }

  getSpinnerObserver(): Observable<string>{
    return this.spinner$.asObservable();
  }

  requestStarted(){
    if(++this.count == 1){
      this.spinner$.next('start')
    }
  }
  requestEnded(){
    if(this.count === 0 || --this.count === 0){
      this.spinner$.next('stop')
    }
  }
  resetWait(){
    this.count = 0
    this.spinner$.next('stop')
  }
}
