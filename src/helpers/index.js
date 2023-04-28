import moment from "moment";

export function formatDate(date)
{
    return moment(date).locale("vi").fromNow(true);
}

export function formatImage(image)
{
    if (!image) {
        return 'https://cdn.landesa.org/wp-content/uploads/default-user-image.png';
    } else {
        return image
    }
}

export function checkLogin()
{
    if(localStorage.getItem('user')) {
        return true;
    }
    return false;
}

export function userLogin()
{
    if(localStorage.getItem('user')) {
        return JSON.parse(localStorage.getItem('user'));
    }
    return [];
}