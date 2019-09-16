import { OnInit, AfterContentChecked, Injector } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { switchMap } from 'rxjs/operators';
import * as toastr from 'toastr'
import { BaseResourceModel } from '../../models/base-resource.model';
import { BaseResourceService } from '../../services/base-resource.service';

export abstract class BaseResourceFormComponent<T extends BaseResourceModel> implements OnInit {

  currentAction: string
  resourceForm: FormGroup
  pageTitle: string
  serverErrorMessages: string[] = null
  submittingForm: boolean = false

  protected route: ActivatedRoute
  protected router: Router
  protected formBuilder: FormBuilder


  constructor(
    protected injector: Injector,
    public resource: T,
    protected resourceService: BaseResourceService<T>,
    protected jsonDataToResourceFn: (jsonData) => T
  ) { 
      this.route = this.injector.get(ActivatedRoute)
      this.router = this.injector.get(Router)
      this.formBuilder = this.injector.get(FormBuilder)
  }

  ngOnInit() {
    this.setCurrentAction()
    this.builderCategoryForm()
    this.loadCategory()
  }

  ngAfterContentChecked() {
    this.setPageTitle()
  }

  submitForm() {
    this.submittingForm = true

    if (this.currentAction == "new") {
      this.createCategory()
    } else {
      this.updateCategory()
    }
  }

  private setCurrentAction() {
    if (this.route.snapshot.url[0].path == "new") {
      this.currentAction = "new"
    } else {
      this.currentAction = "edit"
    }
  }

  private builderCategoryForm() {
    this.categoryForm = this.formBuilder.group({
      id: [null],
      name: [null, [Validators.required, Validators.minLength(2)]],
      description: [null]
    })
  }

  private loadCategory() {
    if (this.currentAction == "edit") {
      this.route.paramMap.pipe(
        switchMap(params => this.categoryService.getById(+params.get("id")))
      )
        .subscribe(
          (category) => {
            this.category = category
            this.categoryForm.patchValue(category)
          },
          (error) => alert('Ocorreu um erro no servidor, tente novamente.')
        )
    }
  }

  private setPageTitle() {
    if (this.currentAction == "new") {
      this.pageTitle = "Cadastro de Nova Categoria"
    } else {
      const categoryName = this.category.name || ""
      this.pageTitle = "Editando Categoria: " + categoryName
    }
  }

  private createCategory() {
    const category: Category = Object.assign(new Category(null, null, null), this.categoryForm.value)
    this.categoryService.create(category)
      .subscribe(
        category => this.actionsForSuccess(category),
        error => this.actionsForError(error)
      )
  }

  private updateCategory() {
    const category: Category = Object.assign(new Category(null, null, null), this.categoryForm.value)
    this.categoryService.update(category)
    .subscribe(
      category => this.actionsForSuccess(category),
      error => this.actionsForError(error)
    )
  }

  private actionsForSuccess(category: Category){
      toastr.success("Categoria criada com sucesso!")
      this.router.navigateByUrl("categories", {skipLocationChange: true}).then(
        () => this.router.navigate(["categories", category.id, "edit"])
      )
  }

  private actionsForError(error){
      toastr.error("Ocorreu um erro ao processar a solicitação!")

      this.submittingForm = false
      
      if(error.status === 422){
        this.serverErrorMessages = JSON.parse(error._body).errors
      } else {
        this.serverErrorMessages = ["Falha na comunicação com o servidor. Por favor, tente novamente mais tarde."]
      }

  }

}
