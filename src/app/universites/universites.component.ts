import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ConfirmComponent } from '../confirm/confirm.component';
import { Universite } from '../models/Universite';
import { UniversitesService } from '../services/universites.service';

@Component({
  selector: 'app-universites',
  templateUrl: './universites.component.html',
  styleUrls: ['./universites.component.css'],
})
export class UniversitesComponent implements OnInit {
  displayedColumns: string[] = ['codeUni', 'nomUni', 'adresseSite'];
  universites?: MatTableDataSource<Universite>;
  isLoading: boolean = true;
  selectedUniversite?: Universite;
  universitetMenu: any;

  constructor(
    private univService: UniversitesService,
    private router: Router,
    private snack: MatSnackBar,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadListUniversite();
  }

  loadListUniversite() {
    this.isLoading = true;
    this.univService.getUniversites().subscribe((data) => {
      this.universites = new MatTableDataSource(data);
      this.isLoading = false;
    });
  }

  navigate(path: string[]) {
    this.router.navigate(path);
  }

  setSelectedUniversite(universite: Universite) {
    this.selectedUniversite = universite;
  }

  handleEdit() {
    this.navigate([
      'universite',
      'edit',
      '' + this.selectedUniversite?.codeUni,
    ]);
  }

  deleteUniversite() {
    this.univService
      .deleteUniversite(this.selectedUniversite!)
      .subscribe((data) => {
        this.snack.open(
          `Universite:  ${this.selectedUniversite?.nomUni} avec le numero: ${this.selectedUniversite?.codeUni}`,
          undefined,
          { duration: 2000 }
        );
        this.loadListUniversite();
      });
  }

  handleSupprimer() {
    this.dialog.open(ConfirmComponent, {
      data: {
        title: 'Suprresion Universite : ' + this.selectedUniversite?.codeUni,
        confirm: () => this.deleteUniversite(),
      },
    });
  }
}
