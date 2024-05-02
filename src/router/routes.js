
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/Index.vue')
      },
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
        path: '/ROverview',
        component: () => import('src/pages/RepartidorOverview.vue')
      }
    ]
  },
  {
    path: '/Home',
    component: () => import('pages/Home.vue')
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
