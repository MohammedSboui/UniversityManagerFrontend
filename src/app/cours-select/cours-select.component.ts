import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
import { Cours } from '../models/Cours';
import { CoursService } from '../services/cours.service';

@Component({
  selector: 'app-cours-select',
  templateUrl: './cours-select.component.html',
  styleUrls: ['./cours-select.component.css'],
})
export class CoursSelectComponent implements OnInit {
  @Output() coursChange: EventEmitter<Cours> = new EventEmitter();
  @Input() label: string = '';
  @Input() selectedKey?: number;
  cours: Cours[] = [];
  selected?: any;

  constructor(private coursService: CoursService) {}

  ngOnInit(): void {
    this.coursService.getCours().subscribe(this.loadCours, console.error);
  }

  loadCours = (data: Cours[]) => {
    console.log({ data });
    this.cours = data;
    if (this.selectedKey != undefined)
      this.selected = data.find((el) => el.codeCours == this.selectedKey);
  };

  handleSelectionChange(selected: MatSelectChange) {
    this.selected = selected.value;
    this.coursChange.emit(selected.value);
  }
}
