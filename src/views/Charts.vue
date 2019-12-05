<template>
  <div class="charts">
    <div class="container">
      <ul class="charts-category">
        <li @click.prevent="status = 'new'"
            :class="{'btn-active': status === 'new'}">
          新歌
        </li>
        <li @click.prevent="status = 'single'"
            :class="{'btn-active': status === 'single'}">
          單曲
        </li>
        <li @click.prevent="status = 'ktv'"
            :class="{'btn-active': status === 'ktv'}">
          錢櫃
        </li>
      </ul>
      <hr>
      <div class="charts-group" v-for="chart in returnChartsNew" :key="chart.id"
           :class="{'display-block': status === 'new'}">
        <div class="charts-header">
          <div class="charts-title">
            <h2>{{ chart.title }}</h2>
            <p v-if="chart.title === '綜合新歌即時榜'">每小時更新</p>
            <p v-if="chart.title !== '綜合新歌即時榜'">{{ getDate }}</p>
          </div>
          <button @click.prevent="transferChartId(chart.id, 'playlist', true)">
            <i class="fas fa-play"></i>
          </button>
        </div>
        <div class="charts-body">
          <div class="charts-top1to5">
            <div class="charts-item" v-for="num in returnFive" :key="num">
              <span>{{ num + 1 }}</span>
              <img :src="chart.data[num].album.images[0].url" height="80" width="80">
              <div class="charts-content">
                <h2>{{ chart.data[num].name }}</h2>
                <p>{{ chart.data[num].album.artist.name }}</p>
              </div>
            </div>
          </div>
          <div class="charts-top6to10">
            <div class="charts-item" v-for="num in returnTen" :key="num">
              <span :class="{'margin-fix': num === 9}">{{ num + 1 }}</span>
              <img :class="{'margin-fix': num === 9}"
                   :src="chart.data[num].album.images[0].url" height="80" width="80">
              <div class="charts-content">
                <h2>{{ chart.data[num].name }}</h2>
                <p>{{ chart.data[num].album.artist.name }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="charts-group" v-for="chart in returnChartsSingle" :key="chart.id"
           :class="{'display-block': status === 'single'}">
        <div class="charts-header">
          <div class="charts-title">
            <h2>{{ chart.title }}</h2>
            <p>{{ getDate }}</p>
          </div>
          <button @click.prevent="transferChartId(chart.id, 'playlist', true)">
            <i class="fas fa-play"></i>
          </button>
        </div>
        <div class="charts-body">
          <div class="charts-top1to5">
            <div class="charts-item" v-for="num in returnFive" :key="num">
              <span>{{ num + 1 }}</span>
              <img :src="chart.data[num].album.images[0].url" height="80" width="80">
              <div class="charts-content">
                <h2>{{ chart.data[num].name }}</h2>
                <p>{{ chart.data[num].album.artist.name }}</p>
              </div>
            </div>
          </div>
          <div class="charts-top6to10">
            <div class="charts-item" v-for="num in returnTen" :key="num">
              <span :class="{'margin-fix': num === 9}">{{ num + 1 }}</span>
              <img :class="{'margin-fix': num === 9}"
                     :src="chart.data[num].album.images[0].url" height="80" width="80">
              <div class="charts-content">
                <h2>{{ chart.data[num].name }}</h2>
                <p>{{ chart.data[num].album.artist.name }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="charts-group" v-for="chart in returnChartsKTV" :key="chart.id"
           :class="{'display-block': status === 'ktv'}">
        <div class="charts-header">
          <div class="charts-title">
            <h2>{{ chart.title }}</h2>
            <p>{{ getDate }}</p>
          </div>
          <button @click.prevent="transferChartId(chart.id, 'playlist', true)">
            <i class="fas fa-play"></i>
          </button>
        </div>
        <div class="charts-body">
          <div class="charts-top1to5">
            <div class="charts-item" v-for="num in returnFive" :key="num">
              <span>{{ num + 1 }}</span>
              <img :src="chart.data[num].album.images[0].url" height="80" width="80">
              <div class="charts-content">
                <h2>{{ chart.data[num].name }}</h2>
                <p>{{ chart.data[num].album.artist.name }}</p>
              </div>
            </div>
          </div>
          <div class="charts-top6to10">
            <div class="charts-item" v-for="num in returnTen" :key="num">
              <span :class="{'margin-fix': num === 9}">{{ num + 1 }}</span>
              <img :class="{'margin-fix': num === 9}"
                   :src="chart.data[num].album.images[0].url" height="80" width="80">
              <div class="charts-content">
                <h2>{{ chart.data[num].name }}</h2>
                <p>{{ chart.data[num].album.artist.name }}</p>
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
  name: 'Home',
  data() {
    return {
      status: 'new',
    };
  },
  methods: {
    transferChartId(id, type, auto) {
      this.$store.commit('WIDGET', {
        id,
        type,
        auto,
      });
    },
    addZero(num) {
      if (num < 10) {
        return `0${num}`;
      }
      return num;
    },
  },
  computed: {
    ...mapGetters(['returnFive', 'returnTen', 'returnChartsNew', 'returnChartsSingle', 'returnChartsKTV']),
    getDate() {
      const date = new Date();
      // console.log(`${date.getUTCFullYear} / ${date.getMonth} / ${date.getDate}`);
      return `${date.getUTCFullYear()}/${this.addZero(date.getMonth())}/${this.addZero(date.getDate())}`;
    },
  },
};
</script>
