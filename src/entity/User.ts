import { 
    Entity,
    PrimaryGeneratedColumn,
    Column,
    Unique,
    CreateDateColumn,
    UpdateDateColumn,
    BeforeInsert,
    BeforeUpdate,
    AfterLoad
} from 'typeorm'
import { 
    validateOrReject, 
    Length, 
    IsNotEmpty, 
    IsEmail,
    IsBoolean
} from 'class-validator';
import bcrypt from 'bcrypt'


@Entity('users')
@Unique(['email', 'username'])
export class User {
    @PrimaryGeneratedColumn('uuid')
    public id: string

    @Column()
    @IsNotEmpty()
    @Length(4, 50)
    public name: string

    @Column()
    @IsNotEmpty()
    @Length(8, 100)
    public password: string

    @Column()
    @IsNotEmpty()
    @IsEmail()
    public email: string

    @Column()
    @IsNotEmpty()
    @Length(8, 20)
    public username: string

    @Column()
    public company: string    

    @Column()  
    public is_active: boolean 

    @CreateDateColumn()
    public created_at: Date
    
    @UpdateDateColumn()
    public updated_at: Date

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
