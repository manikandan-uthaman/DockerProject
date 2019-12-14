import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/service/task.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  createTaskForm: FormGroup;
  

  constructor(private _taskService: TaskService, private _router: Router, private _fb: FormBuilder, private _toasterService: ToastrService) { 
    this.createTaskForm = this._fb.group({
      taskId: '',
      taskName: ['', Validators.required],
      taskDescription: ['', [Validators.required, Validators.max(1000)]],
      targetDate: ['', Validators.required],
      taskStatus: ['NOT_STARTED', Validators.required]
    });
    if(history.state.data){
      this.createTaskForm.setValue(history.state.data);
    }
  }

  ngOnInit() {
    console.log(history.state.data);
  }

  createTask(){
    console.log(this.createTaskForm.value);
    this._taskService.createTask(this.createTaskForm.value).subscribe((res) => {
      this._router.navigate(["/home"], {
        state: {
          status: 'SUCCESS'
        }
      });
    }, (err) => {
      this._toasterService.error("Error while creating task. Try again later");
    });
  }

  returnToHome(){
    this._router.navigate(["/home"]);
  }
}
