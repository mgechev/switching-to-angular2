import {Developer} from './developer';

export class DeveloperCollection {
  private developers: Developer[] = [];

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
