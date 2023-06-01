import { Movie } from "@prisma/client";
import { prisma } from "../../../../prisma/client";
import { AppError } from "../../../../errors/appError";
import { CreateMovieDTO } from "../../dtos/createMovieDTO";

export class CreateMovieUseCase {
	async execute({
		title,
		duration,
		release_date,
	}: CreateMovieDTO): Promise<Movie> {
		// Verificar se o filme já existe
		const movieAlreadyExists = await prisma.movie.findUnique({
			where: {
				title,
			},
		});

		if (movieAlreadyExists) {
			throw new AppError("Movie already exists!");
		}

		// Criar o filme
		const movie = await prisma.movie.create({
			data: {
				title,
				duration,
				release_date,
			},
		});

		return movie;
	}
}
