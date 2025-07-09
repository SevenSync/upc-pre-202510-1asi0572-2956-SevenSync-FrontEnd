import { Component, Inject } from "@angular/core"
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from "@angular/material/dialog"
import { MatButtonModule } from "@angular/material/button"
import { MatIconModule } from "@angular/material/icon"
import { CommonModule } from "@angular/common"

interface DialogData {
  currentPotCount: number
  maxPots: number
  userPlan: string
}

@Component({
  selector: "app-pot-limit-dialog",
  imports: [MatDialogModule, MatButtonModule, MatIconModule, CommonModule],
  template: `
    <div class="dialog-container">
      <div class="dialog-header">
        <h2 class="dialog-title">Límite de macetas alcanzado</h2>
      </div>

      <div class="dialog-content">
        <p class="dialog-description">
          Has alcanzado el número máximo de {{ data.maxPots }} macetas
          permitido en tu cuenta gratuita de Macetech. Para
          asociar más macetas y disfrutar de espacio ampliado,
          actualiza a nuestro plan Premium, el cual también
          ofrece otros beneficios exclusivos, como:
        </p>

        <ul class="benefits-list">
          <li class="benefit-item">
            <mat-icon class="benefit-icon">check</mat-icon>
            <span>Macetas inteligentes ilimitadas</span>
          </li>
          <li class="benefit-item">
            <mat-icon class="benefit-icon">check</mat-icon>
            <span>Monitoreo avanzado de sensores</span>
          </li>
          <li class="benefit-item">
            <mat-icon class="benefit-icon">check</mat-icon>
            <span>Alertas personalizables</span>
          </li>
          <li class="benefit-item">
            <mat-icon class="benefit-icon">check</mat-icon>
            <span>Historial de datos ilimitado</span>
          </li>
          <li class="benefit-item">
            <mat-icon class="benefit-icon">check</mat-icon>
            <span>Reportes semanales detallados</span>
          </li>
          <li class="benefit-item">
            <mat-icon class="benefit-icon">check</mat-icon>
            <span>Programación de riego automático</span>
          </li>
          <li class="benefit-item">
            <mat-icon class="benefit-icon">check</mat-icon>
            <span>Recomendaciones personalizadas</span>
          </li>
        </ul>
      </div>

      <div class="dialog-actions">
        <button
          mat-stroked-button
          class="cancel-button"
          (click)="onCancel()">
          No, gracias
        </button>
        <button
          mat-raised-button
          class="upgrade-button"
          (click)="onUpgrade()">
          <mat-icon>crown</mat-icon>
          Adquirir Premium
        </button>
      </div>
    </div>
  `,
  styles: [
    `
      .dialog-container {
        padding: 24px;
        max-width: 500px;
      }

      .dialog-header {
        margin-bottom: 20px;
      }

      .dialog-title {
        color: #333;
        font-size: 1.4rem;
        font-weight: 600;
        margin: 0;
      }

      .dialog-content {
        margin-bottom: 32px;
      }

      .dialog-description {
        color: #666;
        font-size: 0.95rem;
        line-height: 1.5;
        margin: 0 0 24px 0;
        text-align: justify;
      }

      .benefits-list {
        list-style: none;
        padding: 0;
        margin: 0;
        display: flex;
        flex-direction: column;
        gap: 12px;
      }

      .benefit-item {
        display: flex;
        align-items: center;
        gap: 12px;
        color: #333;
        font-size: 0.9rem;
      }

      .benefit-icon {
        color: #2ecc71;
        font-size: 18px;
        width: 18px;
        height: 18px;
        flex-shrink: 0;
      }

      .dialog-actions {
        display: flex;
        justify-content: space-between;
        gap: 16px;
      }

      .cancel-button {
        flex: 1;
        color: #666;
        border-color: #d0d0d0;
        font-weight: 500;
        padding: 12px 24px;
      }

      .cancel-button:hover {
        background-color: #f5f5f5;
        border-color: #bbb;
      }

      .upgrade-button {
        flex: 1;
        background-color: #9c7b5a;
        color: white;
        font-weight: 600;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        padding: 12px 24px;
      }

      .upgrade-button:hover {
        background-color: #e67e22;
        transform: translateY(-1px);
        box-shadow: 0 4px 12px rgb(230, 126, 34);
      }

      @media (max-width: 480px) {
        .dialog-container {
          padding: 20px;
        }

        .dialog-title {
          font-size: 1.2rem;
        }

        .dialog-description {
          font-size: 0.9rem;
        }

        .dialog-actions {
          flex-direction: column;
          gap: 12px;
        }

        .cancel-button,
        .upgrade-button {
          width: 100%;
        }
      }
    `,
  ],
})
export class PotLimitDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<PotLimitDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) { }

  onCancel(): void {
    this.dialogRef.close("cancel")
  }

  onUpgrade(): void {
    this.dialogRef.close("upgrade")
  }
}
