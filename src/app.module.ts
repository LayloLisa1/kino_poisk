import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersModule } from './user/user.module';
import { MovieModule } from './movies/movies.module';
import { GenreModule } from './genres/genres.module';
import { DirectorModule } from './directors/directors.module';
import { ActorsModule } from './actors/actors.module';
import { CountryModule } from './countries/countries.module';
import { LanguageModule } from './language/language.module';
import { ReviewsModule } from './rivews/rivews.module';
import { RatingModule } from './ratings/ratings.module';
import { FavouriteModule } from './favourites/favourites.module';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { User } from './user/model/user.model';
import { Movie } from './movies/model/movie.model';
import { Favourite } from './favourites/model/favourite.model';
import { Rating } from './ratings/model/rating.model';
import { Genre } from './genres/model/genre.model';
import { Comment } from './comments/model/comment.model';
import { Review } from './rivews/model/rivews.model';
import { Director } from './directors/model/director.model';
import { Actor } from './actors/model/actor.model';
import { Country } from './countries/model/country.model';
import { Language } from './language/model/language.model';
import { Admin } from './admin/models/admin.model';
import { AdminModule } from './admin/admin.module';
import { CommentsModule } from './comments/comments.module';
import { AdminGuard } from './common/guards/admin.guard';
import { CreatorGuard } from './common/guards/creator.guard';
import { RolesGuard } from './common/guards/roles.guard';
import { Role } from './roles/model/role.model';
import { RolesService } from './roles/roles.service';
import { RolesController } from './roles/roles.controller';
import { AuthModule } from './auth/auth.module';
// import { MailerModule } from '@nestjs-modules/mailer';
// import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
// import { join } from 'path';

@Module({
  imports: [    
    JwtModule.register({
      secret: "laylo8002",
      signOptions: {
        expiresIn: '1h',
      },
    }),
    ConfigModule.forRoot({
      envFilePath: '.env',isGlobal: true,
      

    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: 'localhost',
      port: 5432,
      username: process.env.POSTGRES_USER,
      password: String(process.env.POSTGRES_PASSWORD),
      database: process.env.POSTGRES_DB,
      models: [
        User,
        Admin,         
        Movie,
        Favourite,
        Rating,
        Comment,
        Review,
        Genre,
        Director,
        Actor,
        Country,
        Language,
        Admin,
        
        
      ],
      autoLoadModels: true,
    }),
    UsersModule,
    MovieModule,
    GenreModule,
    DirectorModule,
    ActorsModule,
    CountryModule,
    LanguageModule,
    ReviewsModule,
    CommentsModule,
    RatingModule,
    FavouriteModule,
    AdminModule, 
    AuthModule
  ],
  providers: [ 
  ],
})
export class AppModule {}
