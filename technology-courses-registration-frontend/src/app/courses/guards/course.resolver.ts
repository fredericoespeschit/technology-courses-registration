import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { CoursesService } from '../services/courses.service';
import { Course } from '../models/course';


export const courseResolver: ResolveFn<Course> = (route, state) => {
  constructor( private service: CoursesService) {}
  
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
    if (route.params && route.params['id']) {
      return this.service.loadById(route.params['id']);
    }
    return {_id: '', name: '', category: ''};
  }
};
