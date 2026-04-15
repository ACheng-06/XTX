import httpInstance from "@/utils/http";
export const getTopCategoryAPI = (id) => {
  return httpInstance({
    url: '/category',
    params: {
      id
    }
  })
}