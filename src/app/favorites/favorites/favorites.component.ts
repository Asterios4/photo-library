import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { Router } from '@angular/router';
import { Photo, PhotoService } from '../../core/photo.service';

@Component({
  selector: 'app-favorites',
  standalone: true,  
  imports: [CommonModule],  
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit {
  favorites: Photo[] = [];

  constructor(private photoService: PhotoService, private router: Router) {}

  ngOnInit() {
    this.photoService.getFavorites().subscribe(favs => this.favorites = favs);
  }

  openPhoto(photo: Photo) {
    this.router.navigate(['/photos', photo.id]);
  }
}
