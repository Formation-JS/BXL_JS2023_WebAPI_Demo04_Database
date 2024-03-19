export class MovieDataDTO {

    constructor({ id, title, releaseYear, duration, hasSubtitle, genre, tags }) {
        this.id = id
        this.title = title
        this.releaseYear = releaseYear
        this.duration = duration
        this.hasSubtitle = hasSubtitle
        this.genre = genre
        this.tags = tags
    }
}

export class MovieDetailDTO {

    constructor({ id, title, releaseYear, duration, hasSubtitle, genre, actors, tags }) {
        this.id = id
        this.title = title
        this.releaseYear = releaseYear
        this.duration = duration
        this.hasSubtitle = hasSubtitle
        this.genre = genre
        this.actors = actors
        this.tags = tags
    }
}

export class MovieListDTO {

    constructor({ id, title, genre }) {
        this.id = id
        this.title = title
        this.genre = genre
    }
}