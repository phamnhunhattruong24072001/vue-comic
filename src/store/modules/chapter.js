import pageApi from '@/api/page';
import router from '@/router';

const getDefaultState = () => {
    return {
        chapter_detail: {},
        comic: {},
        images: [],
        preChapter: {},
        nextChapter: {},
    }
}

export default {
    namespaced: true,
    state: getDefaultState,
    getters: {

    },
    mutations: {
        setData(state, payload) {
            state.comic = payload.comic;
            state.chapter_detail = payload.chapter_detail;
            state.images = payload.images;
            state.preChapter = payload.preChapter;
            state.nextChapter = payload.nextChapter;
        },
    },
    actions: {
        getData: async ({ commit } , { slugComic, slugChapter }) => {
            await pageApi.getChapter(slugComic, slugChapter)
            .then((response) => {
                if(response.data.code == 200) {
                    const images = JSON.parse(response.data.data.chapter.content_image)
                    commit('setData', {
                        chapter_detail: response.data.data.chapter,
                        comic: response.data.data.comic,
                        images: images,
                        preChapter: response.data.data.preChapter,
                        nextChapter: response.data.data.nextChapter,
                    })
                }else{
                    router.push({name: 'home'})
                }
            })
            .catch((error) => {
                console.log(error);
            })
        }
    }
}