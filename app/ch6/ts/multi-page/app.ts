import {Injectable, Component, bootstrap, CORE_DIRECTIVES, FORM_DIRECTIVES, FORM_PROVIDERS, provide} from 'angular2/angular2';
import {Http, HTTP_PROVIDERS, Response} from 'angular2/http';
import {ROUTER_DIRECTIVES, ROUTER_PROVIDERS, APP_BASE_HREF, RouteConfig, LocationStrategy, HashLocationStrategy} from 'angular2/router';

class Developer {
  public id: number;
  public username: string;
  public avatarUrl: string;
  public realName: string;
  public location: string;
  public email: string;
  public website: string;
  public popular: boolean;
}

class DeveloperCollection {
  private developers: Developer[];
  constructor() {
    this.developers = [{
      id: 42,
      username: 'angular-dev',
      realName: 'Peter',
      location: 'San Francisco',
      email: 'angular-dev@angular.io',
      website: null,
      avatarUrl: null,
      popular: true
    }];
  }
  getUserByUsername(username: string) {
    return this.developers.filter(u => u.username === username).pop();
  }
  getUserById(id: number) {
    return this.developers.filter(u => u.id === id).pop();
  }
  addDeveloper(dev: Developer) {
    this.developers.push(dev);
  }
  getAll() {
    return this.developers;
  }
}

@Injectable()
class GitHubGateway {
  constructor(private http: Http) {}
  getUser(username: string) {
    return this.http.get(`https://api.github.com/users/${username}`);
  }
}

@Component({
  selector: 'home',
  directives: [CORE_DIRECTIVES, ROUTER_DIRECTIVES],
  template: `
    <table>
      <thead>
        <th>Username</th>
        <th>Email</th>
        <th>Real name</th>
        <th>Website</th>
        <th>Popularity</th>
      </thead>
      <tr *ng-for="#dev of getDevelopers()">
        <td>
          <a [router-link]="['/DeveloperDetails', { 'username': dev.username }, 'DeveloperBasicInfo']">
            {{dev.username}}
          </a>
        </td>
        <td>{{dev.email}}</td>
        <td>{{dev.realName}}</td>
        <td>{{dev.website}}</td>
        <td [ng-switch]="dev.popular">
          <span *ng-switch-when="true">⭐</span>
          <span *ng-switch-when="false">✨</span>
        </td>
      </tr>
    </table>
  `
})
class Home {
  constructor(private developers: DeveloperCollection) {}
  getDevelopers() {
    return this.developers.getAll();
  }
}

@Component({
  selector: 'dev-add',
  template: `
    <span>{{errorMessage}}</span>
    <span>{{successMessage}}</span>
    <form #f="form" (submit)="addUser()">
      Username: <input type="text" ng-control="username" (change)="resetError()" [(ng-model)]="developer.username"><br>
      Fetch from GitHub: <input type="checkbox" ng-control="fetchFromGitHub" [(ng-model)]="fetchFromGitHub"/><br>
      Real name: <input type="text" [disabled]="fetchFromGitHub" ng-control="realName" [(ng-model)]="developer.realName"/><br>
      Location: <input type="text" [disabled]="fetchFromGitHub" ng-control="location" [(ng-model)]="developer.location"/><br>
      Email: <input type="text" [disabled]="fetchFromGitHub" ng-control="email" [(ng-model)]="developer.email"/><br>
      Website: <input type="text" [disabled]="fetchFromGitHub" ng-control="website" [(ng-model)]="developer.website"/><br>
      Popular: <input type="checkbox" [disabled]="fetchFromGitHub" ng-control="popular" [(ng-model)]="developer.popular"/><br>
      <button type="submit" [disabled]="!f.form.valid">Add</button>
    </form>
  `,
  directives: [FORM_DIRECTIVES],
  providers: [GitHubGateway, FORM_PROVIDERS, HTTP_PROVIDERS]
})
class AddDeveloper {
  fetchFromGitHub: boolean = false;
  developer = new Developer();
  errorMessage: string;
  successMessage: string;

  constructor(private githubAPI: GitHubGateway, private developers: DeveloperCollection) {}
  resetError() {
    this.errorMessage = null;
  }
  resetForm() {
    let d = this.developer;
    d.email = d.location = d.website = d.username = d.realName = '';
    d.popular = false;
  }
  addUser() {
    if (this.developers.getUserByUsername(this.developer.username)) {
      this.errorMessage = `Developer with username ${this.developer.username} already exists`;
      return;
    } else {
      if (this.fetchFromGitHub) {
        this.githubAPI.getUser(this.developer.username)
          .map((r: Response) => r.json())
          .subscribe((res: any) => {
            let dev = new Developer();
            dev.username = res.login;
            dev.email = res.email;
            dev.popular = res.followers >= 1000;
            dev.location = res.location;
            dev.realName = res.name;
            dev.id = res.id;
            this.developers.addDeveloper(dev);
            this.resetForm();
            this.successMessage = `Developer ${dev.username} successfully gotten from GitHub`;
          });
      }
    }
    return false;
  }
}

@Component({
  selector: 'dev-details-basic',
  template: '<h1>Basic</h1>'
})
class DeveloperBasicInfo {}

@Component({
  selector: 'dev-details-advanced',
  template: '<h1>Advanced</h1>'
})
class DeveloperAdvancedInfo {}

@Component({
  selector: 'dev-details',
  directives: [CORE_DIRECTIVES, ROUTER_DIRECTIVES],
  template: `
    <a [router-link]="['./DeveloperBasicInfo']">Basic details</a>
    <a [router-link]="['./DeveloperAdvancedInfo']">Advanced details</a>
    <router-outlet/>
  `,
})
@RouteConfig([
  { component: DeveloperBasicInfo, as: 'DeveloperBasicInfo', path: '/' },
  { component: DeveloperAdvancedInfo, as: 'DeveloperAdvancedInfo', path: '/dev-details-advanced' }
])
class DeveloperDetails {

}

@Component({
  selector: 'app',
  template: `
    <a [router-link]="['/Home']">Home</a>
    <a [router-link]="['/AddDeveloper']">Add developer</a>
    <router-outlet/>
  `,
  providers: [DeveloperCollection],
  directives: [CORE_DIRECTIVES, ROUTER_DIRECTIVES]
})
@RouteConfig([
  { component: Home, as: 'Home', path: '/' },
  { component: AddDeveloper, as: 'AddDeveloper', path: '/dev-add' },
  { component: DeveloperDetails, as: 'DeveloperDetails', path: '/dev-details/:username/...' }
])
class App {}

bootstrap(App, [
  ROUTER_PROVIDERS,
  provide(LocationStrategy, { useClass: HashLocationStrategy }),
  provide(APP_BASE_HREF, {
    useValue: '/ch6/ts/multi-page/'
  }
)]);
