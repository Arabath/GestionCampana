// export const routes = {
//   notFound: '*',
//   formZoonosis: '/SGICampana',
//   volquetes: '/SGICampana/volquetes',
//   adminLogin: '/SGICampana/admin',
//   adminZoonosis: '/SGICampana/admin/zoonosis',
//   adminZoonosisId: '/SGICampana/admin/zoonosis/:id',
//   adminPanel: '/SGICampana/admin/panel',
//   adminVolquetes: '/SGICampana/admin/volquetes',
//   adminVolquetesId: '/SGICampana/admin/volquetes/:id',
//   adminHistorico: '/SGICampana/admin/volquetes/historico',
// };
export const routes = {
  notFound: '*',
  formZoonosis: '/',

  volquetesLogin: '/volquetes/login',
  volquetesLoginReset: '/volquetes/login/reset-password',
  volquetesNewPassword: '/auth/new-password',  
  volquetesRegistration: '/volquetes/new-registration',
  volquetesUserDashboard: '/volquetes/dashboard',
  volquetesUserLocation: '/volquetes/dashboard/location',
  volquetesUserDataId: '/volquetes/dashboard/:id',

  epagosOk: '/epagos/ok',
  epagosError: '/epagos/error',
  
  discapacidad: '/discapacidad',
  adminLogin: '/admin',
  adminZoonosis: '/admin/zoonosis',
  adminZoonosisId: '/admin/zoonosis/:id',
  adminPanel: '/admin/panel',
  adminVolquetes: '/admin/volquetes',
  adminVolquetesId: '/admin/volquetes/:id',
  adminDiscapacidad: '/admin/discapacidad',
  adminDiscapacidadId: '/admin/discapacidad/:id',
  adminHistorico: '/admin/volquetes/historico',
  adminTransito: '/admin/transito'
}
