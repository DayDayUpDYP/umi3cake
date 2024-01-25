import mockjs from 'mockjs'
export default {
    'GET /category/list':{
        username:'dyp',
        score:1000
    },
    'GET /category/stu':mockjs.mock({
        code:200,
        msg:"学员列表加载成功",
        'data|100':[
            {
                name:"@cname",
                score:'@integer(50,100)',
                city:"@city",
                time:"@date"
            }
        ]
    })
}