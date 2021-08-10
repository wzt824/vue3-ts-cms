import axios, { AxiosResponse } from 'axios'

axios.request({
  method: 'get',
  url: 'http://poetry.apiopen.top/poetryFull?count=2&page=1'
}).then((res: AxiosResponse<any>) => {
  console.log(res.data)
})
