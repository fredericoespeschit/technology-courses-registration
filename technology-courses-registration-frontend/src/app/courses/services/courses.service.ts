import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Course } from "../models/course";
import { first, take, tap } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class CoursesService {
  private readonly API = "api/courses";
  constructor(private httpClient: HttpClient) {}

  list() {
    return this.httpClient.get<Course[]>(this.API).pipe(
      take(1),
      // delay(5000),
      tap((courses) => console.log(courses))
    );
  }

  save(record: Partial<Course>) {
    //   console.log(record)
    return this.httpClient.post<Course>(this.API, record).pipe(first());
    //O que é o parametro first? o que ele faz??
  }
}
