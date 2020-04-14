import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
 
  constructor(private afs: AngularFirestore) { }

  addItem(item: any) {
    return this.afs.collection('item').add(item);
  }

  getItems() {
    return this.afs.collection('item').snapshotChanges().pipe(
      map(docs => docs.map(doc => {
        const item = doc.payload.doc.data() as any;
        const id = doc.payload.doc.id;

        return { id, ...item }
      }))
    )
  }

  getItem(itemId: string) {
    return this.afs.doc(`item/${itemId}`).snapshotChanges().pipe(
      map(doc => {
        const item = doc.payload.data() as any;
        const id = doc.payload.id;
        return { id, ...item }
      })
    );
  }

  deleteItem(itemId: string) {
    return this.afs.doc(`item/${itemId}`).delete();
  }
  
  updateItem(itemId: string, updatedItem: any) {
    return this.afs.doc(`item/${itemId}`).update(updatedItem);
  }
}