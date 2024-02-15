import { collection } from 'firebase/firestore';

import { db } from './firestore';
import { shopConverter } from './models/shop';

// NOTE:: firestore에서 shops 데이터를 가져올 떄, 자동으로 Shop 타입으로 변환됨
export const shopsCollection = collection(db, 'shops').withConverter(
  shopConverter,
);
