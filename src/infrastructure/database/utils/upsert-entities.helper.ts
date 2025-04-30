import { EntityManager } from '@mikro-orm/core';

export const upsertEntities = async <T>(
  em: EntityManager,
  entityClass: { new (): T },
  data: Partial<T>[],
  uniqueFields: Array<keyof T>,
  additionalFields: Partial<T> = {},
): Promise<void> => {
  const existingEntities = await em.find(entityClass, {
    $or: data.map((item) =>
      Object.fromEntries(uniqueFields.map((field) => [field, item[field]])),
    ),
  });

  const existingKeys = new Set(
    existingEntities.map((entity) =>
      uniqueFields.map((field) => entity[field]).join('|'),
    ),
  );

  const newEntities = data.filter(
    (item) =>
      !existingKeys.has(uniqueFields.map((field) => item[field]).join('|')),
  );

  if (newEntities.length) {
    const entitiesToPersist = newEntities.map((item) =>
      em.create(entityClass, {
        ...item,
        ...additionalFields,
      }),
    );

    await em.persistAndFlush(entitiesToPersist);
  }
};
