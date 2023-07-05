package com.fredericoespeschit.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.fredericoespeschit.model.Course;
import com.fredericoespeschit.repository.CourseRepository;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/api/courses")
@AllArgsConstructor
public class CourseController {

  private final CourseRepository courseRepository;

  @GetMapping // @RequestMapping(method = RequestMethod.GET)
  public List<Course> list() {
    return courseRepository.findAll();
  }

  @PostMapping
  @ResponseStatus(code = HttpStatus.CREATED)
  public Course create(@RequestBody Course course){
    return courseRepository.save(course);
  }
}
