export const paths = [
  {
    name: 'Entregas',
    linkActivo: 'home',
    ref: 'itemEntregas',
    to: '',
    isParent: true,
    rolsWithPermision: [],
    icon: 'pin_drop',
    children: [
      { name: 'Carga', linkSubMenu: 'Salidas', rolsWithPermision: [2, 1], ref: 'itemSalidas', to: '/Salidas', icon: 'inventory' },
      { name: 'Recepcion', linkSubMenu: 'Recepcion', rolsWithPermision: [2, 1], ref: 'itemRecepcion', to: '/Recepcion', icon: 'assignment' },
      { name: 'Pagos Comisiones', linkSubMenu: 'Pagos', rolsWithPermision:[  1], ref: 'itemPagoComision', to: '/PagoComision', icon: 'payment' },
      // { name: 'Repartidores', linkSubMenu: 'Repartidores', rolsWithPermision: [2], ref: 'itemRepartidores', to: '/Repartidores', icon: 'local_shipping' },
      { name: 'Rutas', linkSubMenu: 'Rutas', ref: 'itemRutas', rolsWithPermision: [2], to: '/Rutas', icon: 'map' },
    ]
  },
  // {
  //   name: 'Camionetas',
  //   linkActivo: 'camionetas',
  //   ref: 'itemCamionetas',
  //   to: '',
  //   isParent: true,
  //   rolsWithPermision: [2, 4],
  //   icon: 'local_shipping',
  //   children: [
  //     { name: 'Camionetas', linkSubMenu: 'Camionetas', rolsWithPermision: [2, 4], ref: 'itemCamionetas', to: '/Camionetas', icon: 'local_shipping' },
  //     { name: 'Reparaciones', linkSubMenu: 'Reparaciones', rolsWithPermision: [2, 4], ref: 'itemReparaciones', to: '/Reparaciones', icon: 'key' }
  //   ]
  // },
  // {
  //   name: 'Usuarios',
  //   linkActivo: 'usuarios',
  //   ref: 'itemUsuarios',
  //   to: '',
  //   isParent: true,
  //   rolsWithPermision: [2],
  //   icon: 'person',
  //   children: [
  //     { name: 'Usuario', linkSubMenu: 'Usuario', rolsWithPermision: [2, 4], ref: 'itemUsuario', to: '/Usuario', icon: 'person_outlined' }
  //   ]
  // }

]
