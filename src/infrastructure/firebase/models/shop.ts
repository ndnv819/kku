import type { FirestoreDataConverter, Timestamp } from 'firebase/firestore';

export interface Shop {
  id: string;
  text: string;
  name: string;
  email: string;
  image: string;
  username: string;
  createdAt: Timestamp;
  createdBy: string;
}

export const shopConverter: FirestoreDataConverter<Shop> = {
  toFirestore(guestbook) {
    return guestbook;
  },
  fromFirestore(snapshot, options) {
    const { id } = snapshot;
    const data = snapshot.data(options);

    return { id, ...data } as Shop;
  },
};
