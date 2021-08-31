// 存放公共的类型约束
// 接口返回数据类型
export interface IDataType<T = any> {
  code: number,
  data: T
}
