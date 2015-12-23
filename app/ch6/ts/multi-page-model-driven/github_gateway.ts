import {Injectable} from 'angular2/core';
import {Http} from 'angular2/http';

@Injectable()
export class GitHubGateway {
  constructor(private http: Http) {}
  getUser(username: string) {
    return this.http.get(`https://api.github.com/users/${username}`);
  }
}
