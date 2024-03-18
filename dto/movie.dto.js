

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