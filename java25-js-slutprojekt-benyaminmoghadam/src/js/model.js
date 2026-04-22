export class Movie {
  constructor(data) {
    this.title = data.title;
    this.release_date = data.release_date;
    this.vote_average = data.vote_average;
    this.poster_path = data.poster_path;
    this.overview = data.overview;
  }
}

export class Person {
  constructor(data) {
    this.name = data.name;
    this.popularity = data.popularity;
    this.known_for_department = data.known_for_department;
    this.profile_path = data.profile_path;
    this.known_for = data.known_for || [];
  }
}