import 'reflect-metadata';
import {
  Injector, Inject, Injectable, provide
} from 'angular2/core';

abstract class SortingAlgorithm {
  abstract sort(collection: BaseCollection): BaseCollection;
}

class QuickSort extends SortingAlgorithm {
  sort(collection: BaseCollection): BaseCollection {
    // do some sorting
    return collection;
  }
}

class MergeSort extends SortingAlgorithm {
  sort(collection: BaseCollection): BaseCollection {
    // do some sorting
    return collection;
  }
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
  constructor(@Inject(SortingAlgorithm) sort: SortingAlgorithm[]) {
    super();
    this.sort = sort.pop();
  }
}

let injector = Injector.resolveAndCreate([
  provide(SortingAlgorithm, { useClass: MergeSort, multi: true }),
  provide(SortingAlgorithm, { useClass: QuickSort, multi: true }),
  Collection
]);

console.log(injector.get(Collection).sort);
