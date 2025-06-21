import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { Post } from '../models/post.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private apiUrl = '';

  constructor(private http: HttpClient) { }

  getUsers(): Observable<any> {
    return null;
  }

  getPosts(): Observable<any> {
    return null;
  }
}
