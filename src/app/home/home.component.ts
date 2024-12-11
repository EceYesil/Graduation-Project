import { Component } from '@angular/core';
import { RouterModule, Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule,CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  showWelcomeMessage: boolean = true;
  breadcrumb: string = 'Home';
  isHomePage: boolean = false;

  constructor(private router: Router, private route: ActivatedRoute) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const currentRoute = this.route.snapshot.firstChild?.routeConfig?.path;
        this.showWelcomeMessage = currentRoute === undefined;
        this.breadcrumb = currentRoute ? this.capitalizeFirstLetter(currentRoute.replace('-', ' ')) : '';
        this.isHomePage = event.url === '/';
      }
    });
  }

  private capitalizeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
}