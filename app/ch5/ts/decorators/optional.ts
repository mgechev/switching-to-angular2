import 'reflect-metadata';
import {
  ReflectiveInjector, Inject, Injectable, Optional
} from '@angular/core';

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

let injector = ReflectiveInjector.resolveAndCreate([
  Collection
]);

console.log(injector.get(Collection).sort === null);
