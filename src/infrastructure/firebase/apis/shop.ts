import { doc, getDoc, getDocs, query } from '@firebase/firestore';
import { shopsCollection } from '@infrastructure/firebase/collections';

import type { Shop } from '../models/shop';

export async function getShops(): Promise<Shop[]> {
  const snapshot = await getDocs(query(shopsCollection));

  return snapshot.docs.map((document) => document.data());
}

export async function getShopById(id: string): Promise<Shop> {
  const docRef = doc(shopsCollection, id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data();
  }
  throw new Error('존재하지 않는 상점입니다.');
}
