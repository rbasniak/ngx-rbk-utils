import { DATABASE_REQUIRED_ACTIONS, DATABASE_STATES } from './database.state';
import { clearArray } from '../../utils/utils';

export function populateDatabaseStates(databaseStates: any[]): void {
    // For some reason Angular passes 2x through all Decorators, so we set the array
    // only when it's empty
    if (DATABASE_STATES.length === 0) {
        DATABASE_STATES.push(...databaseStates);
    }
}

export function populateDatabaseRequiredActions(databaseActions: any[]): void {
    // For some reason Angular passes 2x through all Decorators, so we set the array
    // only when it's empty
    if (DATABASE_REQUIRED_ACTIONS.length === 0) {
        DATABASE_REQUIRED_ACTIONS.push(...databaseActions);
    }
}