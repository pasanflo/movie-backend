import { Body, Controller, Delete, Get, Param, Post } from "@nestjs/common";
import { CreateMovieDto } from "src/movies/dto/create-movie-dto";
import { UpdateMovieDto } from "src/movies/dto/update-movie-dto";
import { MovieService } from "src/movies/services/movie/movie.service";

//Aqui es donde indicamos la URL
@Controller("api/movies/v0/movies")
export class MovieController {
  /***************************************************************
   * @param MovieService
   * @returns
   ************/
  constructor(private movieService: MovieService) { }

  /***************************************************************
   * @param CreateMovieDto
   * @returns create()
   ************/
  @Post("create")
  create(@Body() movie: CreateMovieDto) {
    //se llama a la promesa
    return this.movieService.create(movie).then((r) => {
      return r;
    });
  }

  /***************************************************************
   * @param
   * @returns findAll()
   ************/
  @Get("readAll")
  readAll() {
    return this.movieService.findAll();
  }

  /***************************************************************
   * @param id
   * @returns delete()
   ************/
  @Delete("delete/:id")
  delete(@Param("id") id: string) {
    return this.movieService.delete(id).then((r) => {
      return r;
    });
  }

  /***************************************************************
   * @param UpdateCatDto
   * @returns update()
   ************/
  @Post("update")
  update(@Body() movie: UpdateMovieDto) {
    return this.movieService.update(movie).then((r) => {
      return r;
    });
  }
}
