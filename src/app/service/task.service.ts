import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  taskList: Array<any>

  constructor(private _httpClient: HttpClient) {   }

  createTask(task){ 
    return this._httpClient.post("/to-do/task/add", task);
   }

  getTasks(){
    return this._httpClient.get("/to-do/task/get");
  }
}
