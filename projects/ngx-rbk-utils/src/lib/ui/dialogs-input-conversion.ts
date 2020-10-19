import { SimpleNamedEntity, SmzCalendarControl, SmzCheckBoxControl, SmzColorPickerControl,
    SmzControlType, SmzControlTypes, SmzCurrencyControl, SmzDialogFeature, SmzDropDownControl,
    SmzFileControl, SmzForm, SmzFormsBaseControl, SmzFormGroup, SmzMaskControl, SmzMultiSelectControl,
    SmzNumberControl, SmzPasswordControl, SmzRadioControl, SmzSwitchControl, SmzTextAreaControl, SmzTextControl } from 'ngx-smz-dialogs';
import { fixDate, isEmpty } from '../utils/utils';
import { Store } from '@ngxs/store';

export function convertFormFeature(groups: FormGroupConfig[], store: Store, entity: {[key: string]: any} = null, options: InputConversionOptions = null): SmzDialogFeature {
    const form: SmzForm<any> = {
        groups: [],
        behaviors: {}
    };

    const smzFeature: SmzDialogFeature = {
        type: 'form',
        data: form
    };

    for (const groupConfig of groups) {
        const group: SmzFormGroup = {
            name: groupConfig.controls[0].group,
            showName: !isEmpty(groupConfig.controls[0].group),
            children: convertInputs(groupConfig.controls, store)
        };

        if (options != null) {
            if (options.fieldsToIgnore != null) {
                for (const input of options.fieldsToIgnore) {
                    group.children = group.children.filter(x => x.propertyName !== input);
                }
            }

            if (options.fieldsToConvert != null) {
                for (const tuple of options.fieldsToConvert) {
                    const index = group.children.findIndex(x => x.propertyName === tuple.originalName);
                    if (index !== -1) {
                        group.children[index] = { ...group.children[index], propertyName: tuple.newName }
                    }
                }
            }
        }

        if (entity != null) {
            for (const input of group.children) {
                if (input.propertyName.endsWith('Id')) {
                    if (entity[input.propertyName.substring(0, input.propertyName.length - 2)]?.id !== undefined) {
                        input.defaultValue = entity[input.propertyName.substring(0, input.propertyName.length - 2)].id;
                    }
                    else {
                        // Check if the name wasn't replaced
                        if (options != null && options.fieldsToConvert != null) {
                            const replaceIndex = options.fieldsToConvert.findIndex(x => x.newName === input.propertyName);
                            if (replaceIndex !== -1) {
                                input.defaultValue = entity[options.fieldsToConvert[replaceIndex].originalName];
                            }
                            else {
                                input.defaultValue = entity[input.propertyName]?.id !== undefined ? entity[input.propertyName].id : entity[input.propertyName];
                            }
                        }
                        else {
                            input.defaultValue = entity[input.propertyName]?.id !== undefined ? entity[input.propertyName].id : entity[input.propertyName];
                        }
                    }
                }
                else if (entity[input.propertyName] !== undefined) {
                    // Check if the name wasn't replaced
                    if (options != null && options.fieldsToConvert != null) {
                        const replaceIndex = options.fieldsToConvert.findIndex(x => x.newName === input.propertyName);
                        if (replaceIndex !== -1) {
                            input.defaultValue = entity[options.fieldsToConvert[replaceIndex].originalName];
                        }
                        else {
                            input.defaultValue = entity[input.propertyName]?.id !== undefined ? entity[input.propertyName].id : entity[input.propertyName];
                        }
                    }
                    else {
                        input.defaultValue = entity[input.propertyName]?.id !== undefined ? entity[input.propertyName].id : entity[input.propertyName];
                    }
                }
            }
        }

        form.groups.push(group);
    }

    return smzFeature;
}

