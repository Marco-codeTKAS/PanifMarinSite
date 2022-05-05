
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
        path: '/Camionetas',
        component: () => import('pages/Camionetas.vue')
      },
      {
        path: '/Salidas',
        component: () => import('pages/SalidasdePan.vue')
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
