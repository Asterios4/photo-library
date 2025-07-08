import { Routes } from '@angular/router';
import { PhotoListComponent } from './photos/photo-list/photo-list.component';
import { PhotoDetailComponent } from './photo/photo-detail/photo-detail.component';
import { FavoritesComponent } from './favorites/favorites/favorites.component';

export const routes: Routes = [
  { path: '', component: PhotoListComponent },
  { path: 'favorites', component: FavoritesComponent },
  { path: 'photos/:id', component: PhotoDetailComponent },
  { path: '**', redirectTo: '' }
];
