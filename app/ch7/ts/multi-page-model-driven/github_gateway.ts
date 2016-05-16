import {Injectable} from '@angular/core';
import {Http} from '@angular/http';

@Injectable()
export class GitHubGateway {
  constructor(private http: Http) {}
  getUser(username: string) {
    return this.http.get(`https://api.github.com/users/${username}`);
  }
}
