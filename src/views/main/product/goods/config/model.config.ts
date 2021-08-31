import { IFormItem, IForm } from '@/base-ui/form'
const formItems: IFormItem[] = [
  {
    field: 'name',
    type: 'input',
    label: '商品名称',
    placeholder: '请输入商品名称'
  },
  {
    field: 'desc',
    type: 'input',
    label: '商品描述',
    placeholder: '请输入商品描述'
  },
  {
    field: 'oldPrice',
    type: 'input',
    label: '原价格',
    placeholder: '请输入原价格'
  },
  {
    field: 'newPrice',
    type: 'input',
    label: '现价格',
    placeholder: '请输入现价格'
  },
  {
    field: 'imgUrl',
    type: 'input',
    label: '商品图片',
    placeholder: '请输入商品图片'
  },
  {
    field: 'status',
    type: 'select',
    label: '商品状态',
    placeholder: '请选择商品状态',
    options: [
      { title:'上架', value: 1 },
      { title:'已下架', value: 0 }
    ]
  },
  {
    field: 'categoryId',
    type: 'select',
    label: '商品分类',
    placeholder: '请选择商品分类',
    options: [] // 动态查询到的数据
  },
  {
    field: 'saleCount',
    type: 'input',
    label: '商品售量',
    placeholder: '请输入商品售量'
  },
  {
    field: 'inventoryCount',
    type: 'input',
    label: '商品库存',
    placeholder: '请输入商品库存'
  },
  {
    field: 'favorCount',
    type: 'input',
    label: '收藏数',
    placeholder: '请输入收藏数'
  },
  {
    field: 'address',
    type: 'select',
    label: '发货地址',
    placeholder: '请选择发货地址',
    options: [
      { title:'北京', value: 0 },
      { title:'上海', value: 1 },
      { title:'广州', value: 2 },
      { title:'深圳', value: 3 },
      { title:'昆明', value: 4 },
      { title:'贵阳', value: 5 },
      { title:'成都', value: 6 },
      { title:'兰州', value: 7 },
      { title:'西安', value: 8 }
    ] // 动态查询到的数据
  }
]

export const modelConfig: IForm = {
  formItems,
  colLayout: { span: 24 },
  labelWidth: '90px',
  itemStyle: {
    padding: '8px'
  }
}
