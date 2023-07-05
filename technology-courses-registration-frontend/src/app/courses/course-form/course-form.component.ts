import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CoursesService } from '../services/courses.service';
import { Router } from "@angular/router";
import { MatSnackBar } from '@angular/material/snack-bar';
import { tap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss']
})
export class CourseFormComponent {
  form: FormGroup;
  constructor(private formBuilder: FormBuilder,
    private service: CoursesService,
    private snackBar: MatSnackBar,
    private router: Router
    ) {
    this.form = this.formBuilder.group({
      name: [null],
      category: [null]
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    this.service.save(this.form.value)
    .pipe(
      tap(result => this.onSuccess()),
      catchError(error => {
        this.snackBar.open('Erro ao salvar curso');
        return of(null); // Retorna um Observable vazio
      })
    )
    .subscribe();

  }

  private onSuccess(){
    this.snackBar.open('Curso salvo com sucesso', '', {duration: 5000});
  }

  onCancel(){
    this.router.navigate(['/courses']);
  }

}
