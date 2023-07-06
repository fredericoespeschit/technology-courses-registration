import { Component } from "@angular/core";
import { NonNullableFormBuilder } from "@angular/forms";
import { Location } from "@angular/common";

import { CoursesService } from "../../services/courses.service";
import { Router } from "@angular/router";
import { MatSnackBar } from "@angular/material/snack-bar";
import { tap, catchError } from "rxjs/operators";
import { of } from "rxjs";

@Component({
  selector: "app-course-form",
  templateUrl: "./course-form.component.html",
  styleUrls: ["./course-form.component.scss"],
})
export class CourseFormComponent {
  form = this.formBuilder.group({
    name: [""],
    category: [""],
  });
  constructor(
    private formBuilder: NonNullableFormBuilder,
    private service: CoursesService,
    private snackBar: MatSnackBar,
    private router: Router,
    private location: Location
  ) {}

  ngOnInit(): void {}

  onSubmit() {
    this.service
      .save(this.form.value)
      .pipe(
        tap((result) => this.onSuccess()),
        catchError((error) => {
          this.snackBar.open("Erro ao salvar curso");
          return of(null); // Retorna um Observable vazio
        })
      )
      .subscribe();
  }

  private onSuccess() {
    this.snackBar.open("Curso salvo com sucesso", "", { duration: 5000 });
    this.location.back();
  }

  onCancel() {
    this.router.navigate(["/courses"]);
  }
}
