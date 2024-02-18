import { request} from 'umi';

export const bannerAdd = (bannerObj)=>{ // 新增轮播
    return request('/classes/cakeBanner',{
        method:"POST",
        data:bannerObj
    });
}