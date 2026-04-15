import { getBannerAPI } from '@/apis/hoom';
import { ref, onMounted } from 'vue'

export function useBanner() {
  const bannerList = ref([])
  const getBanner = async (params) => {
    const res = await getBannerAPI(params)
    bannerList.value = res.result
  }
  onMounted(() => {
    getBanner({ distributionSite: '2' })
  })
  return { bannerList }
}
