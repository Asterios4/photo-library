import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-header',
  standalone: true,                      
  imports: [RouterModule, MatButtonModule],  
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  constructor(public router: Router) {}

  isActive(path: string): boolean {
    return this.router.url === path;
  }
}
