import { request} from 'umi';
export const stuGet = () => {
    return request('/category/stu',{
        method:"GET"
    })
}
export const stuDel = (idx) => {
    return request(`/category/stu?id=${idx}`,{
        method:"DELETE"
    })
}