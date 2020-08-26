import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { ToDo } from 'src/app/model/to-do'
import { User } from '../model/user';

const baseUrl = 'http://localhost:8080/api/todos';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(private http: HttpClient) { }

  getAll(userID: number) {
    return this.http.get<ToDo[]>(`${baseUrl}/user/${userID}`);
  }

  get(id: Number) {
    return this.http.get<ToDo>(`${baseUrl}/${id}`);
  }

  getCurrentUser() {
    let username = localStorage.getItem('user-name');
    return this.http.get<User>(`http://localhost:8080/api/user/${username}`);
  }

  create(data: ToDo){
    return this.http.post<ToDo>(baseUrl,data);
  }

  update(id: Number, data: ToDo) {
    return this.http.put(`${baseUrl}/${id}`, data);
  }

  delete(id: Number) {
    return this.http.delete(`${baseUrl}/${id}`);
  }

  deleteAll() {
    return this.http.delete(baseUrl);
  }

  findByName(name: String) {
    return this.http.get(`${baseUrl}?title=${name}`);
  }
}
