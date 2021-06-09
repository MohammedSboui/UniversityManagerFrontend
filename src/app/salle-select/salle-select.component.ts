import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
import { Salle } from '../models/Salle';
import { SallesService } from '../services/salles.service';

@Component({
  selector: 'app-salle-select',
  templateUrl: './salle-select.component.html',
  styleUrls: ['./salle-select.component.css'],
})
export class SalleSelectComponent implements OnInit {
  @Output() salleChange: EventEmitter<Salle> = new EventEmitter();
  @Input() label: string = '';
  @Input() selectedKey?: number;
  salles: Salle[] = [];
  selected?: any;

  constructor(private salleService: SallesService) {}

  ngOnInit(): void {
    this.salleService.getSalles().subscribe(this.loadSalles, console.error);
  }

  loadSalles = (data: Salle[]) => {
    console.log({ data });
    this.salles = data;
    if (this.selectedKey != undefined)
      this.selected = data.find((el) => el.numSalle == this.selectedKey);
  };

  handleSelectionChange(selected: MatSelectChange) {
    this.selected = selected.value;
    this.salleChange.emit(selected.value);
  }
}
