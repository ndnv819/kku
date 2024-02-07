// eslint-disable-next-line import/no-extraneous-dependencies
import { doc, getDoc, getDocs, query } from '@firebase/firestore';
import { shopsCollection } from '@infrastructure/firebase/collections';
import { deleteDoc, setDoc, updateDoc } from 'firebase/firestore';
import { omit } from 'lodash';

import type { Shop } from '../models/shop';

function getShopdocRef(id?: string) {
  return id ? doc(shopsCollection, id) : doc(shopsCollection);
}

export async function getShops(): Promise<Shop[]> {
  const snapshot = await getDocs(query(shopsCollection));

  return snapshot.docs.map((document) => document.data());
}

export async function getShopById(id: string): Promise<Shop> {
  const docSnap = await getDoc(getShopdocRef(id));

  if (docSnap.exists()) {
    return docSnap.data();
  }
  throw new Error('존재하지 않는 상점입니다.');
}

export async function addShop(shop: Omit<Shop, 'id'>): Promise<Shop> {
  try {
    const docRef = getShopdocRef();
    await setDoc(docRef, shop);
    return { id: docRef.id, ...shop };
  } catch (error) {
    throw new Error('상점 추가에 실패했습니다.');
  }
}

export async function putShop(shop: Shop): Promise<Shop> {
  try {
    await setDoc(getShopdocRef(shop.id), omit(shop, ['id']));
    return shop;
  } catch (error) {
    throw new Error('상점 수정에 실패했습니다.');
  }
}

export async function patchShop(
  id: string,
  shop: Partial<Shop>,
): Promise<Shop> {
  try {
    await updateDoc(getShopdocRef(id), shop);

    const patchDoc = await getDoc(getShopdocRef(id));
    return patchDoc.data()!;
  } catch (error) {
    throw new Error('상점 수정에 실패했습니다.');
  }
}

export async function deleteShop(id: string): Promise<void> {
  try {
    await deleteDoc(getShopdocRef(id));
  } catch (error) {
    throw new Error('존재하지 않는 상점입니다.');
  }
}
