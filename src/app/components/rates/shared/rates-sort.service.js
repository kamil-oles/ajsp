export class RatesSortService {
  sort(data, type, direction) {
    if (data.length > 1) {
      return data.sort((a, b) => {
        if (direction === 'ASC') {
          return this.sortUp(a, b, type);
        } else {
          return this.sortDown(a, b, type);
        }
      });
    }
  }

  sortDown(a, b, type) {
    if (a[type] < b[type]) {
      return 1;
    }
    if (a[type] > b[type]) {
      return -1;
    }
    return 0;
  }

  sortUp(a, b, type) {
    if (a[type] < b[type]) {
      return -1;
    }
    if (a[type] > b[type]) {
      return 1;
    }
    return 0;
  }
}