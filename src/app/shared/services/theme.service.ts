import { DOCUMENT } from '@angular/common';
import { Injectable, inject, signal, effect } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private document = inject(DOCUMENT);

  isDarkTheme = signal<boolean>(this.getInitialTheme());

  constructor() {

    effect(() => {
      const isDark = this.isDarkTheme();
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
      this.document.body.classList.toggle('dark-theme', isDark);
    });
  }

  private getInitialTheme(): boolean {
    if (typeof localStorage === 'undefined') {
      return false;
    }
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme) {
      return storedTheme === 'dark';
    }
    // Si no hay tema guardado, usa la preferencia del navegador/SO.
    return window.matchMedia?.('(prefers-color-scheme: dark)').matches ?? false;
  }

  toggleTheme(): void {
    this.isDarkTheme.update(currentValue => !currentValue);
  }
}
