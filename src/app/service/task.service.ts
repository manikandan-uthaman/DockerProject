import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  taskList: Array<any>

  constructor() { 
    this.taskList = [{
      'name': 'Task-1',
      'description': 'First Task',
      'targetDate': '12-12-2019',
      'status': 'NOT_STARTED'
    }, {
      'name': 'Task-2',
      'description': 'Second Task',
      'targetDate': '23-01-2020',
      'status': 'IN_PROGRESS'
    }, {
      'name': 'Task-3',
      'description': 'Third Task',
      'targetDate': '08-02-2020',
      'status': 'COMPLETED'
    }];
  }

  createTask(task){
    this.taskList.push(task);
  }

  getTasks(){
    return this.taskList;
  }
}
