import { defineStore } from "pinia";
import { useCartStore } from '@/stores/cartStore';
import { mergeCartAPI } from "@/apis/cart";
import { ref } from "vue";
import { loginAPI } from '@/apis/user';

export const userStore = defineStore('user', () => {
  const cartStore = useCartStore()
  const userInfo = ref({})

  const getUserInfo = async ({ account, password }) => {
    const res = await loginAPI({ account, password })
    userInfo.value = res.result
    await mergeCartAPI(cartStore.cartList.map(item => {
      return {
        skuId: item.skuId,
        selected: item.selected,
        count: item.count
      }
    }))
    await cartStore.updataNewList()
  }

  const clearUserInfo = () => {
    userInfo.value = {}
    cartStore.clearCart()
  }
  return { userInfo, getUserInfo, clearUserInfo }
}, {
  persist: true,
}
)