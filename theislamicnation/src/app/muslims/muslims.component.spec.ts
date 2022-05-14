import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MuslimsComponent } from './muslims.component';

describe('MuslimsComponent', () => {
  let component: MuslimsComponent;
  let fixture: ComponentFixture<MuslimsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MuslimsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MuslimsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
