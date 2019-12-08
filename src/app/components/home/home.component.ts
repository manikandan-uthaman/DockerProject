import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/service/task.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  taskList;
  
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
  this._taskService.getTasks().subscribe((res) => {
      this.taskList = res;
    });
  }

  ngOnInit() { }

  navigateToCreate(){
    this._router.navigate(["/create"]);
  }
}
