import { OnInit } from '@angular/core';
import { BaseResourceModel } from '../../models/base-resource.model';
import { BaseResourceService } from '../../services/base-resource.service';

export abstract class BaseResourceListComponent<T extends BaseResourceModel> implements OnInit {

    resources: T[] = []

    constructor(protected resourceService: BaseResourceService<T>) { }

    ngOnInit() {
        this.resourceService.getAll().subscribe(
            (resources) => {
                this.resources = resources.sort((a, b) => b.id - a.id)
            },
            (error: Error) => {
                alert('Não foi possível carregar os lançamentos.')
            }
        )
    }

    deleteResource(resource: T): void {

        const mustDelete = confirm("Deseja realmente excluir este item?")

        if (mustDelete) {
            this.resourceService.delete(resource.id).subscribe(
                () => {
                    this.resources = this.resources.filter((element) => element != resource),
                        (error: Error) => {
                            alert('Erro ao tentar excluir')
                        }
                }
            )
        }
    }

}
