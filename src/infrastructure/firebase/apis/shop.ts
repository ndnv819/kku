// eslint-disable-next-line import/no-extraneous-dependencies
import { doc, getDoc, getDocs, query } from '@firebase/firestore';
import type { CollectionReference, DocumentData } from 'firebase/firestore';
import { deleteDoc, setDoc, updateDoc } from 'firebase/firestore';
import { omit } from 'lodash';

function getdocRef(collectionName: CollectionReference, id?: string) {
  return id ? doc(collectionName, id) : doc(collectionName);
}

export async function getData(
  collectionName: CollectionReference,
): Promise<DocumentData[]> {
  const snapshot = await getDocs(query(collectionName));

  return snapshot.docs.map((document) => document.data());
}

export async function getDataById(
  collectionName: CollectionReference,
  id: string,
): Promise<DocumentData> {
  const docSnap = await getDoc(getdocRef(collectionName, id));

  if (docSnap.exists()) {
    return docSnap.data();
  }
  throw new Error('존재하지 않는 상점입니다.');
}

export async function addData<T>(
  collectionName: CollectionReference,
  data: Omit<T, 'id'>,
): Promise<{ id: string } & Omit<T, 'id'>> {
  try {
    const docRef = getdocRef(collectionName);
    await setDoc(docRef, data);
    return { id: docRef.id, ...data };
  } catch (error) {
    throw new Error('상점 추가에 실패했습니다.');
  }
}

export async function putShop<T extends { id: string }>(
  collectionName: CollectionReference,
  data: T,
): Promise<T> {
  try {
    await setDoc(getdocRef(collectionName, data.id), omit(data, ['id']));
    return data;
  } catch (error) {
    throw new Error('상점 수정에 실패했습니다.');
  }
}

export async function patchShop<T>(
  collectionName: CollectionReference,
  id: string,
  shop: Partial<T>,
): Promise<DocumentData> {
  try {
    await updateDoc(getdocRef(collectionName, id), shop);

    const patchDoc = await getDoc(getdocRef(collectionName, id));
    return patchDoc.data()!;
  } catch (error) {
    throw new Error('상점 수정에 실패했습니다.');
  }
}

export async function deleteShop(
  collectionName: CollectionReference,
  id: string,
): Promise<void> {
  try {
    await deleteDoc(getdocRef(collectionName, id));
  } catch (error) {
    throw new Error('존재하지 않는 상점입니다.');
  }
}
