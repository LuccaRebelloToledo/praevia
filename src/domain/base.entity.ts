import { PrimaryKey, Property } from '@mikro-orm/core';

import { getCurrentDate } from '@shared/utils/date.helper';
import { generateId } from '@shared/utils/id.helper';

export abstract class BaseEntity {
  @PrimaryKey({
    length: 21,
  })
  id: string = generateId();

  @Property({
    name: 'created_date_time',
  })
  createdDateTime: Date = getCurrentDate();

  @Property({
    name: 'last_modified_date_time',
    onUpdate: () => getCurrentDate(),
  })
  lastModifiedDateTime: Date = getCurrentDate();

  @Property({ name: 'deleted_date_time', nullable: true })
  deletedDateTime?: Date;
}
