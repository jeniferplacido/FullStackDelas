import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  constructor(private firestore: AngularFirestore) {}

  getCurriculos(): Observable<any[]> {
    return this.firestore.collection('curriculos').valueChanges();
  }

  adicionarCurriculos(curriculos: any): Promise<any> {
    return this.firestore.collection('curriculos').add(curriculos);
  }
}
