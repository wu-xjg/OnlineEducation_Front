import request from '@/utils/request'
export default{

    getOrderList() {
        return request({
            url: '/eduorder/order',
            method: 'get'
        })
    },
   
        pageOrderCondition(current,limit,orderQuery){
            return request({
                //url: '/table/list/'+current+"/"+limit,
                url: `/eduorder/order/pageOrderCondition/${current}/${limit}`,
                method: 'post',
                //data表示把对象转化为json进行传递到接口
                data: orderQuery
              })
        },
}