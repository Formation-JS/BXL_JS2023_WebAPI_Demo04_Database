export class MovieDataDTO {

    constructor({ id, title, releaseYear, duration, hasSubtitle, genre }) {
        this.id = id
        this.title = title
        this.releaseYear = releaseYear
        this.duration = duration
        this.hasSubtitle = hasSubtitle
        this.genre = genre
    }
}

export class MovieDetailDTO {

    constructor({ id, title, releaseYear, duration, hasSubtitle, genre, actors }) {
        this.id = id
        this.title = title
        this.releaseYear = releaseYear
        this.duration = duration
        this.hasSubtitle = hasSubtitle
        this.genre = genre
        this.actors = actors
    }
}

export class MovieListDTO {

    constructor({ id, title, genre }) {
        this.id = id
        this.title = title
        this.genre = genre
    }
}