import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class createUsers1623080592943 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        // await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')

        await queryRunner.createTable(new Table({
            name: 'users',
            columns: [
                {
                    name: 'id',
                    type: 'uuid',
                    isPrimary: true,
                    // generationStrategy: 'uuid',
                    // default: 'uuid_generate_v4()',
                },
                {
                    name: 'name',
                    type: 'varchar'
                },
                {
                    name: 'email',
                    type: 'varchar',
                    isUnique: true,
                    isNullable: false
                },
                {
                    name: 'username',
                    type: 'varchar',
                    isUnique: true,
                    isNullable: false
                },
                {
                    name: 'password',
                    type: 'varchar'
                },
                {
                    name: 'company',
                    type: 'varchar'
                },
                {
                    name: 'is_active',
                    type: 'boolean',
                    default: true
                },
                {
                    name: 'created_at',
                    type: 'timestamptz',
                    default: 'now()'
                },
                {
                    name: 'updated_at',
                    type: 'timestamptz',
                    default: 'now()'
                }                
            ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('users')
        // await queryRunner.query('DROP EXTENSION "uuid-ossp"')
    }

}
