import { Field, ObjectType } from "type-graphql";
import { BaseEntity, Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { RecipeAuthors } from "./joinTables/RecipeAuthor";
import { UserSavedRecipes } from "./joinTables/UserSavedRecipe";


@ObjectType()
@Entity()
export class User extends BaseEntity {

    @Field()
    @PrimaryGeneratedColumn()
    id!: number;

    @Field(() => String)
    @Column({ unique: true })
    user_name!: string;

    @Field(() => String)
    @Column({ unique: true })
    email!: string;

    @Column()
    password!: string;

    @Field()
    @Column()
    theme!: string;

    @Field()
    @CreateDateColumn()
    created_at: Date;

    @Field()
    @UpdateDateColumn()
    updated_at: Date;

    @OneToMany(() => UserSavedRecipes, ur => ur.user)
    recipeConnection: Promise<UserSavedRecipes[]>;

    @OneToMany(() => RecipeAuthors, ra => ra.user)
    ownRecipeConnection: Promise<RecipeAuthors[]>
}
