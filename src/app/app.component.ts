import { Component, HostListener, OnInit, signal } from '@angular/core';
import { SidebarComponent } from './custom-build/sidebar/sidebar.component';
import { MainComponent } from './main/main.component';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from './custom-build/navbar/navbar.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [SidebarComponent, MainComponent,RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  isSidebarCollapsed = signal<boolean>(false);
  screenWidth = signal<number>(0);

  constructor() {
    if (typeof window !== 'undefined') {
      this.screenWidth.set(window.innerWidth);
    }
  }

  @HostListener('window:resize')
  onResize() {
    if (typeof window !== 'undefined') {
      this.screenWidth.set(window.innerWidth);
      if (this.screenWidth() < 768) {
        this.isSidebarCollapsed.set(true);
      }
    }
  }

  ngOnInit(): void {
    if (typeof window !== 'undefined') {
      this.isSidebarCollapsed.set(this.screenWidth() < 768);
    }
  }

  changeIsSidebarCollapsed(isSidebarCollapsed: boolean): void {
    this.isSidebarCollapsed.set(isSidebarCollapsed);
  }
}