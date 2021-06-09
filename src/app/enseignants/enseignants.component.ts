import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ConfirmComponent } from '../confirm/confirm.component';
import { Enseignant } from '../models/Enseignant';
import { EnseignantService } from '../services/enseignant.service';

@Component({
  selector: 'app-enseignants',
  templateUrl: './enseignants.component.html',
  styleUrls: ['./enseignants.component.css'],
})
export class EnseignantsComponent implements OnInit {
  displayedColumns: string[] = [
    'matricule',
    'nomEns',
    'prenomEns',
    'adrEns',
    'diplomeEns',
  ];
  enseignants?: MatTableDataSource<Enseignant>;
  isLoading: boolean = true;
  selectedEnseignant?: Enseignant;
  enseignantMenu: any;

  constructor(
    private enseignantService: EnseignantService,
    private router: Router,
    private snack: MatSnackBar,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadListEnseignant();
  }

  loadListEnseignant() {
    this.isLoading = true;
    this.enseignantService.getEnseignants().subscribe((data) => {
      this.enseignants = new MatTableDataSource(data);
      this.isLoading = false;
    });
  }

  navigate(path: string[]) {
    this.router.navigate(path);
  }

  setSelectedEnseignant(enseignant: Enseignant) {
    this.selectedEnseignant = enseignant;
  }

  handleEdit() {
    this.navigate([
      'enseignant',
      'edit',
      '' + this.selectedEnseignant?.matricule,
    ]);
  }

  deleteEnseignant() {
    this.enseignantService
      .deleteEnseignant(this.selectedEnseignant!)
      .subscribe((data) => {
        this.snack.open(
          `Enseignant:  ${this.selectedEnseignant?.nomEns} ${this.selectedEnseignant?.prenomEns} avec le numero: ${this.selectedEnseignant?.matricule}`,
          undefined,
          { duration: 2000 }
        );
        this.loadListEnseignant();
      });
  }

  handleSupprimer() {
    this.dialog.open(ConfirmComponent, {
      data: {
        title: 'Suprresion enseignant : ' + this.selectedEnseignant?.matricule,
        confirm: () => this.deleteEnseignant(),
      },
    });
  }
}
