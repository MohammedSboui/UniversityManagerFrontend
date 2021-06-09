import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
import { Enseignant } from '../models/Enseignant';
import { EnseignantService } from '../services/enseignant.service';

@Component({
  selector: 'app-enseignant-select',
  templateUrl: './ensignant-select.component.html',
  styleUrls: ['./ensignant-select.component.css'],
})
export class EnsignantSelectComponent implements OnInit {
  @Output() enseignantChange: EventEmitter<Enseignant> = new EventEmitter();
  @Input() label: string = '';
  @Input() selectedKey?: number;
  enseignants: Enseignant[] = [];
  selected?: any;

  constructor(private ensService: EnseignantService) {}

  ngOnInit(): void {
    this.ensService
      .getEnseignants()
      .subscribe(this.loadEnseignants, console.error);
  }

  loadEnseignants = (data: Enseignant[]) => {
    console.log({ data });
    this.enseignants = data;
    if (this.selectedKey != undefined)
      this.selected = data.find((el) => el.matricule == this.selectedKey);
  };

  handleSelectionChange(selected: MatSelectChange) {
    this.selected = selected.value;
    this.enseignantChange.emit(selected.value);
  }
}
