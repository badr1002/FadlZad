import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
  FirebaseStorage
} from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private _http: HttpClient) { }

  profileImage: any
  register(data: any): Observable<any> {
    return this._http.post(`/api/auth/register`, data);
  }

  login(data: any): Observable<any> {
    return this._http.post(`/api/auth/login`, data);
  }
  forgetPassword(data: any): Observable<any> {
    return this._http.post(`/api/auth/forgetPassword`, data);
  }

  checkCode(data: any): Observable<any> {
    return this._http.post(`/api/auth/check/code`, data);
  }
  setNewPassword(data: any): Observable<any> {
    return this._http.patch(`/api/auth/set/password`, data);
  }
  getUser(): Observable<any> {
    return this._http.get(`/api/auth/me`);
  }
  getAllUsers(): Observable<any> {
    return this._http.get(`/api/auth/all`);
  }
  getUserById(id: any): Observable<any> {
    return this._http.get(`/api/auth/getUserById/${id}`);
  }
  enableUser(id: any): Observable<any> {
    return this._http.patch(`/api/auth/enableUser`, { id });
  }
  disableUser(id: any): Observable<any> {
    return this._http.patch(`/api/auth/disableUser`, { id });
  }

  editProfile(data: any): Observable<any> {
    return this._http.patch(`/api/auth/edit`, data);
  }
  uploadProfileImage(link: any): Observable<any> {
    return this._http.post(`/api/auth/profileImage`, { link });
  }
  uploadProfileImageCloud(file: File) {
    const metadata = {
      contentType: 'image/jpeg',
      size: 2097152,
    };
    let user: any = JSON.parse(localStorage.getItem('user'))
    let ext = file.name.split(/[#?]/)[0].split('.').pop().trim()
    const filePath = `/profileImage/${user._id + '_' + user.name + '.' + ext}`;
    const storage = getStorage();
    const storageRef = ref(storage, filePath);
    const uploadTask = uploadBytesResumable(storageRef, file, metadata);
    return uploadTask;
  }
  deleteProfileImage(): Observable<any> {
    return this._http.delete(`/api/auth/deleteProfileImage`);
  }
  deleteProfileImageCloud = (callback: any) => {

    let user: any = JSON.parse(localStorage.getItem('user'))
    let ext = user.image.split(/[#?]/)[0].split('.').pop().trim()
    const filePath = `/profileImage/${user._id + '_' + user.name + "." + ext}`;
    const storage = getStorage();
    const desertRef = ref(storage, filePath);
    deleteObject(desertRef).then(() => {
      callback(false)
    }).catch(err => {
      callback(true,err)
    })


  }
  contactMessage(data: any): Observable<any> {
    return this._http.post(`/api/contact`, data);
  }
  logout(): Observable<any> {
    return this._http.delete(`/api/auth/logout`);
  }
}
