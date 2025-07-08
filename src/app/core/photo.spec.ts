import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PhotoListComponent } from '../photos/photo-list/photo-list.component';
import { of } from 'rxjs';
import { PhotoService } from './photo.service';

class MockPhotoService {
  fetchRandomPhotos() {
    return of([]);
  }
}

describe('PhotoListComponent', () => {
  let component: PhotoListComponent;
  let fixture: ComponentFixture<PhotoListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PhotoListComponent], 
      providers: [
        { provide: PhotoService, useClass: MockPhotoService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(PhotoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });
});
