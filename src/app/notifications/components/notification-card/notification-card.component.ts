import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

export interface Notification {
  id: number;
  type: 'riego' | 'ambiente' | 'sistema' | 'bateria';
  title: string;
  description: string;
  timestamp: string;
  isRead: boolean;
  linkText?: string;
  deviceId?: string;
  priority?: 'low' | 'medium' | 'high' | 'critical';
}

@Component({
  selector: 'app-notification-card',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule
  ],
  template: `
    <div class="notification-item"
         [class.unread]="!notification.isRead"
         [class.priority-critical]="notification.priority === 'critical'"
         [class.priority-high]="notification.priority === 'high'">

      <div class="notification-content">
        <div class="notification-icon-wrapper" [ngClass]="getNotificationClass()">
          <mat-icon class="notification-icon">{{ getNotificationIcon() }}</mat-icon>
        </div>

        <div class="notification-details">
          <h3 class="notification-title">{{ notification.title }}</h3>
          <p class="notification-description">{{ notification.description }}</p>

          <div class="notification-meta-info" *ngIf="notification.deviceId">
            <span class="device-info">
              <mat-icon class="small-icon">device_hub</mat-icon>
              Dispositivo: {{ notification.deviceId }}
            </span>
          </div>

          <button *ngIf="notification.linkText"
                  mat-button
                  class="view-link"
                  (click)="onViewDetails()">
            {{ notification.linkText }}
          </button>
        </div>

        <div class="notification-meta">
          <div class="priority-indicator" *ngIf="notification.priority" [ngClass]="'priority-' + notification.priority">
            <span class="priority-text">{{ getPriorityText() }}</span>
          </div>

          <span class="notification-time">{{ notification.timestamp }}</span>

          <div class="notification-actions">
            <button *ngIf="!notification.isRead"
                    mat-icon-button
                    class="action-button mark-read"
                    (click)="onMarkAsRead()"
                    matTooltip="Marcar como leída">
              <mat-icon>check</mat-icon>
            </button>

            <button mat-icon-button
                    class="action-button delete"
                    (click)="onDelete()"
                    matTooltip="Eliminar notificación">
              <mat-icon>delete_outline</mat-icon>
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .notification-item {
      background: white;
      border-radius: 12px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      transition: all 0.2s ease;
      border-left: 4px solid transparent;
      margin-bottom: 12px;
    }

    .notification-item.unread {
      border-left-color: #2ecc71;
      box-shadow: 0 2px 12px rgba(46, 204, 113, 0.15);
    }

    .notification-item.priority-critical {
      border-left-color: #e74c3c;
      box-shadow: 0 2px 12px rgba(231, 76, 60, 0.15);
    }

    .notification-item.priority-high {
      border-left-color: #f39c12;
      box-shadow: 0 2px 12px rgba(243, 156, 18, 0.15);
    }

    .notification-item:hover {
      transform: translateY(-1px);
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
    }

    .notification-content {
      display: flex;
      align-items: flex-start;
      padding: 20px;
      gap: 16px;
    }

    .notification-icon-wrapper {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 48px;
      height: 48px;
      border-radius: 12px;
      flex-shrink: 0;
    }

    .notification-riego {
      background-color: #e8f5e8;
    }

    .notification-riego .notification-icon {
      color: #2ecc71;
    }

    .notification-ambiente {
      background-color: #fff3e0;
    }

    .notification-ambiente .notification-icon {
      color: #ff9800;
    }

    .notification-sistema {
      background-color: #e3f2fd;
    }

    .notification-sistema .notification-icon {
      color: #2196f3;
    }

    .notification-bateria {
      background-color: #f3e5f5;
    }

    .notification-bateria .notification-icon {
      color: #9c27b0;
    }

    .notification-details {
      flex: 1;
      min-width: 0;
    }

    .notification-title {
      color: #333;
      font-size: 1.1rem;
      font-weight: 600;
      margin: 0 0 8px 0;
      line-height: 1.3;
    }

    .notification-description {
      color: #666;
      font-size: 0.9rem;
      line-height: 1.4;
      margin: 0 0 12px 0;
    }

    .notification-meta-info {
      margin-bottom: 12px;
    }

    .device-info {
      display: flex;
      align-items: center;
      gap: 4px;
      color: #888;
      font-size: 0.8rem;
    }

    .small-icon {
      font-size: 16px;
      width: 16px;
      height: 16px;
    }

    .view-link {
      background-color: #f5f5f5;
      color: #333;
      font-weight: 500;
      padding: 8px 16px;
      border-radius: 20px;
      border: 1px solid #e0e0e0;
      font-size: 0.9rem;
      text-transform: none;
      min-width: auto;
      height: auto;
      display: inline-block;
      text-align: center;
      transition: all 0.2s ease;
    }

    .view-link:hover {
      background-color: #eeeeee;
      color: #333;
      border-color: #d0d0d0;
    }

    .notification-meta {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      gap: 8px;
      flex-shrink: 0;
    }

    .priority-indicator {
      padding: 4px 8px;
      border-radius: 12px;
      font-size: 0.7rem;
      font-weight: 600;
      text-transform: uppercase;
    }

    .priority-indicator.priority-critical {
      background-color: #ffebee;
      color: #e74c3c;
    }

    .priority-indicator.priority-high {
      background-color: #fff3e0;
      color: #f39c12;
    }

    .priority-indicator.priority-medium {
      background-color: #e3f2fd;
      color: #2196f3;
    }

    .priority-indicator.priority-low {
      background-color: #f1f8e9;
      color: #4caf50;
    }

    .notification-time {
      color: #999;
      font-size: 0.8rem;
      white-space: nowrap;
    }

    .notification-actions {
      display: flex;
      gap: 4px;
    }

    .action-button {
      width: 36px;
      height: 36px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .action-button.mark-read {
      color: #2ecc71;
    }

    .action-button.mark-read:hover {
      background-color: #e8f5e8;
    }

    .action-button.delete {
      color: #f44336;
    }

    .action-button.delete:hover {
      background-color: #ffebee;
    }

    @media (max-width: 768px) {
      .notification-content {
        padding: 16px;
        gap: 12px;
      }

      .notification-icon-wrapper {
        width: 40px;
        height: 40px;
      }

      .notification-meta {
        align-items: flex-start;
        gap: 6px;
      }

      .notification-actions {
        flex-direction: row;
      }
    }
  `]
})
export class NotificationCardComponent {
  @Input() notification!: Notification;
  @Output() markAsRead = new EventEmitter<number>();
  @Output() deleteNotification = new EventEmitter<number>();
  @Output() viewDetails = new EventEmitter<Notification>();

  getNotificationIcon(): string {
    switch (this.notification.type) {
      case 'riego':
        return 'water_drop';
      case 'ambiente':
        return 'thermostat';
      case 'sistema':
        return 'settings';
      case 'bateria':
        return 'battery_alert';
      default:
        return 'notifications';
    }
  }

  getNotificationClass(): string {
    return `notification-${this.notification.type}`;
  }

  getPriorityText(): string {
    switch (this.notification.priority) {
      case 'critical': return 'Crítico';
      case 'high': return 'Alto';
      case 'medium': return 'Medio';
      case 'low': return 'Bajo';
      default: return '';
    }
  }

  onMarkAsRead(): void {
    this.markAsRead.emit(this.notification.id);
  }

  onDelete(): void {
    this.deleteNotification.emit(this.notification.id);
  }

  onViewDetails(): void {
    this.viewDetails.emit(this.notification);
  }
}
