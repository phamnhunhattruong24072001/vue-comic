import comicService from "@/services/api/comic.service";
import { formatDate } from '@/helpers/index';

export default {
    getData: async ({commit}) => {
        try {
            const response = await comicService.getDataHomePage();
            const comic_new = response.comic_new;
            const comic_coming_soon = response.comic_coming_soon
            comic_new.forEach(item => {
                item.chapter_latest.created_at = formatDate(item.created_at)
            });
            comic_coming_soon.forEach(item => {
                item.chapter_latest.created_at = formatDate(item.created_at)
            });
            commit('setComicNew', comic_new)
            commit('setComicCommingSoon', comic_coming_soon)
        } catch (error) {
            console.log(error)
        }
    }
}