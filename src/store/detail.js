import pageApi from '@/api/page';

export default {
    namespaced: true,
    state: {
        comic: {},
        figures: {},
        chapters: {},
        newChapter: {},
        latestChapter: {},
        genres: {},
        country: {},
        category: {},
    },
    getters: {
        comic: (state) => state.comic,
        chapters: (state) => state.chapters,
        figures: (state) => state.figures,
        newChapter: (state) => state.newChapter,
        latestChapter: (state) => state.latestChapter,
        genres: (state) => state.genres,
        country: (state) => state.country,
        category: (state) => state.category,
    },
    mutations: {
        SET_COMIC(state, comic) {
            state.comic = comic;
        },
        SET_CHAPTERS(state, chapters) {
            state.chapters = chapters;
        },
        SET_FIGURES(state, figures) {
            state.figures = figures;
        },
        SET_NEW_CHAPTER(state, newChapter) {
            state.newChapter = newChapter;
        },
        SET_LATEST_CHAPTER(state, latestChapter) {
            state.latestChapter = latestChapter;
        },
        SET_GENRES(state, genres) {
            state.genres = genres;
        },
        SET_COUNTRY(state, country) {
            state.country = country;
        },
        SET_CATEGORY(state, category) {
            state.category = category;
        },
        CLEAR_DATA(state){
            state.comic = {};
            state.figures = {};
            state.chapters = {};
            state.newChapter = {};
            state.latestChapter = {};
            state.genres = {};
            state.country = {};
            state.category = {};
        }
    },
    actions: {
        getData({commit}, slug) {
            pageApi.getDataDetailPage(slug)
            .then((response) => {
                const comic = response.data.data.comic;
                const chapters = response.data.data.comic.chapters;
                const figures = response.data.data.comic.figures;
                const genres = response.data.data.comic.genres;
                const country = response.data.data.comic.country;
                const category = response.data.data.comic.category;

                figures.forEach((figure) => {
                    if (figure.character_role === 0) {
                        figure.character_role = 'Nhan vat chinh';
                    } else if (figure.character_role === 1) {
                        figure.character_role = 'Nhan vat phu'
                    } else {
                        figure.character_role = 'phan dien'
                    }
                });
                const minKey = Math.min(...chapters.keys());
                const maxKey = Math.max(...chapters.keys());
                
                commit('SET_COMIC', comic)
                commit('SET_CHAPTERS', chapters)
                commit('SET_FIGURES', figures)
                commit('SET_NEW_CHAPTER', chapters[minKey])
                commit('SET_LATEST_CHAPTER', chapters[maxKey])
                commit('SET_GENRES', genres)
                commit('SET_COUNTRY', country)
                commit('SET_CATEGORY', category)
            }).catch((error) => {
                console.log(error)
            })
        }
    },
    module: {

    }
}