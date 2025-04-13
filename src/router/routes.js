
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [      
      {
        path: '/Repartidores',
        component: () => import('pages/Repartidores.vue')
      },
      {
        path: '/Usuarios',
        component: () => import('pages/Usuarios.vue')
      },
      {
        path: '/Rutas',
        component: () => import('pages/Rutas.vue')
      },
      {
        path: '/NewReparacion',
        component: () => import('pages/NewReparacion.vue')
      },
      {
        path: '/Reparaciones/:idCamioneta?',
        component: () => import('pages/Reparacion.vue')
      },
      {
        path: '/Camionetas',
        component: () => import('pages/Camionetas.vue')
      },
      {
        path: '/Recepcion',
        component: () => import('src/pages/RecepciondePan.vue')
      },
      {
        path: '/ReporteRutasDiario',
        component: () => import('src/pages/Reportes/ReporteRutasDiario.vue')
      },
      {
        path: '/Salidas',
        component: () => import('src/pages/SalidaPan.vue')
      },
      {
        path: '/Panes',
        component: () => import('src/pages/PanesPage.vue')
      },
      {
        path: '/PagoComision/:idRuta?',
        component: () => import('src/pages/PagosARutas.vue')
      },
      {
        path: '/Home',
        component: () => import('pages/Index.vue')
      },
      {
        path: '/Gastos',
        component: () => import('pages/GastosGenerales.vue')
      },
      {
        path: '/ReporteSemanal',
        component: () => import('src/pages/PagosARutas.vue')
      },
      
      {
        path: '',
        component: () => import('pages/Index.vue')
      },
    ]
  },
  {
    path: '/paraFatima',
    component: () => import('src/pages/Test.vue')
  },
  
  {
    path: '/Login',
    component: () => import('pages/Home.vue')
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
