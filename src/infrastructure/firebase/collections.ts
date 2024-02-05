import { collection } from 'firebase/firestore';

import { db } from './firestore';
import { shopConverter } from './models/shop';

export const shopsCollection = collection(db, 'shops').withConverter(
  shopConverter,
);
