import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/service/task.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { FileService } from 'src/app/service/file.service';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  createTaskForm: FormGroup;
  fileToUpload: File = null;

  constructor(private _taskService: TaskService, private _router: Router,
    private _fb: FormBuilder, private _toasterService: ToastrService, private _fileService: FileService) { 
    this.createTaskForm = this._fb.group({
      taskId: '',
      taskName: ['', Validators.required],
      taskDescription: ['', [Validators.required, Validators.max(1000)]],
      targetDate: ['', Validators.required],
      taskStatus: ['NOT_STARTED', Validators.required],
      fileId: '',
      fileName: ''
    });
    if(history.state.data){
      this.createTaskForm.setValue(history.state.data);
    }
  }

  ngOnInit() {
    console.log(history.state.data);
  }

  saveTask(){
    this._taskService.createTask(this.createTaskForm.value).subscribe((res) => {
      this._router.navigate(["/home"], {
        state: {
          status: (this.createTaskForm.controls['taskId'].value && this.createTaskForm.controls['taskId'].value != '' ) ? 'UPDATED' : 'CREATED'
        }
      });
    }, (err) => {
      this._toasterService.error("Error while creating task. Try again later");
    });
  }

  createTask(){
    console.log(this.createTaskForm.value);
    if(this.fileToUpload != null){
      this._fileService.uploadFile(this.fileToUpload).subscribe((res) => {
        this.createTaskForm.controls['fileId'].setValue(res['file_id']);
        this.createTaskForm.controls['fileName'].setValue(res['file_name']);
        // this._toasterService.success("File uploaded successfully");
        this.saveTask();
      }, (err) => {
        this._toasterService.error("Error while uploading file.");
      });
    } else {
      this.saveTask();
    }
  }

  returnToHome(){
    this._router.navigate(["/home"]);
  }

  handleFileInput(files: FileList){
    this.fileToUpload = files.item(0);
    this.createTaskForm.controls['fileId'].setValue('file_id');
    this.createTaskForm.controls['fileName'].setValue(this.fileToUpload.name);
}

  getFileId(){
    return this.createTaskForm.controls['fileId'].value;
  }

  getFileName(){
    return this.createTaskForm.controls['fileName'].value;
  }
  
  getButtonLabel() {
    if(this.createTaskForm.controls['taskId'].value && this.createTaskForm.controls['taskId'].value != '' ){
      return "Update";
    }else {
      return "Create";
    }
  }

  downloadFile() {
    this._fileService.downloadFile(this.getFileId()).subscribe((res) => {
      console.log(res);
      saveAs(res);
    }, (err) => {
      this._toasterService.error("Unable to download file.");
    })
  }
}
