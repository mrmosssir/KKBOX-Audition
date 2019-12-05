<template>
  <div id="app" class="music-frame">
    <Loading v-if="returnLoadingStatus"/>
    <div class="menu">
      <div class="menu-content">
        <h1>
          <i class="fas fa-play"></i>
          MUSIC
        </h1>
        <ul class="menu-select">
          <li>
            <router-link to="/search">
              搜尋
            </router-link>
          </li>
          <li>
            <router-link to="/">
              排行榜
            </router-link>
          </li>
          <li>
            <router-link to="/releases">
              新發行
            </router-link>
          </li>
        </ul>
      </div>
      <div class="menu-setting">
        <i class="fas fa-cog"></i>
      </div>
    </div>
    <router-view />
    <iframe class="player"
            :src="`https://widget.kkbox.com/v1/?id=${returnWidget.id}&type=${returnWidget.type}&terr=TW&lang=TC&autoplay=${returnWidget.auto}&loop=true`"
            allow="autoplay"
            style="position: fixed; top: 0; right: 0;"/>
  </div>
</template>

<style lang="scss">
@import "./scss/style.scss";
</style>

<script>
import { mapGetters } from 'vuex';
import Loading from './components/Loading.vue';

export default {
  components: {
    Loading,
  },
  methods: {
    init() {
      this.$store.dispatch('init');
    },
  },
  computed: {
    ...mapGetters(['returnWidget', 'returnLoadingStatus']),
  },
  created() {
    this.init();
  },
};
</script>
