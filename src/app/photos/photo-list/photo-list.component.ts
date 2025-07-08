import { Component, HostListener, OnInit } from '@angular/core';
import { Photo, PhotoService } from '../../core/photo.service';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-photo-list',
  templateUrl: './photo-list.component.html',
  styleUrls: ['./photo-list.component.scss'],
  standalone: true,
  imports: [
    CommonModule,           
    MatIconModule,          
    MatProgressSpinnerModule 
  ]
})
export class PhotoListComponent implements OnInit {
  photos: Photo[] = [];
  loading = false;
  private initialLoadDone = false;

  constructor(private photoService: PhotoService) {}

  ngOnInit() {
    this.loadMorePhotos();
  }

  loadMorePhotos() {
    if (this.loading) return;
    this.loading = true;
    this.photoService.fetchRandomPhotos(10).subscribe(newPhotos => {
      this.photos = [...this.photos, ...newPhotos];
      this.loading = false;
      if (!this.initialLoadDone) {
        this.initialLoadDone = true;
        setTimeout(() => {
          this.checkScrollAndLoad();
        }, 100);
      }
    });
  }

  toggleFavorite(photo: Photo) {
    if (photo.isFavorite) {
      this.photoService.removeFromFavorites(photo.id);
    } else {
      this.photoService.addToFavorites(photo.id);
    }
    photo.isFavorite = !photo.isFavorite;
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.checkScrollAndLoad();
  }

  private checkScrollAndLoad() {
    if ((window.innerHeight + window.scrollY) >= document.documentElement.scrollHeight - 500) {
      this.loadMorePhotos();
    }
  }
}