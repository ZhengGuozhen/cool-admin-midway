import { getManager } from 'typeorm';

export class DB {
  constructor() {}

  static async query(sql, params) {
    const entityManager = getManager();
    return await entityManager.query(sql, params);
  }
}
