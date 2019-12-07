import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/service/task.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  constructor(private _taskService: TaskService, private _router: Router) { }

  ngOnInit() {
  }

  createTask(){
    this._taskService.createTask({
      'name': 'Task-4',
      'description': 'Fourth Task',
      'targetDate': '12-12-2019',
      'status': 'Not Started'
    });
  }

  returnToHome(){
    this._router.navigate(["/home"]);
  }
}
