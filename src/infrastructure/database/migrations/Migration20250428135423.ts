import { Migration } from '@mikro-orm/migrations';

export class Migration20250428135423 extends Migration {
  override async up(): Promise<void> {
    this.addSql(
      `create table "permissions" ("id" varchar(21) not null, "created_date_time" timestamptz not null, "last_modified_date_time" timestamptz not null, "deleted_date_time" timestamptz null, "key" varchar(50) not null, "display_name" varchar(255) not null, constraint "permissions_pkey" primary key ("id"));`,
    );
    this.addSql(
      `alter table "permissions" add constraint "permissions_key_unique" unique ("key");`,
    );

    this.addSql(
      `create table "roles" ("id" varchar(21) not null, "created_date_time" timestamptz not null, "last_modified_date_time" timestamptz not null, "deleted_date_time" timestamptz null, "key" varchar(50) not null, "display_name" varchar(255) not null, constraint "roles_pkey" primary key ("id"));`,
    );
    this.addSql(
      `alter table "roles" add constraint "roles_key_unique" unique ("key");`,
    );

    this.addSql(
      `create table "role_permissions" ("role_id" varchar(21) null, "permission_id" varchar(21) null, constraint "role_permissions_pkey" primary key ("role_id", "permission_id"));`,
    );

    this.addSql(
      `create table "users" ("id" varchar(21) not null, "created_date_time" timestamptz not null, "last_modified_date_time" timestamptz not null, "deleted_date_time" timestamptz null, "is_active" boolean not null default true, "first_name" varchar(50) not null, "last_name" varchar(50) not null, "email" varchar(100) not null, "is_email_verified" boolean not null default false, "password" varchar(255) not null, "locale" varchar(5) not null, "time_zone" varchar(30) not null, "role_id" varchar(21) null, "last_login_date_time" timestamptz null, constraint "users_pkey" primary key ("id"));`,
    );
    this.addSql(
      `alter table "users" add constraint "users_email_unique" unique ("email");`,
    );

    this.addSql(
      `create table "tokens" ("id" varchar(21) not null, "created_date_time" timestamptz not null, "last_modified_date_time" timestamptz not null, "deleted_date_time" timestamptz null, "token" varchar(255) not null, "ip_address" varchar(100) not null, "user_agent" varchar(255) not null, "revoked_date_time" timestamptz null, "user_id" varchar(21) null, constraint "tokens_pkey" primary key ("id"));`,
    );
    this.addSql(`create index "tokens_token_index" on "tokens" ("token");`);

    this.addSql(
      `alter table "role_permissions" add constraint "role_permissions_role_id_foreign" foreign key ("role_id") references "roles" ("id") on update cascade on delete cascade;`,
    );
    this.addSql(
      `alter table "role_permissions" add constraint "role_permissions_permission_id_foreign" foreign key ("permission_id") references "permissions" ("id") on update cascade on delete cascade;`,
    );

    this.addSql(
      `alter table "users" add constraint "users_role_id_foreign" foreign key ("role_id") references "roles" ("id") on update cascade on delete set null;`,
    );

    this.addSql(
      `alter table "tokens" add constraint "tokens_user_id_foreign" foreign key ("user_id") references "users" ("id") on update cascade on delete set null;`,
    );
  }

  override async down(): Promise<void> {
    this.addSql(
      `alter table "role_permissions" drop constraint "role_permissions_permission_id_foreign";`,
    );

    this.addSql(
      `alter table "role_permissions" drop constraint "role_permissions_role_id_foreign";`,
    );

    this.addSql(`alter table "users" drop constraint "users_role_id_foreign";`);

    this.addSql(
      `alter table "tokens" drop constraint "tokens_user_id_foreign";`,
    );

    this.addSql(`drop table if exists "permissions" cascade;`);

    this.addSql(`drop table if exists "roles" cascade;`);

    this.addSql(`drop table if exists "role_permissions" cascade;`);

    this.addSql(`drop table if exists "users" cascade;`);

    this.addSql(`drop table if exists "tokens" cascade;`);
  }
}
