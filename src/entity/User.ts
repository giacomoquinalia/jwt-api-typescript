import { 
    Entity,
    PrimaryGeneratedColumn,
    Column,
    Unique,
    CreateDateColumn,
    UpdateDateColumn,
    BeforeInsert,
    BeforeUpdate,
    AfterLoad,
    OneToMany
} from 'typeorm'
import {
    validateOrReject,
    Length,
    IsNotEmpty,
    IsEmail
} from 'class-validator';
import bcrypt from 'bcrypt'
import { RefreshToken } from './RefreshToken';


@Entity('users')
@Unique(['email', 'username'])
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    @IsNotEmpty()
    @Length(4, 50)
    name: string

    @Column()
    @IsNotEmpty()
    @Length(8, 100)
    password: string

    @Column()
    @IsNotEmpty()
    @IsEmail()
    email: string

    @Column()
    @IsNotEmpty()
    @Length(8, 20)
    username: string

    @Column()
    @IsNotEmpty()
    company: string    

    @Column()
    is_active: boolean 

    @CreateDateColumn()
    created_at: Date
    
    @UpdateDateColumn()
    updated_at: Date

    @OneToMany(
        () => RefreshToken,
        refreshToken => refreshToken.user
    )
    refresh_tokens: RefreshToken[]


    private oldPassword: string

    @BeforeInsert()
    @BeforeUpdate()
    async validate() {
      await validateOrReject(this)
    }

    @AfterLoad()
    private loadOldPassword(): void {
        this.oldPassword = this.password
    }

    @BeforeInsert()
    @BeforeUpdate()
    private hashPassword(): void {
        if (this.oldPassword !== this.password) {
            const salt = 10
            this.password = bcrypt.hashSync(this.password, salt)
        }
    }    

}
