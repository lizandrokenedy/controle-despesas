import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-form-field-error',
  template: `
    <p class="text-danger">
      {{errorMessage}}
    </p>
  `,
  styleUrls: ['./form-field-error.component.css']
})
export class FormFieldErrorComponent implements OnInit {

  @Input('form-control') formControl: FormControl

  constructor() { }

  ngOnInit() {
  }

  public get errorMessage(): string{
    if(this.mustShowErrorMessage()){
      return this.getErrorMessage()
    } else {
      return null
    }
  }

  private mustShowErrorMessage(): boolean {
    return this.formControl.invalid && this.formControl.touched
  }

  private getErrorMessage(): string | null {
    if(this.formControl.errors.required){
      return "Campo obrigatório"
    }
    else if(this.formControl.errors.email) {
      return "E-mail inválido"
    }
    else if(this.formControl.errors.minlength) {
      const requiredLength = this.formControl.errors.minlength.requiredLength
      return `Mínimo ${requiredLength} caracteres`
    }
    else if(this.formControl.errors.maxlength) {
      const requiredLength = this.formControl.errors.maxlength.requiredLength
      return `Máximo ${requiredLength} caracteres`
    }

  }

}
