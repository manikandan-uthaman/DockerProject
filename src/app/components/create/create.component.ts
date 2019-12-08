import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/service/task.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  createTaskForm: FormGroup;

  constructor(private _taskService: TaskService, private _router: Router, private _fb: FormBuilder) { 
    this.createTaskForm = this._fb.group({
      taskName: ['', Validators.required],
      taskDescription: ['', [Validators.required, Validators.max(1000)]],
      targetDate: ['', Validators.required],
      taskStatus: ['NOT_STARTED', Validators.required]
    });
  }

  ngOnInit() {
  }

  createTask(){
    console.log(this.createTaskForm.value);
    this._taskService.createTask(this.createTaskForm.value).subscribe((res) => {
      this._router.navigate(["/home"]);
    }, (err) => {
      console.log(err);
    });
  }

  returnToHome(){
    this._router.navigate(["/home"]);
  }
}
