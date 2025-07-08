import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';   
import { MatButtonModule } from '@angular/material/button';  
import { Photo, PhotoService } from '../../core/photo.service';

@Component({
  selector: 'app-photo-detail',
  standalone: true,   
  imports: [CommonModule, MatButtonModule],  
  templateUrl: './photo-detail.component.html',
  styleUrls: ['./photo-detail.component.scss']
})
export class PhotoDetailComponent implements OnInit {
  photo!: Photo;

  constructor(
    private route: ActivatedRoute,
    private photoService: PhotoService,
    private router: Router
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.photo = this.photoService.getPhotoById(id);
    }
  }

  removeFavorite() {
    this.photoService.removeFromFavorites(this.photo.id);
    this.photo.isFavorite = false;
    this.router.navigate(['/favorites']);
  }
}
