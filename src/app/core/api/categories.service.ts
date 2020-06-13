import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseApiService } from 'ngx-rbk-utils';
import { Store } from '@ngxs/store';
import { CategoryDetails, CategoryCreation, CategoryUpdate } from '../models/categories';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { of } from 'rxjs';

@Injectable({providedIn: 'root'})
export class CategoriesService extends BaseApiService {
    constructor() {
        super();
    }

    static data = [
        {
            id: '1',
            name: 'Category 1',
        },
        {
            id: '2',
            name: 'Category 2',
        },
        {
            id: '3',
            name: 'Category 3',
        },
        {
            id: '4',
            name: 'Category 4',
        },
        {
            id: '5',
            name: 'Category 5',
        }
    ];

    public all(): Observable<CategoryDetails[]> {
        return of(CategoriesService.data);
    }

    public create(data: CategoryCreation): Observable<CategoryDetails> {
        return of({
            id: `${CategoriesService.data.length}`,
            name: data.name
        });
    }

    public update(data: CategoryUpdate): Observable<CategoryDetails> {
        return of({
            ...data,
            name: data.name
        });
    }

    public delete(id: string): Observable<void> {
        return of();
    }
}