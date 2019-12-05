<template>
  <div class="search">
    <div class="container">
      <div class="search-bar">
        <input type="text" placeholder="請輸入要查詢的內容" v-model="searchContent">
        <select v-model="select">
          <option value="track">歌曲</option>
          <option value="artist">創作者</option>
          <option value="album">專輯</option>
        </select>
        <button @click.prevent="getSearch(searchContent, select)">
          <i class="fas fa-search"></i>
        </button>
      </div>
      <div class="search-body" v-if="modeSwitch !== ''">
        <h2>搜尋結果 -
          <span v-if="modeSwitch === 'track'"> 歌曲 - {{ returnSearch.length }} 項結果</span>
          <span v-if="modeSwitch === 'artist'"> 創作者 {{ returnSearch.length }} 項結果</span>
          <span v-if="modeSwitch === 'album'"> 專輯 {{ returnSearch.length }} 項結果</span>
        </h2>
        <div class="search-track" v-if="modeSwitch === 'track'
                                        && returnSearch.length > 0
                                        && !returnLoadingStatus">
          <div class="search-item" v-for="item in returnSearch" :key="item.album.id">
            <div class="search-info">
              <div class="search-link">
                <img :src="item.album.images[0].url" height="80" width="80">
                <div class="play-mask-80"
                     @click.prevent="changeWidget(item.album.id, 'album', true)">
                  <div class="play-mask-icon">
                    <i class="far fa-play-circle"></i>
                  </div>
                </div>
              </div>
              <div class="search-content">
                <h3>{{ item.name }}</h3>
                <p>{{ item.album.artist.name }} - {{ item.album.name }}</p>
              </div>
            </div>
            <p class="durTime">
              <i class="far fa-clock"></i> {{ transferTime(item.duration) }}
            </p>
          </div>
        </div>
        <div class="search-artist" v-if="modeSwitch === 'artist'
                                         && returnSearch.length > 0
                                         && !returnLoadingStatus">
          <div class="search-item" v-for="item in returnSearch" :key="item.id">
            <div class="search-info">
              <a :href="item.url" target="_blank">
                <div class="search-link">
                  <img :src="item.images[0].url" height="80" width="80">
                  <div class="play-mask-80">
                    <div class="play-mask-icon">
                      <i class="far fa-play-circle"></i>
                    </div>
                  </div>
                </div>
              </a>
              <div class="search-content">
                <h3>{{ item.name }}</h3>
              </div>
            </div>
          </div>
        </div>
        <div class="search-album" v-if="modeSwitch === 'album'
                                        && returnSearch.length > 0
                                        && !returnLoadingStatus">
          <div class="search-item" v-for="item in returnSearch" :key="item.id">
            <div class="search-info">
              <div class="search-link">
                <img :src="item.images[0].url" height="80" width="80">
                <div class="play-mask-80" @click.prevent="changeWidget(item.id, 'album', true)">
                  <div class="play-mask-icon">
                    <i class="far fa-play-circle"></i>
                  </div>
                </div>
              </div>
              <div class="search-content">
                <h3>{{ item.name }}</h3>
                <p>{{ item.artist.name }} - {{ item.name }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'Search',
  data() {
    return {
      searchContent: '',
      select: 'track',
      modeSwitch: '',
    };
  },
  methods: {
    getSearch(content, type) {
      if (this.searchContent !== '') {
        this.modeSwitch = this.select;
        this.$store.dispatch('getSearch', {
          content,
          type,
        });
      }
    },
    changeWidget(id, type, auto) {
      this.$store.commit('WIDGET', {
        id,
        type,
        auto,
      });
    },
    transferTime(time) {
      const timeResult = `${this.addZero(Math.floor(Math.floor(time / 1000) / 60))}:${this.addZero(Math.floor(time / 1000) % 60)}`;
      return timeResult;
    },
    addZero(num) {
      if (num < 10) {
        return `0${num}`;
      }
      return num;
    },
  },
  computed: {
    ...mapGetters(['returnSearch', 'returnLoadingStatus']),
  },
};
</script>
