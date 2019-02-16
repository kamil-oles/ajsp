export class RatesTableSortService {
  sort(data, type, direction) {
    if (data.length > 1) {
      const FIRST_COMPARISON = (direction === 'ASC' ? -1 : 1),
        SECOND_COMPARISON = (direction === 'ASC' ? 1 : -1);
      return data.sort((a, b) => {
        return this.actualSort(a, b, type, FIRST_COMPARISON, SECOND_COMPARISON);
      });
    }
  }

  actualSort(a, b, type, firstResult, secondResult) {
    if (a[type] < b[type]) {
      return firstResult;
    }
    if (a[type] > b[type]) {
      return secondResult;
    }
    return 0;
  }
}