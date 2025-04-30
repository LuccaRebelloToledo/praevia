import { Migration } from '@mikro-orm/migrations';

export class Migration20250430143815 extends Migration {
  override async up(): Promise<void> {
    this.addSql(
      `create table "audit_logs" ("id" varchar(21) not null, "created_date_time" timestamptz not null, "last_modified_date_time" timestamptz not null, "deleted_date_time" timestamptz null, "performed_by_id" varchar(50) null, "action" varchar(255) not null, "affected_resource_id" varchar(50) null, "resource" varchar(255) not null, "ip_address" varchar(100) not null, "user_agent" varchar(255) not null, "metadata" jsonb null, constraint "audit_logs_pkey" primary key ("id"));`,
    );
  }

  override async down(): Promise<void> {
    this.addSql(`drop table if exists "audit_logs" cascade;`);
  }
}
