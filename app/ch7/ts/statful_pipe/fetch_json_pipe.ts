import {Pipe, PipeTransform} from '@angular/core';
import {Http, Response} from '@angular/http';

import 'rxjs/add/operator/toPromise';

@Pipe({
  name: 'fetchJson',
  pure: false
})
export class FetchJsonPipe implements PipeTransform {
  private data: any;
  private prevUrl: string;
  constructor(private http: Http) {}
  transform(url: string): any {
    if (this.prevUrl !== url) {
      this.http.get(url)
        .toPromise()
        .then((data: Response) => data.json())
        .then(result => this.data = result);
      this.prevUrl = url;
    }
    return this.data || {};
  }
}
