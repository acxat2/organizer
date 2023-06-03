import { Component } from '@angular/core';
import { DateService } from '../shared/date.service';

@Component({
  selector: 'app-selector',
  templateUrl: './selector.component.html',
  styleUrls: ['./selector.component.scss']
})

export class SelectorComponent {

  public goMonth(dir: number) {
    this.dateService.changeMonth(dir);
  }

constructor(protected dateService: DateService) {}

}
