import fsPromises from 'fs/promises';
import type { NextApiRequest, NextApiResponse } from 'next';
import path from 'path';

import type { ShopDTO } from './dtos';

const jsonPath = path.join(process.cwd(), 'scripts/flattened_array.json');

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'GET') {
    const jsonFile = await fsPromises.readFile(jsonPath, 'utf-8');
    const result = JSON.parse(jsonFile) as ShopDTO[];

    res.status(200).json(result);
  }
}
