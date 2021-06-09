import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ConfirmComponent } from '../confirm/confirm.component';
import { Departement } from '../models/Departement';
import { DepartementsService } from '../services/departements.service';

@Component({
  selector: 'app-departements',
  templateUrl: './departements.component.html',
  styleUrls: ['./departements.component.css'],
})
export class DepartementsComponent implements OnInit {
  displayedColumns: string[] = ['codeDep', 'libelleDep', 'universite'];
  departements?: MatTableDataSource<Departement>;
  isLoading: boolean = true;
  selectedDepartement?: Departement;
  departementMenu: any;

  constructor(
    private departService: DepartementsService,
    private router: Router,
    private snack: MatSnackBar,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadListDepartement();
  }

  loadListDepartement() {
    this.isLoading = true;
    this.departService.getDepartements().subscribe((data) => {
      this.departements = new MatTableDataSource(data);
      this.isLoading = false;
    });
  }

  navigate(path: string[]) {
    this.router.navigate(path);
  }

  setSelectedDepartement(departement: Departement) {
    this.selectedDepartement = departement;
  }

  handleEdit() {
    this.navigate([
      'departement',
      'edit',
      '' + this.selectedDepartement?.codeDep,
    ]);
  }

  deleteDepartement() {
    this.departService
      .deleteDepartement(this.selectedDepartement!)
      .subscribe((data) => {
        this.snack.open(
          `Departement:  ${this.selectedDepartement?.libelleDep} avec le numero: ${this.selectedDepartement?.codeDep}`,
          undefined,
          { duration: 2000 }
        );
        this.loadListDepartement();
      });
  }

  handleSupprimer() {
    this.dialog.open(ConfirmComponent, {
      data: {
        title: 'Suprresion Departement : ' + this.selectedDepartement?.codeDep,
        confirm: () => this.deleteDepartement(),
      },
    });
  }
}
