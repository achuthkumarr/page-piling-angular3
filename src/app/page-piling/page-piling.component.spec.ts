import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagePilingComponent } from './page-piling.component';

describe('PagePilingComponent', () => {
  let component: PagePilingComponent;
  let fixture: ComponentFixture<PagePilingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PagePilingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PagePilingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
