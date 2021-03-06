import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class createRefreshTokens1623873104510 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'refresh_tokens',
            columns: [
                {
                    name: 'id',
                    type: 'uuid',
                    isPrimary: true
                },
                {
                    name: 'user_id',
                    type: 'uuid',
                    isNullable: false
                },
                {
                    name: 'refresh_token',
                    type: 'varchar',
                    isUnique: true
                },
                {
                    name: 'expires',
                    type: 'varchar',
                    isNullable: false
                },
                {
                    name: 'revoked',
                    type: 'boolean',
                    default: false
                },
                {
                    name: 'revoked_by_token',
                    type: 'varchar',
                    isNullable: true
                },
                {
                    name: 'revoked_by_ip',
                    type: 'varchar',
                    isNullable: true
                },
                {
                    name: 'created_by_ip',
                    type: 'varchar',
                    isNullable: true
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
            ],
            foreignKeys: [{
                referencedTableName: 'users',
                referencedColumnNames: ['id'],
                columnNames: ['user_id'],
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE'
            }]
        }))        
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('refresh_tokens')
    }

}
