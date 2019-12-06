import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/service/task.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  constructor(private _taskService: TaskService) { }

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

}
