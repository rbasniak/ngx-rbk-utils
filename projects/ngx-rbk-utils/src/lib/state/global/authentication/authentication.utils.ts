import { JwtHelperService } from '@auth0/angular-jwt';
import { NgxRbkUtilsConfig } from '../../../ngx-rbk-utils.config';

export function generateUserData(token: string, config: NgxRbkUtilsConfig): any {
    // console.log(`Starting decoding token`);
    // tslint:disable-next-line:max-line-length
    // token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJzdXBlcnZpc29yLmx1aXoiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoic3VwZXJ2aXNvci5sdWl6IiwiaWF0IjoxNTkyNTIyMjQ4LCJwb3NpdGlvbklkIjoiMSIsInBvc2l0aW9uTmFtZSI6IlN1cGVydmlzb3IiLCJzaG9wSWQiOiIiLCJzaG9wTmFtZSI6IlNlbSBsb2phIGFzc29jaWFkYSIsImVtcGxveWVlSWQiOiJnNHl5ODJ3dWpqMmUzbHVuYmRtcGthdnh6aiIsImVtcGxveWVlTmFtZSI6Ikx1aXogQ2xhdWRpbyBkZSBTb3V6YSBDb2VsaG8iLCJuYmYiOjE1OTI1MjIyNDgsImV4cCI6MTU5MjU3NjI0OCwiaXNzIjoidmFyZWpvZmFjaWwudGsiLCJhdWQiOiJodHRwczovL3ZhcmVqb2ZhY2lsLnRrLyJ9.SbBH7so4ZGduzmrc0Fo_PetGURCOB5qX3zNL2Chs3io';
    const jwtDecoder = new JwtHelperService();
    const data = jwtDecoder.decodeToken(token);

    const user: any = {
    };

    if (config.authentication.accessTokenClaims == null) return user;

    for (const key of config.authentication.accessTokenClaims) {
        const value = data[key.claimName];
        let finalValue: any;

        if (typeof value === 'string') {
            if (key.type === 'string') {
                finalValue = value;
            }
            else if (key.type === 'array') {
                finalValue = [ value ];
            }
            else {
                throw new Error('Unsuported claim type in the ngx-rbk-utils library');
            }
        }
        else {
            if (key.type === 'string') {
                finalValue = [ value ];
            }
            else if (key.type === 'array') {
                finalValue = value;
            }
            else {
                throw new Error('Unsuported claim type in the ngx-rbk-utils library');
            }
        }

        if (finalValue != null) {
            user[key.propertyName] = finalValue;
        }
        else {
            if (key.type === 'array') {
                user[key.propertyName] = [];
            }
            else if (key.type === 'string') {
                user[key.propertyName] = '';
            }
            else {
                throw new Error('Unsupported type: ' + key.type + ', please update the library');
            }
        }

    }

    if (user.username === undefined) {
        user.username = '';
    }

    if (user.roles === undefined) {
        user.roles = [];
    }

    user.domain = data['Domain'];

    // console.log(`Finished decoding token`);
    return user;
}