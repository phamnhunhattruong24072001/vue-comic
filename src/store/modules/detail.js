import pageApi from '@/api/page';

const getDefaultState = () => {
    return {
        comic: [],
        figures: [],
        chapters: [],
        newChapter: [],
        latestChapter: [],
        genres: [],
        country: [],
        category: [],
    }
  }

export default {
    namespaced: true,
    state: getDefaultState,
    getters: {
        figures: (state) => {
            if(Object.keys(state.figures).length === 0) return [];
            
            const setFigures = state.figures
            setFigures.forEach((item) => {
                if (item.character_role === 0) {
                    item.character_role = 'Nhân vật chính';
                } else if (item.character_role === 1) {
                    item.character_role = 'Nhân vật phụ';
                } else {
                    item.character_role = 'Phản diện';
                }
            })
            return state.figures = setFigures;
        }
    },
    mutations: {
        setData(state, payload) {
            state.comic = payload.comic;
            state.figures = payload.figures;
            state.chapters = payload.chapters;
            state.newChapter = payload.newChapter;
            state.latestChapter = payload.latestChapter;
            state.genres = payload.genres;
            state.country = payload.country;
            state.category = payload.category;
        },
        resetState (state) {
            Object.assign(state, getDefaultState())
        }
    },
    actions: {
        getData: async({commit}, slug) => {
            await pageApi.getDataDetailPage(slug)
            .then((response) => {
                const comic = response.data.data.comic;
                const chapters = comic.chapters;

                const minKey = Math.min(...chapters.keys());
                const maxKey = Math.max(...chapters.keys());
                
                commit('setData', {
                    comic,
                    chapters,
                    figures: comic.figures,
                    genres: comic.genres,
                    country: comic.country,
                    category: comic.category,
                    newChapter: chapters[minKey],
                    latestChapter: chapters[maxKey],
                })
            }).catch((error) => {
                console.log(error)
            })
        },
        resetData: ({commit}) => {
            commit('resetState')
        }
    },
    module: {

    }
}