import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { UntilDestroy } from '@ngneat/until-destroy';

@Component({
    selector: 'demo-not-secret-component',
    templateUrl: './not-secret-route.component.html'
})

@UntilDestroy()
export class NotSecretRouteComponent implements OnInit {
    public count = 1;
    public text = '';
    public config: { visible: boolean } = { visible: false }
    constructor(private cdr: ChangeDetectorRef) {

    }

    ngOnInit() { }

    public show(): void
    {
        this.config.visible = true;
    }

    public hide(): void
    {
        this.config.visible = false;
    }

    public onLeaving(): void
    {
        console.log('onLeaving from component');
        this.config.visible = false;
        this.count = 500;
        this.cdr.detectChanges();
    }

    public onArriving(): void
    {
        console.log('onArriving from component');

        this.text = 'Wait for it.... ';
        setTimeout(() => {
            this.count = 1;
            this.text = '';
        }, 3000);

        // this.config.visible = true;
    }

}