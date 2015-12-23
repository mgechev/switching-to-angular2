import {Developer} from './developer';

export class DeveloperCollection {
  private developers: Developer[];
  constructor() {
    this.developers = [{
      id: 1,
      realName: 'foobar',
      email: 'aasd',
      githubHandle: 'mgechev',
      technology: 'C',
      popular: true,
      avatarUrl: 'asd'
    }];
  }
  getUserByGitHubHandle(username: string) {
    return this.developers.filter(u => u.githubHandle === username).pop();
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