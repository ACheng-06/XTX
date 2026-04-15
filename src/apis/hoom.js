import httpInstance from "@/utils/http";
export const getHotAPI = () => {
  return httpInstance({
    url: '/home/hot'
  })
}
export const getNewAPI = () => {
  return httpInstance({
    url: '/home/new'
  })
}
export const getGoodsAPI = () => {
  return httpInstance({
    url: '/home/goods'
  })
}
export const getBannerAPI = (params = {}) => {
  const { distributionSite = '1' } = params
  return httpInstance({
    url: 'home/banner',
    params: {
      distributionSite
    }
  })
}