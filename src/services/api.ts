/// <reference types="vite/client" />
import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'https://asleep-florenza-freddy336-4b76ee74.koyeb.app/api',
})

export const courseService = {
  getAllCourses: (search?: string, category?: string) => {
    return api.get('/Courses', { 
      params: { search, category: category === 'all' ? undefined : category } 
    }).then(res => res.data)
  },
  
  getCourseById: (id: number) => {
    return api.get(`/Courses/${id}`).then(res => res.data)
  },
}

