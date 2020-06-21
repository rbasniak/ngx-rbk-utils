import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UntilDestroy } from '@ngneat/until-destroy';

@Component({
    selector: 'demo-super-secret-component',
    templateUrl: './super-secret-route.component.html'
})

@UntilDestroy()
export class SuperSecretRouteComponent implements OnInit {
    constructor(private route: ActivatedRoute) {
    }

    ngOnInit() { }
}