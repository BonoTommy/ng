import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogueSupprimerBiereComponent } from './dialogue-supprimer-biere.component';

describe('DialogueSupprimerBiereComponent', () => {
  let component: DialogueSupprimerBiereComponent;
  let fixture: ComponentFixture<DialogueSupprimerBiereComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogueSupprimerBiereComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogueSupprimerBiereComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
