// eslint-disable-next-line import/no-extraneous-dependencies
import Error from 'next/error';

import { addData, deleteData, getData, getDataById, putData } from '../base';
import { shopsCollection } from '../collections';
import { type Shop } from '../models/shop';

export async function getShops(): Promise<Shop[]> {
  try {
    const res = await getData<Shop>(shopsCollection);
    return res;
  } catch (error) {
    throw new Error('상점 목록 조회에 실패했습니다.');
  }
}

export async function getShopById(id: string): Promise<Shop | undefined> {
  try {
    const res = await getDataById<Shop>(shopsCollection, id);
    return res;
  } catch (error) {
    throw new Error('상점 조회에 실패했습니다.');
  }
}

export async function addShop(data: Omit<Shop, 'id'>): Promise<Shop> {
  try {
    const res = await addData(shopsCollection, data);
    return res;
  } catch (error) {
    throw new Error('상점 추가에 실패했습니다.');
  }
}

export async function putShop(data: Shop): Promise<Shop> {
  try {
    const res = await putData(shopsCollection, data);
    return res;
  } catch (error) {
    throw new Error('상점 수정에 실패했습니다.');
  }
}

export async function patchShop(data: Shop): Promise<Shop> {
  try {
    const res = await putData(shopsCollection, data);
    return res;
  } catch (error) {
    throw new Error('상점 수정에 실패했습니다.');
  }
}

export async function deleteShop(id: string): Promise<void> {
  try {
    await deleteData(shopsCollection, id);
  } catch (error) {
    throw new Error('상점 삭제에 실패했습니다.');
  }
}
