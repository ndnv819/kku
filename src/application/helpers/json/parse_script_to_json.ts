import fsPromises from 'fs/promises';
import path from 'path';
import type { ShopDTO } from 'src/pages/api/shop/dtos';

export const parseScriptToJson = async (): Promise<ShopDTO[]> => {
  const jsonPath = path.join(process.cwd(), 'scripts/flattened_array.json');
  const jsonFile = await fsPromises.readFile(jsonPath, 'utf-8');
  const result = JSON.parse(jsonFile) as ShopDTO[];

  return result;
};
