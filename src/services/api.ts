import axios from 'axios'

const api = axios.create({
  baseURL: 'https://localhost:5001/api',
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

