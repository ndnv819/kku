import type { CollectionReference, DocumentData } from 'firebase/firestore';
import {
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  updateDoc,
} from 'firebase/firestore';
import { omit } from 'lodash';

export async function getData<T>(
  collectionName: CollectionReference,
): Promise<T[]> {
  const snapshot = await getDocs(query(collectionName));

  return snapshot.docs.map((document) => document.data() as T);
}

export async function getDataById<T>(
  collectionName: CollectionReference,
  id: string,
): Promise<T | undefined> {
  const docSnap = await getDoc(doc(collectionName, id));

  return docSnap.data() as T;
}

export async function addData<T>(
  collectionName: CollectionReference,
  data: Omit<T, 'id'>,
): Promise<{ id: string } & Omit<T, 'id'>> {
  const docRef = doc(collectionName);
  await setDoc(docRef, data);
  return { id: docRef.id, ...data };
}

export async function putData<T extends { id: string }>(
  collectionName: CollectionReference,
  data: T,
): Promise<T> {
  await setDoc(doc(collectionName, data.id), omit(data, ['id']));
  return data;
}

export async function patchData<T>(
  collectionName: CollectionReference,
  id: string,
  data: Partial<T>,
): Promise<DocumentData> {
  await updateDoc(doc(collectionName, id), data);

  const patchDoc = await getDoc(doc(collectionName, id));
  return patchDoc.data()!;
}

export async function deleteData(
  collectionName: CollectionReference,
  id: string,
): Promise<void> {
  await deleteDoc(doc(collectionName, id));
}
