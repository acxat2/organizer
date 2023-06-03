import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DateService } from '../shared/date.service';
import { Task, TasksService } from '../shared/tasks.service';
import { switchMap } from 'rxjs'

@Component({
  selector: 'app-organizer',
  templateUrl: './organizer.component.html',
  styleUrls: ['./organizer.component.scss']
})
export class OrganizerComponent implements OnInit {

  public form!: FormGroup;
  public tasks: Task[] = [];

  constructor(
    protected dateService: DateService,
    private taskService: TasksService
  ) {}

  ngOnInit(): void {
    this.dateService.date.pipe(
      switchMap(value => this.taskService.load(value))
    ).subscribe(tasks => {
      this.tasks = tasks;
    })

    this.form = new FormGroup({
      title: new FormControl('', Validators.required)
    })
  }

  public remove(task: Task) {
    const flag = confirm( "Удалить задачу?" );

    if (flag) {
      this.taskService.remove(task).subscribe(() => {
        this.tasks = this.tasks.filter(t => t.id !== task.id)
      }, err => console.error(err))
    }
  }

  public change(task: Task, value: any) {
    if (task.title === value) {
      alert('Похоже забыл изменить задачу...')
      return
    }

    task.title = value;
    const flag = confirm('Сохранить изменения?')

    if (flag) {
      this.taskService.change(task).subscribe(() => {
      }, err => console.error(err));
    }
  }

  public submit() {
    const {title} = this.form.value

    const task: Task = {
      title,
      date: this.dateService.date.value.format('DD-MM-YYYY')
    }

    this.taskService.create(task).subscribe(task => {
      this.tasks.push(task)
      this.form.reset()
    }, err => console.error(err))
  }
}
