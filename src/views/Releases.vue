<template>
  <div class="releases">
    <div class="container">
      <ul class="releases-category" style="word-break: break-all;">
        <li v-for="category in returnReleasesCategory" :key="category.id"
            @click.prevent="getReleasesGroup(category.id, category.title)"
            :class="{'btn-active': category.title === status}">
          {{ category.title }}
        </li>
      </ul>
      <hr>
      <div class="releases-group">
        <div class="releases-item" v-for="item in returnReleasesGroup" :key="item.id">
          <div class="releases-link">
            <img :src="item.images[0].url" height="160" width="160">
            <div class="play-mask-160" @click.prevent="changeWidget(item.id, 'album', true)">
              <div class="play-mask-icon">
                <i class="far fa-play-circle"></i>
              </div>
            </div>
          </div>
          <h3>{{ item.name }}</h3>
          <div class="releases-artist">
            <img :src="item.artist.images[0].url" height="35" width="35">
            <p class="artist-name">item.artist.name</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'Releases',
  data() {
    return {
      status: '綜合',
    };
  },
  methods: {
    getReleasesGroup(id, status) {
      this.status = status;
      this.$store.dispatch('getReleasesGroup', id);
    },
    changeWidget(id, type, auto) {
      this.$store.commit('WIDGET', {
        id,
        type,
        auto,
      });
    },
  },
  computed: {
    ...mapGetters(['returnReleasesCategory', 'returnReleasesGroup']),
  },
};
</script>
