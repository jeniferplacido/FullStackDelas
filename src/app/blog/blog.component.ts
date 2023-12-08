import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BlogService } from './../blog-service.service';

@Component({
  selector: 'app-blog',
  templateUrl:'./blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {
  curriculoForm: FormGroup;
  curriculos: any[] = [];

  constructor(private fb: FormBuilder, private blogService: BlogService) {
    this.curriculoForm = this.fb.group({
      nome: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      linkedin: ['', Validators.required],
      frase: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.carregarCurriculos();
  }

  carregarCurriculos() {
    this.blogService.getCurriculos().subscribe(
      (curriculos) => {
        this.curriculos = curriculos;
      },
      (error) => {
        console.error('Erro ao carregar currículos:', error);
      }
    );
  }

  cadastrarCurriculo() {
    if (this.curriculoForm.valid) {
      this.blogService.adicionarCurriculo(this.curriculoForm.value).subscribe(
        () => {
          this.carregarCurriculos();
          this.curriculoForm.reset();
        },
        (error) => {
          console.error('Erro ao cadastrar currículo:', error);
        }
      );
    } else {
      this.markFormAsTouched(this.curriculoForm);
    }
  }

  markFormAsTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();

      if (control instanceof FormGroup) {
        this.markFormAsTouched(control);
      }
    });
  }
}
