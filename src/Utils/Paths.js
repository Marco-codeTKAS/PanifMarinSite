export const paths = [
  {
    name: 'Entregas',
    linkActivo: 'home',
    ref: 'itemEntregas',
    to: '',
    isParent: true,
    rolsWithPermision: [2,1,3],
    icon: 'pin_drop',
    children: [
      { name: 'Carga', linkSubMenu: 'Salidas', rolsWithPermision: [2, 1,3], ref: 'itemSalidas', to: '/Salidas', icon: 'inventory' },
      { name: 'Recepcion', linkSubMenu: 'Recepcion', rolsWithPermision: [2, 1,3], ref: 'itemRecepcion', to: '/Recepcion', icon: 'assignment' },
      { name: 'GastosGrales', linkSubMenu: 'GastosGrales', rolsWithPermision: [2,1,3], ref: 'itemGastosGrales', to: '/Gastos', icon: 'payment' },
      // { name: 'Recibo Dinero', linkSubMenu: 'Recibo', rolsWithPermision:[1], ref: 'itemRecibo', to: '/Recibo', icon: 'payment' },

      
    ]
  },
  {
    name: 'Reportes',
    linkActivo: 'reportes',
    ref: 'itemReportes',
    to: '',
    isParent: true,
    rolsWithPermision: [1,2],
    icon: 'text_snippet',
    children: [
      { name: 'Diario', linkSubMenu: 'ReporteRutasDiario', rolsWithPermision: [1,2], ref: 'itemReporteDiario', to: '/ReporteRutasDiario', icon: 'bar_chart' },
    ]
  },
  {
    name: 'Camionetas',
    linkActivo: 'camionetas',
    ref: 'itemCamionetas',
    to: '',
    isParent: true,
    rolsWithPermision: [1,2, 4],
    icon: 'local_shipping',
    children: [
      { name: 'Camionetas', linkSubMenu: 'Camionetas', rolsWithPermision: [1, 4], ref: 'itemCamionetas', to: '/Camionetas', icon: 'local_shipping' },
      { name: 'Reparaciones', linkSubMenu: 'Reparaciones', rolsWithPermision: [1, 4], ref: 'itemReparaciones', to: '/Reparaciones', icon: 'key' }
    ]
  },
  {
    name: 'Empresa',
    linkActivo: 'Empresa',
    ref: 'itemEmpresa',
    to: '',
    isParent: true,
    rolsWithPermision: [1,2],
    icon: 'settings',
    children: [
      { name: 'Usuarios', linkSubMenu: 'Usuarios', rolsWithPermision: [1], ref: 'itemUsuario', to: '/Usuarios', icon: 'person' },
      { name: 'Rutas', linkSubMenu: 'Rutas', ref: 'itemRutas', rolsWithPermision: [1], to: '/Rutas', icon: 'map' },
      { name: 'Panes', linkSubMenu: 'Panes', ref: 'itemPanes', rolsWithPermision: [1,2], to: '/Panes', icon: 'inventory' },
    ]
  }

]

