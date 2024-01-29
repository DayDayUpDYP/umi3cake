import mockjs from 'mockjs'
let dataList = mockjs.mock({
    code:200,
    msg:"学员列表加载成功",
    'data|100':[
        {
            id:"@id",
            name:"@cname",
            score:'@integer(50,100)',
            city:"@city",
            time:"@date"
        }
    ]
});
export default {
    'GET /category/list':{
        username:'dyp',
        score:1000
    },
    'GET /category/stu':dataList,
    'DELETE /category/stu':(req:any, res:any) => {
        console.log(req.query);
        let {id} = req.query
        for(let i = 0; i<dataList.data.length;i++){
            if(dataList.data[i].id === id){
                dataList.data.splice(i,1);
                res.send({
                    code:200,
                    msg:'删除成功'
                })
                return;
            }
            res.send({
                code:201,
                msg:'未找到数据'
            })
        }
    }
}