import { 
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne
} from 'typeorm'
import { User } from './User'


@Entity('tokens')
export class Token {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    user_id: string

    @Column()
    refresh_token: string

    @Column()
    expires: Date

    @Column()
    revoked: boolean

    @Column()
    revoked_by_ip: string

    @Column()
    created_by_ip: string

    @CreateDateColumn()
    created_at: Date
    
    @UpdateDateColumn()
    updated_at: Date

    @ManyToOne(
        () => User,
        user => user.tokens
    )
    user: User


    isExpired(): boolean {
        return new Date(Date.now()) >= this.expires
    }

    isActive(): boolean {
        return !this.revoked && !this.isExpired
    }
}
