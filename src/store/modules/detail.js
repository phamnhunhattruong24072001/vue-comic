import pageApi from '@/api/page';
import router from '@/router';

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
        showChapter: true,
        commentTotal: 0,
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
            state.commentTotal = payload.commentTotal;
        },
        setShowChapter(state, payload) {
            state.showChapter = payload.showChapter;
        }
    },
    actions: {
        getData: async({commit}, slug) => {
            try {
                const response = await pageApi.getDataDetailPage(slug);
                if(response.data.code == 200) {
                    const comic = response.data.data.comic;
                    const chapters = comic.chapters;
                    
                    const minKey = Math.min(...chapters.keys());
                    const maxKey = Math.max(...chapters.keys());
                    
                    if(comic.status != 2) {
                        commit('setShowChapter', {
                            showChapter: false,
                        });
                    }
    
                    commit('setData', {
                        comic,
                        chapters,
                        figures: comic.figures,
                        genres: comic.genres,
                        country: comic.country,
                        category: comic.category,
                        newChapter: chapters[minKey],
                        latestChapter: chapters[maxKey],
                        commentTotal: response.data.data.commentTotal
                    });
                }else{
                    router.push({name: 'home'})
                }
            } catch (error) {
                console.log(error)
            }
        },
    },
}