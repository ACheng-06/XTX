import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { userStore } from "./userStore";
import { insertCartAPI, findNewCartListAPI, delCartAPI } from "@/apis/cart";

export const useCartStore = defineStore('cart', () => {
  const getuserStore = userStore()
  const isLogin = computed(() => getuserStore.userInfo.token)
  const cartList = ref([])

  const updataNewList = async () => {
    const res = await findNewCartListAPI()
    cartList.value = res.result
  }

  const addCart = async (goods) => {
    const { skuId, count } = goods
    if (isLogin.value) {
      await insertCartAPI({ skuId, count })
      await updataNewList()
    } else {
      const item = cartList.value.find((item) => goods.skuId === item.skuId)
      if (item) {
        // 找到了
        item.count += goods.count

      } else {
        // 没找到
        cartList.value.push(goods)
      }
    }
  }

  const delCart = async (skuId) => {
    if (isLogin.value) {
      // 调用接口实现接口购物车中的删除功能
      await delCartAPI([skuId])
      await updataNewList()
    } else {
      // 思路：
      // 1. 找到要删除项的下标值 - splice
      // 2. 使用数组的过滤方法 - filter
      const idx = cartList.value.findIndex((item) => skuId === item.skuId)
      cartList.value.splice(idx, 1)
    }
  }

  const singleCheck = (skuId, selected) => {
    const item = cartList.value.find((item) => item.skuId === skuId)
    item.selected = selected
  }

  const allCheck = (selected) => {
    // 把cartList中的每一项的selected都设置为当前的全选框状态
    cartList.value.forEach(item => item.selected = selected)
  }

  const isAll = computed(() => cartList.value.every((item) => item.selected))

  const allCount = computed(() => cartList.value.reduce((a, c) => a + c.count, 0))
  const allPrice = computed(() => cartList.value.reduce((a, c) => a + c.count * c.price, 0))

  const selectedCount = computed(() => cartList.value.filter(item => item.selected).reduce((a, c) => a + c.count, 0))
  const selectedPrice = computed(() => cartList.value.filter(item => item.selected).reduce((a, c) => a + c.count * c.price, 0))

  const clearCart = () => {
    cartList.value = []
  }

  return { cartList, addCart, delCart, allCount, allPrice, singleCheck, isAll, allCheck, selectedCount, selectedPrice, clearCart, updataNewList }
}, {
  persist: true,
})