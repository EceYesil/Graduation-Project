import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent {
  @Input() isSidebarCollapsed!: boolean;
  @Output() changeIsSidebarCollapsed = new EventEmitter<boolean>();
  items = [
    {
      routeLink: '/',
      icon: 'fal fa-home',
      label: 'Home',
    },
    {
      routeLink: 'survey',
      icon: 'fal fa-box-open',
      label: 'Survey',
    },
    {
      routeLink: 'survey operations',
      icon: 'fal fa-file',
      label: 'Survey operations',
    },
    {
      routeLink: 'settings',
      icon: 'fal fa-cog',
      label: 'Settings',
    },
  ];

  toggleCollapse(): void {
    this.changeIsSidebarCollapsed.emit(!this.isSidebarCollapsed);
  }

  closeSidenav(): void {
    this.changeIsSidebarCollapsed.emit(true);
  }
}