export interface ReleaseDate {
  certification: string;
  iso_639_1: string;
  note: string;
  release_date: Date;
  type: number;
}

export interface Result {
  iso_3166_1: string;
  release_dates: ReleaseDate[];
}

export interface IdadeRoot {
  id: number;
  results: Result[];
}
