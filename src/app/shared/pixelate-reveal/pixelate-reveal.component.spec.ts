import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PixelateRevealComponent } from './pixelate-reveal.component';

describe('PixelateRevealComponent', () => {
  let component: PixelateRevealComponent;
  let fixture: ComponentFixture<PixelateRevealComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PixelateRevealComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PixelateRevealComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
