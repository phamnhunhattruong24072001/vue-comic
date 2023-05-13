import comicService from "@/services/api/comic.service";
// import router from '@/router';

export default {
    getData: async ({ commit } , { slugComic, slugChapter }) => {
        try {
            const response = await comicService.getChapter(slugComic, slugChapter);
            const images = JSON.parse(response.chapter.content_image);
            commit('setData', {
                chapter_detail: response.chapter,
                comic: response.comic,
                images: images,
                preChapter: response.preChapter,
                nextChapter: response.nextChapter,
            });
        } catch (error) {
            console.log(error);
        }
    }
}