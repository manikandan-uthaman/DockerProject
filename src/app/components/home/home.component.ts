import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/service/task.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  taskList: Array<any>;
  status = [{
    "code": "NOT_STARTED",
    "name": "Not Started"
  },{
    "code": "IN_PROGRESS",
    "name": "In Progress"
  },{
    "code": "COMPLETED",
    "name": "Completed"
  }];
  constructor(private _taskService: TaskService) { 
    console.log(this._taskService.getTasks());
    // this.taskList = [{
    //   'name': 'Task-1',
    //   'description': 'First Task',
    //   'targetDate': '12-12-2019',
    //   'status': 'Not Started'
    // }, {
    //   'name': 'Task-2',
    //   'description': 'Second Task',
    //   'targetDate': '23-01-2020',
    //   'status': 'In Progress'
    // }, {
    //   'name': 'Task-3',
    //   'description': 'Third Task',
    //   'targetDate': '08-02-2020',
    //   'status': 'Not Started'
    // }];
  }

  ngOnInit() {
    console.log(this._taskService.getTasks());
    this.taskList = this._taskService.taskList;
  }

}
