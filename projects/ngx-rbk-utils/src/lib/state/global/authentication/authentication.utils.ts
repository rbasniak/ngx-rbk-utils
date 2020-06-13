import { JwtHelperService } from '@auth0/angular-jwt';
import { NgxRbkUtilsConfig } from '../../../ngx-rbk-utils.config';

export function generateUserData(token: string, config: NgxRbkUtilsConfig): any {
    // tslint:disable-next-line:max-line-length
    token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJyaWNhcmRvLmlncmVqYSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiJyaWNhcmRvLmlncmVqYSIsImlhdCI6MTU5MjAwNDM4OSwicG9zaXRpb25JZCI6IjIiLCJwb3NpdGlvbk5hbWUiOiJEaXJldG9yIiwic2hvcElkIjoiIiwic2hvcE5hbWUiOiJTZW0gbG9qYSBhc3NvY2lhZGEiLCJlbXBsb3llZUlkIjoiN2t5OWR4anZjcDJlcm1sdDd1a3djdng1bG4iLCJlbXBsb3llZU5hbWUiOiJSaWNhcmRvIFNtYXJ6YXJvIGRhIElncmVqYSIsInJvbGVzIjpbIlZJRVdfU1VQUExJRVJTX0xJU1QiLCJFRElUX1NVUFBMSUVSUyIsIlZJRVdfV0FSRUhPVVNFU19MSVNUIiwiRURJVF9XQVJFSE9VU0VTIiwiVklFV19WRU5UVVJFU19MSVNUIiwiRURJVF9WRU5UVVJFUyIsIlZJRVdfU0hPUFNfTElTVCIsIkVESVRfU0hPUFMiLCJWSUVXX0VNUExPWUVFU19MSVNUIiwiRURJVF9FTVBMT1lFRVMiLCJWSUVXX1BBWU1FTlRfTUVUSE9EU19MSVNUIiwiRURJVF9QQVlNRU5UX01FVEhPRFMiLCJWSUVXX1BBWU1FTlRfVFlQRVNfTElTVCIsIkVESVRfUEFZTUVOVF9UWVBFUyIsIlZJRVdfSU5WRU5UT1JZX0xJU1QiLCJFRElUX0lOVkVOVE9SWSIsIlZJRVdfUFJPRFVDVFNfTElTVCIsIkVESVRfUFJPRFVDVFMiLCJWSUVXX1NFUlZJQ0VTX0xJU1QiLCJFRElUX1NFUlZJQ0VTIiwiRURJVF9ST0xFUyIsIlZJRVdfQ1VTVE9NRVJTX0xJU1QiLCJFRElUX0NVU1RPTUVSU19ERVRBSUxTIiwiVklFV19BUkNISVRFQ1RTX0xJU1QiLCJFRElUX0FSQ0hJVEVDVFMiLCJFRElUX0FSQ0hJVEVDVF9ET0NVTUVOVFMiLCJWSUVXX1NFTExJTkdfT1JERVJTX0xJU1QiLCJWSUVXX1NFTExJTkdfT1JERVJfREVUQUlMUyIsIlZJRVdfUFJPRFVDVF9DT1NUIiwiRURJVF9TRUxMSU5HX09SREVSX0RPQ1VNRU5UUyIsIkVESVRfQ1VTVE9NRVJfRE9DVU1FTlRTIiwiVklFV19VU0VSU19MSVNUIiwiRURJVF9VU0VSUyIsIlZJRVdfUk9MRVNfTElTVCJdLCJkb2N1bWVudHMiOlsiNTlzYzJiaDlmeGZ3ZmhmN2JkbTdyMnJwZnciLCI5d3RqdG10Nzdid3c4OTl4YmRtOWEzemVwaiJdLCJxdWVyaWVzIjpbInZjdXV3MndxNTd3dzZrenhiZG05Z3p4aGF3IiwiOWM2amV5Z2pwYjJlZ2t6emJkbTlnenhoYXciLCJxendoajZmcXJzNnd1a3oyYmRtOWd6eGhhdyJdLCJuYmYiOjE1OTIwMDQzODksImV4cCI6MTU5MjAwNzk4OSwiaXNzIjoidmFyZWpvZmFjaWwudGsiLCJhdWQiOiJodHRwczovL3ZhcmVqb2ZhY2lsLnRrLyJ9.959KKFcsMZDY_QOq2ljwDJEH2zznRIKpFwptgpEbmdI';
    const jwtDecoder = new JwtHelperService();
    const data = jwtDecoder.decodeToken(token);

    const user = {};

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

        user[key.propertyName] = finalValue;
    }

    return user;
}