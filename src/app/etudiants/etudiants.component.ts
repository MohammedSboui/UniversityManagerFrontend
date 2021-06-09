import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ConfirmComponent } from '../confirm/confirm.component';
import { Etudiant } from '../models/Etudiant';
import { EtudiantsService } from '../services/etudiants.service';

@Component({
  selector: 'app-etudiants',
  templateUrl: './etudiants.component.html',
  styleUrls: ['./etudiants.component.css'],
})
export class EtudiantsComponent implements OnInit {
  displayedColumns: string[] = [
    'numEt',
    'nomEt',
    'prenomEt',
    'adrEt',
    'groupe',
  ];
  etudiants?: MatTableDataSource<Etudiant>;
  isLoading: boolean = true;
  selectedEtudiant?: Etudiant;
  etudiantMenu: any;

  constructor(
    private etudiantService: EtudiantsService,
    private router: Router,
    private snack: MatSnackBar,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadListEtudiant();
  }

  loadListEtudiant() {
    this.isLoading = true;
    this.etudiantService.getEtudiants().subscribe((data) => {
      this.etudiants = new MatTableDataSource(data);
      this.isLoading = false;
    });
  }

  navigate(path: string[]) {
    this.router.navigate(path);
  }

  setSelectedEtudiant(etudiant: Etudiant) {
    this.selectedEtudiant = etudiant;
  }

  handleEdit() {
    this.navigate(['etudiant', 'edit', '' + this.selectedEtudiant?.numEt]);
  }

  deleteEtudiant() {
    this.etudiantService
      .deleteEtudiant(this.selectedEtudiant!)
      .subscribe((data) => {
        this.snack.open(
          `Etudiant:  ${this.selectedEtudiant?.nomEt} ${this.selectedEtudiant?.prenomEt} avec le numero: ${this.selectedEtudiant?.numEt}`,
          undefined,
          { duration: 2000 }
        );
        this.loadListEtudiant();
      });
  }

  handleSupprimer() {
    this.dialog.open(ConfirmComponent, {
      data: {
        title: 'Suprresion etudiant : ' + this.selectedEtudiant?.numEt,
        confirm: () => this.deleteEtudiant(),
      },
    });
  }
}
