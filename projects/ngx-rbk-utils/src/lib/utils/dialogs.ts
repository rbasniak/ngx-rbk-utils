import { Store } from '@ngxs/store';
import { SmzDialog, SmzDialogsService, SmzPresets } from 'ngx-smz-dialogs';
import { GlobalInjector } from '../misc/global.injector';
import { UiDefinitionsDbSelectors } from '../state/database/ui-definitions/ui-definitions.selectors';
import { convertFormFeature, InputConversionOptions } from '../ui/dialogs-input-conversion';

export function showDialog<T>(entity: { [key: string]: any }, entityName: string, title: string,
    confirmCallback: (data: T) => void, options: InputConversionOptions = null, logResult: boolean = false): void {
    const store = GlobalInjector.instance.get(Store);
    const dialogsService = GlobalInjector.instance.get(SmzDialogsService);
    const mode = entity != null ? 'update' : 'create';
    const config = store.selectSnapshot(UiDefinitionsDbSelectors.single(entityName, mode));
    const inputs = convertFormFeature(config, store, entity, options);
    dialogsService.open({
        title: title,
        features: [
            inputs
        ],
        callbacks: {
            onConfirm: (data: T): void => {
                if (logResult) {
                    console.log(data);
                }
                confirmCallback(data);
            }
        }
    } as SmzDialog<T>);
}


export function showConfirmation(title: string, message: string, confirmCallback: () => void): void {

    const dialogsService = GlobalInjector.instance.get(SmzDialogsService);
    dialogsService.open(({
        presetId: SmzPresets.Confirmation,
        title: title,
        features: [{ type: 'message', data: message }],
        callbacks: {
            onConfirm: confirmCallback
        }
    }));
}
