import { doc, getDoc, getDocs, query } from '@firebase/firestore';
import { shopsCollection } from '@infrastructure/firebase/collections';

import { deleteDoc, setDoc, updateDoc } from 'firebase/firestore';
import { omit } from 'lodash';
import { db } from '../firestore';
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

export async function addShop(shop: Omit<Shop, 'id'>): Promise<Shop> {
  try {
    const docRef = doc(shopsCollection);
    await setDoc(docRef, shop);
    return {id: docRef.id, ...shop};
  } catch (error) {
    throw new Error('상점 추가에 실패했습니다.');
  }
}

// NOTE:: 덮어씌움
export async function putShop(shop: Shop): Promise<Shop> {
  try {
    const docRef = doc(shopsCollection, shop.id);
    await setDoc(docRef, omit(shop, ['id']));
    return shop;
  } catch (error) {
    throw new Error('상점 수정에 실패했습니다.');
  }
}

export async function patchShop(id: string, shop: Partial<Shop>): Promise<Shop> {
  try {
    const docRef = doc(shopsCollection, id);
    await updateDoc(docRef, shop)

    const patcheDoc = await getDoc(docRef);
    return patcheDoc.data()!;
  } catch (error) {
    throw new Error('상점 수정에 실패했습니다.');
  }
}

export async function deleteShop(id: string): Promise<void> {
  try {
    const docRef = (doc(db, "shop", id))
    await deleteDoc(docRef);
  } catch (error) {
    throw new Error('존재하지 않는 상점입니다.');
  }
}