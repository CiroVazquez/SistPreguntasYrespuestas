import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CambiarPaswordComponent } from './cambiar-pasword.component';

describe('CambiarPaswordComponent', () => {
  let component: CambiarPaswordComponent;
  let fixture: ComponentFixture<CambiarPaswordComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CambiarPaswordComponent]
    });
    fixture = TestBed.createComponent(CambiarPaswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
