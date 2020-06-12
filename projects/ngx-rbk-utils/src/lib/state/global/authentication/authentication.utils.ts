// import { JwtHelperService } from '@auth0/angular-jwt';
// import { MenuItem } from 'primeng';

// export function generateUserData(token: string, menu: MenuItem[]): User {
//   const jwtDecoder = new JwtHelperService();
//   const data = jwtDecoder.decodeToken(token);

//   return {
//     employee: {
//       id: data['employeeId'],
//       name: data['employeeName']
//     },
//     position: {
//       id: data['positionId'],
//       name: data['positionName']
//     },
//     shop: {
//       id: data['shopId'],
//       name: data['shopName']    },
//     roles: data['roles'],
//     username: data['sub'],
//     data: {
//       menu: menu
//     }
//   };
// }