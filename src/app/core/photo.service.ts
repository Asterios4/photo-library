import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

export interface Photo {
  id: string;          
  url: string;         
  isFavorite: boolean; 
}

@Injectable({
  providedIn: 'root'
})
export class PhotoService {
  private readonly favoritesKey = 'favorite_photos';

  private favorites: Set<string> = new Set();
  private favoritesSubject = new BehaviorSubject<Photo[]>([]);

  constructor() {
    this.loadFavoritesFromStorage();
  }

  private loadFavoritesFromStorage(): void {
    const stored = localStorage.getItem(this.favoritesKey);
    if (stored) {
      const favIds: string[] = JSON.parse(stored);
      this.favorites = new Set(favIds);
    }
    this.emitFavorites();
  }

  private saveFavoritesToStorage(): void {
    localStorage.setItem(this.favoritesKey, JSON.stringify(Array.from(this.favorites)));
  }

  private emitFavorites(): void {
    const favPhotos = Array.from(this.favorites).map(id => ({
      id,
      url: this.buildPhotoUrl(id),
      isFavorite: true
    }));
    this.favoritesSubject.next(favPhotos);
  }

  getFavorites(): Observable<Photo[]> {
    return this.favoritesSubject.asObservable();
  }

  addToFavorites(id: string): void {
    this.favorites.add(id);
    this.saveFavoritesToStorage();
    this.emitFavorites();
  }

  removeFromFavorites(id: string): void {
    this.favorites.delete(id);
    this.saveFavoritesToStorage();
    this.emitFavorites();
  }

  isFavorite(id: string): boolean {
    return this.favorites.has(id);
  }

  fetchRandomPhotos(count: number = 10): Observable<Photo[]> {
    const photos: Photo[] = [];
    for (let i = 0; i < count; i++) {
      const id = this.generateRandomId();
      photos.push({
        id,
        url: this.buildPhotoUrl(id),
        isFavorite: this.isFavorite(id)
      });
    }
    const randomDelay = 200 + Math.floor(Math.random() * 100);
    return of(photos).pipe(delay(randomDelay));
  }

  getPhotoById(id: string): Photo {
    return {
      id,
      url: this.buildPhotoUrl(id),
      isFavorite: this.isFavorite(id)
    };
  }

  private generateRandomId(): string {
    return Math.random().toString(36).substring(2, 10);
  }

  private buildPhotoUrl(id: string): string {
    return `https://picsum.photos/200/300?random=${id}`;
  }
}
