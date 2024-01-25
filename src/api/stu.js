import { request} from 'umi';
export const stuGet = () => {
    return request('/category/stu',{
        method:"GET"
    })
}