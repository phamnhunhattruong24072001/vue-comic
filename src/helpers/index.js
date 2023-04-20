import moment from "moment";

export function formatDate(date)
{
    return moment(date).locale("vi").fromNow(true);
}