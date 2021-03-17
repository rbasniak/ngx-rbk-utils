import { Component, OnInit } from '@angular/core';
import { UntilDestroy } from '@ngneat/until-destroy';

@Component({
    selector: 'demo-not-secret-component',
    templateUrl: './not-secret-route.component.html'
})

@UntilDestroy()
export class NotSecretRouteComponent implements OnInit {
    public count = 1;
    public text = '';
    constructor() {

    }

    ngOnInit() { }

    public onLeaving(): void
    {
        console.log('onLeaving from component');

        this.count = 500;
    }

    public onArriving(): void
    {
        console.log('onArriving from component');

        this.text = 'Wait for it.... ';
        setTimeout(() => {
            this.count = 1;
            this.text = '';
        }, 3000);
    }
}