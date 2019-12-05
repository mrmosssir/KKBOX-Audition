import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import qs from 'querystring';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    zeroTofour: [0, 1, 2, 3, 4],
    fiveToten: [5, 6, 7, 8, 9],
    token: '',
    charts: [],
    chartsNew: [],
    chartsSingle: [],
    chartsKTV: [],
    chartsInfo: [],
    releasesCategory: [],
    releasesGroup: [],
    search: [],
    loading: false,
    widget: {
      id: 'LZPhK2EyYzN15dU-PT',
      type: 'playlist',
      auto: false,
    },
  },
  actions: {
    init(context) {
      context.commit('LOADING', true);
      const config = {
        headers: {
          Accept: 'application/x-www-form-urlencoded',
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      };
      const oauth = {
        grant_type: 'client_credentials',
        client_id: '8afffb410fe1c9388565fe00c9429cb6',
        client_secret: '122b64ea1a6079b2dd93479406a9b715',
      };
      axios.post(`${process.env.VUE_APP_CORS}/${process.env.VUE_APP_TOKENPATH}`, qs.stringify(oauth), config)
        .then((Response) => {
          if (Response.status === 200) {
            context.commit('TOKEN', {
              token_type: Response.data.token_type,
              access_token: Response.data.access_token,
            });
            context.dispatch('getCharts');
            context.dispatch('getReleases');
            context.dispatch('getReleasesGroup', 'KrdH2LdyUKS8z2aoxX');
          }
        });
    },
    getCharts(context) {
      const config = {
        headers: {
          Authorization: context.state.token,
        },
      };
      axios.get(`${process.env.VUE_APP_CORS}/${process.env.VUE_APP_APIPATH}/charts?territory=TW`, config)
        .then((Response) => {
          context.commit('CHARTS', Response.data.data);
          this.state.charts.forEach((chart) => {
            axios.get(`${process.env.VUE_APP_CORS}/${process.env.VUE_APP_APIPATH}/charts/${chart.id}?territory=TW`, config)
              .then((res) => {
                context.commit('CHARTSINFO', res);
              });
          });
        });
    },
    getReleases(context) {
      const config = {
        headers: {
          Authorization: context.state.token,
        },
      };
      if (this.state.token !== '') {
        axios.get(`${process.env.VUE_APP_CORS}/${process.env.VUE_APP_APIPATH}/new-release-categories?territory=TW`, config)
          .then((Response) => {
            context.commit('RELEASES', Response.data.data);
          });
      }
    },
    getReleasesGroup(context, payload) {
      context.commit('LOADING', true);
      const config = {
        headers: {
          Authorization: context.state.token,
        },
      };
      axios.get(`${process.env.VUE_APP_CORS}/${process.env.VUE_APP_APIPATH}/new-release-categories/${payload}/albums?territory=TW&limit=500`, config)
        .then((Response) => {
          context.commit('RELEASESGROUP', Response.data.data);
          context.commit('LOADING', false);
        });
    },
    getSearch(context, payload) {
      context.commit('LOADING', true);
      const config = {
        headers: {
          Authorization: context.state.token,
        },
      };
      axios.get(`${process.env.VUE_APP_CORS}/${process.env.VUE_APP_APIPATH}/search?q=${payload.content}&type=${payload.type}&territory=TW`, config)
        .then((Response) => {
          switch (payload.type) {
            case 'track':
              context.commit('SEARCH', Response.data.tracks.data);
              break;
            case 'artist':
              context.commit('SEARCH', Response.data.artists.data);
              break;
            case 'album':
              context.commit('SEARCH', Response.data.albums.data);
              break;
            default:
              break;
          }
          context.commit('LOADING', false);
        });
    },
  },
  mutations: {
    TOKEN(state, payload) {
      state.token = `${payload.token_type} ${payload.access_token}`;
    },
    CHARTS(state, payload) {
      state.charts = payload;
    },
    CHARTSINFO(state, payload) {
      state.chartsInfo.push(payload.data);
      const chartBuffer = [];
      for (let count = 0; count < 10; count += 1) {
        chartBuffer.push(payload.data.tracks.data[count]);
      }
      if (payload.data.title.indexOf('錢櫃') > -1) {
        state.chartsKTV.push({
          title: payload.data.title,
          id: payload.data.id,
          data: chartBuffer,
        });
      } else if (payload.data.title.indexOf('新') > -1) {
        state.chartsNew.push({
          title: payload.data.title,
          id: payload.data.id,
          data: chartBuffer,
        });
      } else {
        state.chartsSingle.push({
          title: payload.data.title,
          id: payload.data.id,
          data: chartBuffer,
        });
      }
    },
    RELEASES(state, payload) {
      state.releasesCategory = payload;
    },
    RELEASESGROUP(state, payload) {
      state.releasesGroup = payload;
    },
    SEARCH(state, payload) {
      state.search = payload;
    },
    LOADING(state, payload) {
      state.loading = payload;
    },
    WIDGET(state, payload) {
      state.widget.id = payload.id;
      state.widget.type = payload.type;
      state.widget.auto = payload.auto;
    },
  },
  getters: {
    returnFive(state) {
      return state.zeroTofour;
    },
    returnTen(state) {
      return state.fiveToten;
    },
    returnChartsNew(state) {
      return state.chartsNew;
    },
    returnChartsSingle(state) {
      return state.chartsSingle;
    },
    returnChartsKTV(state) {
      return state.chartsKTV;
    },
    returnReleasesCategory(state) {
      return state.releasesCategory;
    },
    returnReleasesGroup(state) {
      return state.releasesGroup;
    },
    returnSearch(state) {
      return state.search;
    },
    returnWidget(state) {
      return state.widget;
    },
    returnLoadingStatus(state) {
      return state.loading;
    },
  },
});
