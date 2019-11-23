import {
  Resolver,
  Mutation,
  Arg,
  Int,
  Query,
  InputType,
  Field
} from "type-graphql";
import { Movie } from "../entity/Movie";
import { MinLength, MaxLength, Min } from "class-validator";
import { validateOrRejectExample } from "../utils/utils";

@InputType()
class MovieCreateInput {
  @MinLength(5, {
    message: "$property is too short expected greater than $constraint1"
  })
  @MaxLength(50, {
    message: "$property is too long expected less than $constraint1"
  })
  @Field()
  title: string;

  @Min(3, {
    message: "Expected $property to be greater than $constraint1"
  })
  @Field(() => Int)
  minutes: number;
}

@InputType()
class MovieUpdateInput {
  @MinLength(5, {
    message: "$property is too short expected greater than $constraint1"
  })
  @MaxLength(50, {
    message: "$property is too long expected less than $constraint1"
  })
  @Field({ nullable: true })
  title?: string;

  @Min(3, {
    message: "Expected $property to be greater than $constraint1"
  })
  @Field(() => Int, { nullable: true })
  minutes?: number;
}

@Resolver()
export class MovieResolver {
  @Mutation(() => Boolean)
  async createMovie(
    @Arg("options", () => MovieCreateInput) options: MovieCreateInput
  ) {
    await validateOrRejectExample(options);
    try {
      await Movie.insert(options);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  @Query(() => [Movie])
  movies() {
    return Movie.find();
  }

  @Mutation(() => Boolean)
  async updateMovie(
    @Arg("id") id: number,
    @Arg("input", () => MovieUpdateInput) options: MovieUpdateInput
  ) {
    await validateOrRejectExample(options, {
      skipMissingProperties: true
    });

    try {
      await Movie.update({ id }, options);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  @Mutation(() => Boolean)
  async deleteMovie(@Arg("id") id: number) {
    try {
      await Movie.delete(id);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}
