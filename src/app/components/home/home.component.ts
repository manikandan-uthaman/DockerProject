import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/service/task.service';
import { Router } from '@angular/router';

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
  constructor(private _taskService: TaskService, private _router: Router) { 
    console.log(this._taskService.getTasks());
  }

  ngOnInit() {
    console.log(this._taskService.getTasks());
    this.taskList = this._taskService.taskList;
  }

  navigateToCreate(){
    this._router.navigate(["/create"]);
  }
}
