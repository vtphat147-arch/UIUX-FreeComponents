/// <reference types="vite/client" />
import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'https://e-education-be.onrender.com/api',
})

export interface DesignComponent {
  id: number
  name: string
  category: string // header, footer, sidebar, layout, typography
  type: string
  preview: string
  htmlCode: string
  cssCode: string
  jsCode?: string | null
  description: string
  tags?: string | null
  framework?: string | null
  views: number
  likes: number
  createdAt: string
  updatedAt: string
}

export interface ComponentsResponse {
  data: DesignComponent[]
  pagination: {
    page: number
    pageSize: number
    total: number
    totalPages: number
  }
}

export const designService = {
  getAllComponents: (
    category?: string, 
    type?: string, 
    search?: string, 
    tags?: string,
    framework?: string,
    sortBy?: string,
    page?: number,
    pageSize?: number,
    minViews?: number,
    minLikes?: number
  ) => {
    return api.get<ComponentsResponse>('/components', { 
      params: { category, type, search, tags, framework, sortBy, page, pageSize, minViews, minLikes } 
    }).then(res => res.data)
  },
  
  getComponentById: (id: number) => {
    return api.get<DesignComponent>(`/components/${id}`).then(res => res.data)
  },

  getCategories: () => {
    return api.get<string[]>('/components/categories').then(res => res.data)
  },

  getTypesByCategory: (category: string) => {
    return api.get<string[]>(`/components/types/${category}`).then(res => res.data)
  },

  likeComponent: (id: number) => {
    return api.post(`/components/${id}/like`).then(res => res.data)
  },

  checkLike: (id: number) => {
    return api.get<{ isLiked: boolean }>(`/components/${id}/like/check`).then(res => res.data)
  }
}
