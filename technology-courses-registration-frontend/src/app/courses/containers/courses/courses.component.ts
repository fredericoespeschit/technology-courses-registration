import { Course } from './../../models/course';
import { Component } from "@angular/core";

import { CoursesService } from "../../services/courses.service";
import { Observable, catchError, of } from "rxjs";
import { MatDialog } from "@angular/material/dialog";
import { ErrorDialogComponent } from "src/app/shared/components/error-dialog/error-dialog.component";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-courses",
  templateUrl: "./courses.component.html",
  styleUrls: ["./courses.component.scss"],
})
export class CoursesComponent {
  public courses$: Observable<Course[]>;
 

  constructor(
    private coursesService: CoursesService,
    public dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.courses$ = this.coursesService.list().pipe(
      catchError((error) => {
        // console.log(error)
        this.onError("Erro ao carregar cursos.");
        return of([]);
      })
    );
  }

  onError(errorMsg: string) {
    this.dialog.open(ErrorDialogComponent, {
      data: errorMsg,
    });
  }

  ngOnInit() : void {
    console.log('inicializou')
  }

 onAdd(){
  // console.log('Clicou')
  this.router.navigate(['new'], {relativeTo: this.route});
 }

 onEdit(course: Course) {
  this.router.navigate(['edit', course._id], { relativeTo: this.route });
}
}

