import 'reflect-metadata';
import {
  Injector, Inject, Injectable, provide, Optional
} from 'angular2/core';

abstract class SortingAlgorithm {
  abstract sort(collection: BaseCollection): Collection;
}

class BaseCollection {
  getDefaultSort(): SortingAlgorithm {
    // get some generic sorting algorithm...
    return null;
  }
}

@Injectable()
class Collection extends BaseCollection {
  private sort: SortingAlgorithm;
  constructor(@Optional() sort: SortingAlgorithm) {
    super();
    this.sort = sort || this.getDefaultSort();
  }
}

let injector = Injector.resolveAndCreate([
  Collection
]);

console.log(injector.get(Collection).sort === null);
