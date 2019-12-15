import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/service/task.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  taskList;
  searchString;

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
  constructor(private _taskService: TaskService, private _router: Router,
              private _toasterService: ToastrService, private modalService: NgbModal) {
    this.loadTaskList();
  }

  ngOnInit() { 
    if(history.state.status == 'CREATED'){
      this._toasterService.success("Task created successfully!")
    }else if(history.state.status == 'UPDATED'){
      this._toasterService.success("Task updated successfully!")
    }
  }

  navigateToCreate(task){
    this._router.navigate(["/create"], {
      state: {
        data: task
      }
    });
  }

  updateTaskStatus(status, task){
    task.taskStatus = status;
    this._taskService.updateTaskStatus(task).subscribe((res) => {
      this.loadTaskList();
      this._toasterService.success("Status updated successfully!");
    }, (err) => {
      this._toasterService.error("Error updating status!");
    });
  }

  loadTaskList(){
    this._taskService.getTasks().subscribe((res) => {
      this.taskList = res;
    }, (err) => {
      this._toasterService.error("Error fetching the data. Please refresh.")
    });
  }

  open(content, taskId) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title', centered: true}).result.then((result) => {
      if(result == 'OK'){
        this._taskService.deleteTask(taskId).subscribe((res) => {
          this._toasterService.success("Task deleted successfully");
          this.loadTaskList();
        }, (err) => {
          this._toasterService.error("Unable to delete task");
        });
      }
    });
  }

  checkExpired(task){
    if(task.taskStatus != 'COMPLETED'){
      let targetDate = new Date(task.targetDate);
      let today = new Date();
      if(targetDate < today) {
        return true;
      }else{
        return false;
      }
    }
    return false;
  }

  getStatusValue(statusCode){
    let stat = this.status.filter(s => s.code == statusCode);
    if(stat.length > 0){
      return stat[0].name;
    }
    return "";
  }

  hideSearchResult(task){
    if(this.searchString && this.searchString != ''){
      if(task.taskName.includes(this.searchString)
        || task.taskDescription.includes(this.searchString)
        || this.getStatusValue(task.taskStatus).includes(this.searchString)) {
        return false;
      }else{
        return true;
      }
    }
    return false;
  }

  getTaskDesc(taskDesc: string){
    if(taskDesc && taskDesc.length > 25){
      return taskDesc.substr(0, 25) + "...";
    }
    return taskDesc;
  }
}
