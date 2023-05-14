import comicService from "@/services/api/comic.service";
// import router from '@/router';

export default {
    getData: async({commit}, slug) => {
        try {
            const response = await comicService.getDataDetailPage(slug);
            const comic = response.comic;
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
                commentTotal: response.commentTotal
            });
        } catch (error) {
            console.log(error)
        }
    },
}