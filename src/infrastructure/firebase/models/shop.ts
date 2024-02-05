import type { FirestoreDataConverter } from 'firebase/firestore';

export interface Shop {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
}

export const shopConverter: FirestoreDataConverter<Shop> = {
  toFirestore(model) {
    return model;
  },
  fromFirestore(snapshot, options) {
    const { id } = snapshot;
    const data = snapshot.data(options);

    return { id, ...data } as Shop;
  },
};
