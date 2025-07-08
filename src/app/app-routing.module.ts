import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PhotoListComponent } from './photos/photo-list/photo-list.component';
import { FavoritesComponent } from './favorites/favorites/favorites.component';
import { PhotoDetailComponent } from './photo/photo-detail/photo-detail.component';



const routes: Routes = [
  { path: '', component: PhotoListComponent },
  { path: 'favorites', component: FavoritesComponent },
  { path: 'photos/:id', component: PhotoDetailComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
