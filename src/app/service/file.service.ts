import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor(private _httpClient: HttpClient) {   }

  uploadFile(fileToUpload: File){
      const url = '/to-do/file/upload';
      const formData = new FormData();
      formData.append('file', fileToUpload, fileToUpload.name);
      return this._httpClient.post(url, formData);
  }
}