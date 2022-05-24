<template>
    <div>
         <q-btn
          v-if="$q.screen.lt.sm"
          flat
          dense
          round
          color="dark"
          class="q-mr-xl"
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />
          <q-drawer
              v-model="leftDrawerOpen"
              :breakpoint="700"
              elevated content-class="bg-primary" :width="200"
            >
              <q-scroll-area class="fit q-pt-none">
                <div>
                  <q-item dense active-class="text-white bg-secondary" class="q-mt-none" clickable to="Repartidores">
                    <q-item-section>
                      <q-item-label class="text-h6 q-py-md"> <q-icon name="format_list_bulleted"/> Repartidores</q-item-label>
                    </q-item-section>
                  </q-item>
                </div>
                <div>
                  <q-item dense clickable active-class="text-white bg-secondary" to="ROverview">
                    <q-item-section>
                      <q-item-label class="text-h6 q-py-md q-gutter-xs"> <q-icon name="assignment_ind " class="" /> <span>Perfil</span> </q-item-label>
                    </q-item-section>
                  </q-item>
                </div>
              </q-scroll-area>
            </q-drawer>

    </div>
</template>
<script>
export default {
  name: 'MenuMobil',
  data () {
    return {
      leftDrawerOpen: false
    }
  },
  created () {

  },
  methods: {

  }
}
</script>
