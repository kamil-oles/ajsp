import { DB } from '../../app.module';

export class ComponentsDbService {
  getData(collection, doc) {
    const LOCAL_COLLECTION = JSON.parse(localStorage.getItem(`${collection}_${doc}`));
    if (!LOCAL_COLLECTION) {
      return DB.collection(collection).doc(doc).get()
        .then(function (querySnapshot) {
          const DATA = querySnapshot.data();
          localStorage.setItem(`${collection}_${doc}`, JSON.stringify(DATA));
          return DATA;
        });
    } else {
      return LOCAL_COLLECTION;
    }
  }
}