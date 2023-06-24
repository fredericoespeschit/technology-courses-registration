import { Component } from '@angular/core';

import { Course } from '../models/course';
import { CoursesService } from './../services/courses.service';

@Component({
  selector: "app-courses",
  templateUrl: "./courses.component.html",
  styleUrls: ["./courses.component.scss"],
})
export class CoursesComponent {
  public courses: Course[] = [];
  displayedColumns = ["name", "category"];
  constructor(private coursesService: CoursesService) {}

  ngOnInit() {
    this.courses = this.coursesService.list();
  }
}
