import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotoDetailComponent } from './photo-detail.component';

describe('PhotoDetail', () => {
  let component: PhotoDetailComponent;
  let fixture: ComponentFixture<PhotoDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PhotoDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PhotoDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
