import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
import { Groupe } from '../models/Groupe';
import { GroupesService } from '../services/groupes.service';

@Component({
  selector: 'app-groupes-select',
  templateUrl: './groupes-select.component.html',
  styleUrls: ['./groupes-select.component.css'],
})
export class GroupesSelectComponent implements OnInit {
  @Output() groupeChange: EventEmitter<Groupe> = new EventEmitter();
  @Input() label: string = '';
  @Input() selectedKey?: number;
  groupes: Groupe[] = [];
  selected?: any;

  constructor(private groupeService: GroupesService) {}

  ngOnInit(): void {
    this.groupeService
      .getListGroupe()
      .subscribe(this.loadGroupes, console.error);
  }

  loadGroupes = (data: Groupe[]) => {
    console.log({ data });
    this.groupes = data;
    if (this.selectedKey != undefined)
      this.selected = data.find((el) => el.idGroupe == this.selectedKey);
  };

  handleSelectionChange(selected: MatSelectChange) {
    this.selected = selected.value;
    this.groupeChange.emit(selected.value);
  }
}
