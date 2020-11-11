import { ValidatorFn, Validators } from '@angular/forms';
import { Store } from '@ngxs/store';
import { SmzDialog, SmzDialogsService, SmzPresets } from 'ngx-smz-dialogs';
import { GlobalInjector } from '../misc/global.injector';
import { UiDefinitionsDbSelectors } from '../state/database/ui-definitions/ui-definitions.selectors';
import { convertFormFeature, InputConfig, InputConversionOptions } from '../ui/dialogs-input-conversion';

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

export function showMessage(title: string, message: string, confirmCallback: () => void): void {

  const dialogsService = GlobalInjector.instance.get(SmzDialogsService);
  dialogsService.open(({
      presetId: SmzPresets.Message,
      title: title,
      features: [{ type: 'message', data: message }],
      callbacks: {
          onConfirm: confirmCallback
      }
  }));
}

export function getValidatorsForInput(entityName: string, propertyName: string): ValidatorFn {
  const store = GlobalInjector.instance.get(Store);
  const dialogsService = GlobalInjector.instance.get(SmzDialogsService);
  const createData = store.selectSnapshot(UiDefinitionsDbSelectors.single(entityName, 'create'));
  const updateData = store.selectSnapshot(UiDefinitionsDbSelectors.single(entityName, 'update'));

  let input: InputConfig;
  for (const groupConfig of createData) {
    input = groupConfig.controls.find(x => x.propertyName === propertyName);
  }

  if (input != null) {
    for (const groupConfig of updateData) {
      input = groupConfig.controls.find(x => x.propertyName === propertyName);
    }
  }

  if (input != null) {
    const validators = [];

    if (input.required) {
      validators.push(Validators.required);
    }

    if (input.minLength != null) {
      validators.push(Validators.minLength(input.minLength));
    }

    if (input.maxLength != null) {
      validators.push(Validators.maxLength(input.maxLength));
    }

    return Validators.compose(validators);
  }
  else {
    return Validators.compose([]);
  }
}
