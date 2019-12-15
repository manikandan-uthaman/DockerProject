import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor(private _httpClient: HttpClient) {   }

  uploadFile(fileToUpload: File, taskId){
      const url = '/to-do/file/upload/' + taskId;
      const formData = new FormData();
      formData.append('file', fileToUpload, fileToUpload.name);
      return this._httpClient.post(url, formData);
  }
}