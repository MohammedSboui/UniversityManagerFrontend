import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ConfirmComponent } from '../confirm/confirm.component';
import { Groupe } from '../models/Groupe';
import { GroupesService } from '../services/groupes.service';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css'],
})
export class GroupsComponent implements OnInit {
  displayedColumns: string[] = ['idGroupe', 'niveauGroupe'];
  groupes?: MatTableDataSource<Groupe>;
  isLoading: boolean = true;
  selectedGroupe?: Groupe;
  groupeMenu: any;

  constructor(
    private gpeService: GroupesService,
    private router: Router,
    private snack: MatSnackBar,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadListGroupe();
  }

  loadListGroupe() {
    this.isLoading = true;
    this.gpeService.getListGroupe().subscribe((data) => {
      this.groupes = new MatTableDataSource(data);
      this.isLoading = false;
    });
  }

  navigate(path: string[]) {
    this.router.navigate(path);
  }

  setSelectedGroupe(groupe: Groupe) {
    this.selectedGroupe = groupe;
  }

  handleEdit() {
    this.navigate(['groupe', 'edit', '' + this.selectedGroupe?.idGroupe]);
  }

  deleteGroupe() {
    this.gpeService.deleteGroupe(this.selectedGroupe!).subscribe((data) => {
      this.snack.open(
        `Groupe:  ${this.selectedGroupe?.niveauGroupe} avec le numero: ${this.selectedGroupe?.idGroupe}`,
        undefined,
        { duration: 2000 }
      );
      this.loadListGroupe();
    });
  }

  handleSupprimer() {
    this.dialog.open(ConfirmComponent, {
      data: {
        title: 'Suprresion Groupe : ' + this.selectedGroupe?.idGroupe,
        confirm: () => this.deleteGroupe(),
      },
    });
  }
}