function convertInputs(inputs: InputConfig[], store: Store): SmzControlTypes[] {
    const results = [];

    for (const config of inputs) {
        if (config.controlType.id === `${SmzControlType.TEXT}`) {
            const input: SmzTextControl = {
                ...convertBaseControl(config),
                defaultValue: config.defaultValue,
                type: SmzControlType.TEXT,
            };
            results.push(input);
        }

        else if (config.controlType.id === `${SmzControlType.CALENDAR}`) {
            const input: SmzCalendarControl = {
                ...convertBaseControl(config),
                defaultValue: fixDate(config.defaultValue),
                type: SmzControlType.CALENDAR,
            };
            results.push(input);
        }

        else if (config.controlType.id === `${SmzControlType.CHECKBOX}`) {
            const input: SmzCheckBoxControl = {
                ...convertBaseControl(config),
                defaultValue: config.defaultValue,
                type: SmzControlType.CHECKBOX,
            };
            results.push(input);
        }

        else if (config.controlType.id === `${SmzControlType.COLOR_PICKER}`) {
            const input: SmzColorPickerControl = {
                ...convertBaseControl(config),
                defaultValue: config.defaultValue,
                type: SmzControlType.COLOR_PICKER,
            };
            results.push(input);
        }

        else if (config.controlType.id === `${SmzControlType.CURRENCY}`) {
            const input: SmzCurrencyControl = {
                ...convertBaseControl(config),
                defaultValue: config.defaultValue,
                type: SmzControlType.CURRENCY,
            };
            results.push(input);
        }

        else if (config.controlType.id === `${SmzControlType.DROPDOWN}`) {
            const options = getInputOptions(config, store);
            const input: SmzDropDownControl<any> = {
                ...convertBaseControl(config),
                defaultValue: config.required ? options[0].id : config.defaultValue,
                type: SmzControlType.DROPDOWN,
                filterMatchMode: config.filterMatchMode,
                showFilter: config.showFilter,
                options: options
            };
            results.push(input);
        }

        else if (config.controlType.id === `${SmzControlType.FILE}`) {
            const input: SmzFileControl = {
                ...convertBaseControl(config),
                defaultValue: config.defaultValue,
                type: SmzControlType.FILE,
                fileAccept: config.fileAccept
            };
            results.push(input);
        }

        else if (config.controlType.id === `${SmzControlType.MULTI_SELECT}`) {
            const input: SmzMultiSelectControl<any> = {
                ...convertBaseControl(config),
                defaultValue: config.defaultValue,
                type: SmzControlType.MULTI_SELECT,
                defaultLabel: '',
                filterMatchMode: config.filterMatchMode,
                showFilter: config.showFilter,
                options: getInputOptions(config, store)
            };
            results.push(input);
        }

        else if (config.controlType.id === `${SmzControlType.NUMBER}`) {
            const input: SmzNumberControl = {
                ...convertBaseControl(config),
                defaultValue: config.defaultValue,
                type: SmzControlType.NUMBER,
            };
            results.push(input);
        }

        else if (config.controlType.id === `${SmzControlType.PASSWORD}`) {
            const input: SmzPasswordControl = {
                ...convertBaseControl(config),
                defaultValue: config.defaultValue,
                type: SmzControlType.PASSWORD,
            };
            results.push(input);
        }

        else if (config.controlType.id === `${SmzControlType.RADIO}`) {
            const input: SmzRadioControl<any> = {
                ...convertBaseControl(config),
                defaultValue: config.defaultValue,
                type: SmzControlType.RADIO,
                options: getInputOptions(config, store)
            };
            results.push(input);
        }

        else if (config.controlType.id === `${SmzControlType.SWITCH}`) {
            const input: SmzSwitchControl = {
                ...convertBaseControl(config),
                defaultValue: config.defaultValue,
                type: SmzControlType.SWITCH,
            };
            results.push(input);
        }

        else if (config.controlType.id === `${SmzControlType.TEXT_AREA}`) {
            const input: SmzTextAreaControl = {
                ...convertBaseControl(config),
                defaultValue: config.defaultValue,
                type: SmzControlType.TEXT_AREA,
                textAreaRows: config.textAreaRows
            };
            results.push(input);
        }

        else if (config.controlType.id === `${SmzControlType.TEXT_MASK}`) {
            const input: SmzMaskControl = {
                ...convertBaseControl(config),
                defaultValue: config.defaultValue,
                type: SmzControlType.TEXT_MASK,
                characterPattern: config.characterPattern,
                mask: config.mask,
                unmask: config.unmask,
            };
            results.push(input);
        }
    }

    return results;
}

function getInputOptions(config: InputConfig, store: Store): any[] {
    if (config.data != null) {
        return config.data;
    }

    if (config.dataSource.id === '1') {
        const stateData = store.selectSnapshot(x => x.database[config.sourceName]?.items);

        if (stateData !== undefined) {
            if (stateData !== null) {
                if (!isEmpty(config.entityLabelPropertyName)) {
                    return stateData.map(x => ({ id: x.id, name: x[config.entityLabelPropertyName] }));
                }
                else {
                    return stateData;
                }
            }
        }
        else {
            throw new Error('Could not read data from the database state');
        }
    }

    return [];
}

function convertBaseControl(config: InputConfig): SmzFormsBaseControl {
    return {
        name: config.required ? config.name + ' *': config.name,
        propertyName: config.propertyName,
        isVisible: config.isVisible,
        advancedSettings: {
            excludeFromResponse: config.excludeFromResponse,
        },
        type: SmzControlType.TEXT_AREA,
        validatorsPreset: {
            isRequired: config.required,
            minLength: config.minLength,
            maxLength: config.maxLength,
        },
    };
}

export interface FormDefinitionData {
    create: FormGroupConfig[],
    update: FormGroupConfig[],
}

export interface FormGroupConfig {
    controls: InputConfig[];
}

export interface InputConfig {
    controlType: SimpleNamedEntity;
    dataSource?: SimpleNamedEntity;
    propertyName: string;
    sourceName?: string;
    name: string;
    defaultValue?: any;
    group?: string;

    dependsOn?: string;

    textAreaRows?: number;

    mask?: string;
    unmask?: boolean;
    characterPattern?: string;

    fileAccept?: string;

    showFilter?: boolean;
    filterMatchMode?: string;

    required: boolean;
    minLength?: number;
    maxLength?: number;
    data?: SimpleNamedEntity[];
    isVisible: boolean;
    excludeFromResponse?: boolean;

    entityLabelPropertyName?: string;
}

export interface InputConversionOptions {
    fieldsToIgnore?: string[],
    fieldsToConvert?: { originalName: string, newName: string }[]
}