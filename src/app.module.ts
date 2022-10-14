import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { CommentsModule } from './comments/comments.module';
import { LikesModule } from './likes/likes.module';
import { PostsModule } from './posts/posts.module';
import { FriendsModule } from './friends/friends.module';
import { PostgreDataSource } from './orm/ormconfig';

@Module({
  imports: [
    TypeOrmModule.forRoot(PostgreDataSource as TypeOrmModuleOptions),
    UsersModule,
    CommentsModule,
    LikesModule,
    PostsModule,
    FriendsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
