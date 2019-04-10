export class ComponentsDateService {
  setDateFrom(days) {
    const START = new Date();
    return new Date(START.setDate(START.getDate() - days));
  }
}