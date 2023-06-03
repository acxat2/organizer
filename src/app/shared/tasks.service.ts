import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

export interface Task {
  id?: string,
  title: string,
  date?: string
}

interface CreateResponse {
  name: string
}

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  static url = 'https://angular-practice-calenda-e68df-default-rtdb.europe-west1.firebasedatabase.app/tasks';

  constructor(private http: HttpClient) {}

  public create(task: Task): Observable<Task> {
    return this.http
      .post<CreateResponse>(`${TasksService.url}/${task.date}.json`, task)
      .pipe(map((res) => {
        return {...task, id: res.name};
      }))
  }

  public load(date: moment.Moment): Observable<Task[]> {
    return this.http
      .get<Task[]>(`${TasksService.url}/${date.format('DD-MM-YYYY')}.json`)
      .pipe(map(tasks => {
        if (!tasks) {
          return []
        }
        return Object.keys(tasks).map((key: any) => ({...tasks[key], id: key}))
      }))
  }

  public dayList(): Observable<any> {
    return this.http
      .get(`${TasksService.url}.json`)
  }

  public remove(task: Task): Observable<void> {
    return this.http
      .delete<void>(`${TasksService.url}/${task.date}/${task.id}.json`)
  }

  public change(task: Task): Observable<Task> {
    return this.http
      .patch(`${TasksService.url}/${task.date}/${task.id}.json`, task)
      .pipe(map(() => {
        return {...task}
      }))
  }
}
