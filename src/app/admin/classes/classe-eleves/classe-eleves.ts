import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { InscriptionService } from '../../../services/inscription.service';
import { InscriptionResponseDto } from '../../../dto/inscription-response.dto';
import { Observable, switchMap } from 'rxjs';

import * as ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-classe-eleves',
  imports: [CommonModule, RouterLink],
  templateUrl: './classe-eleves.html',
  styleUrl: './classe-eleves.css',
})
export class ClasseEleves implements OnInit {

  classeId!: number;

  eleves$!: Observable<InscriptionResponseDto[]>;


  constructor(
    private route: ActivatedRoute,
    private inscriptionService: InscriptionService
  ) { }

  ngOnInit(): void {
    this.classeId = Number(
      this.route.snapshot.paramMap.get('id')
    );

    console.log('Classe ID =', this.classeId);

    this.eleves$ = this.inscriptionService.findByClasse(
      this.classeId
    );

  }

// =========================================================
  // EXPORT EXCEL
  // =========================================================

  async exporterExcel(): Promise<void> {

    this.inscriptionService.findByClasse(this.classeId)
      .subscribe({

        next: async (eleves) => {

          if (!eleves || eleves.length === 0) {

            alert('لا يوجد أي تلميذ لتصديره');

            return;
          }

          const workbook = new ExcelJS.Workbook();

          const worksheet = workbook.addWorksheet('التلاميذ', {
            views: [
              {
                rightToLeft: true
              }
            ]
          });

          // =================================================
          // TITRE
          // =================================================

          worksheet.mergeCells('A1:G1');

          const titleCell = worksheet.getCell('A1');

          titleCell.value = 'قائمة تلاميذ القسم';

          titleCell.font = {
            bold: true,
            size: 16
          };

          titleCell.alignment = {
            horizontal: 'center',
            vertical: 'middle'
          };

          worksheet.getRow(1).height = 30;


          // =================================================
          // INFORMATIONS
          // =================================================

          worksheet.mergeCells('A2:G2');

          const infoCell = worksheet.getCell('A2');

          infoCell.value =
            `رقم القسم : ${this.classeId} | عدد التلاميذ : ${eleves.length}`;

          infoCell.alignment = {
            horizontal: 'center'
          };


          // =================================================
          // EN-TÊTE
          // =================================================

          worksheet.addRow([]);

          const headerRow = worksheet.addRow([
            'المرجع',
            'اللقب',
            'الاسم',
            'تاريخ الميلاد',
            'اسم الولي',
            'رقم الهاتف',
            'الحالة'
          ]);

          headerRow.font = {
            bold: true
          };

          headerRow.alignment = {
            horizontal: 'center',
            vertical: 'middle'
          };


          // =================================================
          // DONNÉES
          // =================================================

          eleves.forEach((eleve, index) => {

            let statut = '';

            switch (eleve.statut) {

              case 'VALIDEE':
                statut = 'مقبول';
                break;

              case 'LISTE_ATTENTE':
                statut = 'في قائمة الانتظار';
                break;

              case 'REFUSEE':
                statut = 'مرفوض';
                break;

              case 'ANNULEE':
                statut = 'ملغى';
                break;

              case 'EN_ATTENTE':
                statut = 'في انتظار المعالجة';
                break;

              default:
                statut = eleve.statut ?? '';
            }

            const row = worksheet.addRow([
              eleve.reference ?? '',
              eleve.nom ?? '',
              eleve.prenom ?? '',
              eleve.dateNaissance ?? '',
              eleve.nomTuteur ?? '',
              eleve.telephone ?? '',
              statut
            ]);

            row.alignment = {
              horizontal: 'center',
              vertical: 'middle'
            };

          });


          // =================================================
          // LARGEUR DES COLONNES
          // =================================================

          worksheet.columns = [
            { width: 18 },
            { width: 20 },
            { width: 20 },
            { width: 18 },
            { width: 25 },
            { width: 18 },
            { width: 22 }
          ];


          // =================================================
          // BORDURES
          // =================================================

          worksheet.eachRow((row) => {

            row.eachCell((cell) => {

              cell.border = {
                top: {
                  style: 'thin'
                },
                left: {
                  style: 'thin'
                },
                bottom: {
                  style: 'thin'
                },
                right: {
                  style: 'thin'
                }
              };

            });

          });


          // =================================================
          // GENERATION FICHIER
          // =================================================

          const buffer = await workbook.xlsx.writeBuffer();

          const blob = new Blob(
            [buffer],
            {
              type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
            }
          );

          saveAs(
            blob,
            `Liste-eleves-classe-${this.classeId}.xlsx`
          );

        },

        error: (err) => {

          console.error(
            'Erreur lors de l export Excel :',
            err
          );

          alert(
            'حدث خطأ أثناء تصدير قائمة التلاميذ'
          );

        }

      });
  }
}

  

