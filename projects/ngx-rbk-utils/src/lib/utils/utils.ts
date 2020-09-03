/*
    Replaces an item in an array by its id property
*/
export function replaceArrayItem<T>(items: T[], newItem: T): T[] {
    const index = items.findIndex(x => (x as any).id === (newItem as any).id);

    if (index === -1) throw new Error('Elemento não encontrado no array');

    const result = [...items];
    result[index] = newItem;

    return result;
}

/*
    Checks wheter the current date is withing a time interval of
    X min after the specified date
*/
export function isWithinTime(date: Date, interval: number): boolean {
    return Date.now() < date.getTime() + interval * 60 * 1000;
}

/*
    Order the given array by a text property
*/
export function orderArrayByProperty(array: any[], property: string): any[] {
    return array.sort((a, b) => (a[property] as string).toLowerCase() > (b[property] as string).toLowerCase() ? 1 : -1);
}

/*
    Deep clone any dummy object
*/
export function deepClone<T>(object: T): T {
    return JSON.parse(JSON.stringify(object));
}

/*
    Checks if a string is null, undefined or empty
*/
export function isEmpty(str: string): boolean {
    return (!str || 0 === str.length);
}

/*
    Remove all items from an array
*/
export function clearArray<T>(array: T[]): void {
    for (const item of array) {
        array.pop();
    }
}

/*
    Map {property_name}.id properties to {property_name}Id in Javascript objects
*/
export function flattenObject<T>(data: any): T {
    const result = {};
    for (const key of Object.keys(data)) {
        if (data[key] != null && data[key].id !== undefined) {
            result[key + 'Id'] = data[key].id;
        }
        else {
            result[key] = data[key];
        }
    }

    for (const key of Object.keys(result)) {
        if (Object.keys(result).find(x => x === key + 'Id') != null) {
            result[key] = undefined;
        }
    }

    return result as T;
}

export function fixDates(data: {[key: string]: any}) {
    if (data != null) {
        for (const key of Object.keys(data)) {
            if (typeof data[key] === 'string') {
                if (key.startsWith('date') || key.endsWith('Date')) {
                    const originalDate = data[key];
                    const epochDate = Date.parse(data[key]);
                    data[key] = new Date(epochDate);
                    console.log('Found a string date (' + key + '): ' + originalDate, data[key]);
                }
            }
            else if (typeof data[key] === 'number') {
                if (key.startsWith('date') || key.endsWith('Date')) {
                    console.log('Found an epoch date: ' + data[key]);
                    if (data[key] > 99999999999) { // timestamp miliseconds
                        data[key] = new Date(data[key]);
                    }
                    else { // timestamp seconds
                        data[key] = new Date(data[key] * 1000);
                    }
                }
            }
            else if (typeof data[key] === 'object') {
                fixDates(data[key]);
            }
        }
    }
}