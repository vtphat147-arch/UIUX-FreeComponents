import axios from 'axios'

const baseURL = import.meta.env.VITE_API_URL || 'https://e-education-be.onrender.com/api'

export interface VipStatus {
  isVip: boolean
  expiresAt: string | null
  daysRemaining: number | null
}

export interface VipPlan {
  id: number
  name: string
  days: number
  price: number
  isActive: boolean
}

export interface Payment {
  id: number
  userId: number
  vipPlanId: number
  amount: number
  currency: string
  payOSOrderCode: string
  payOSTransactionCode: string | null
  status: string
  createdAt: string
  completedAt: string | null
  vipPlan: VipPlan
}

export interface CreateOrderResponse {
  paymentUrl: string
  orderCode: string
}

export const vipService = {
  async getVipStatus(): Promise<VipStatus> {
    const token = localStorage.getItem('auth_token')
    if (!token) {
      return { isVip: false, expiresAt: null, daysRemaining: null }
    }

    try {
      const response = await axios.get<VipStatus>(`${baseURL}/payments/vip-status`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      return response.data
    } catch (err) {
      console.error('Error getting VIP status:', err)
      return { isVip: false, expiresAt: null, daysRemaining: null }
    }
  },

  async getPlans(): Promise<VipPlan[]> {
    try {
      console.log('📞 Calling API:', `${baseURL}/payments/plans`)
      const response = await axios.get<VipPlan[]>(`${baseURL}/payments/plans`)
      console.log('📦 API Response:', response.data)
      console.log('📦 Response type:', typeof response.data, Array.isArray(response.data))
      console.log('📦 Plans count:', response.data?.length || 0)
      return response.data || []
    } catch (err: any) {
      console.error('❌ Error getting VIP plans:', err)
      console.error('❌ Error response:', err.response?.data)
      console.error('❌ Error status:', err.response?.status)
      console.error('❌ Error message:', err.message)
      return []
    }
  },

  async createOrder(planId: number): Promise<CreateOrderResponse> {
    const token = localStorage.getItem('auth_token')
    if (!token) {
      throw new Error('Not authenticated')
    }

    const response = await axios.post<CreateOrderResponse>(
      `${baseURL}/payments/create-order`,
      { planId },
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    )
    return response.data
  },

  async getPaymentHistory(): Promise<Payment[]> {
    const token = localStorage.getItem('auth_token')
    if (!token) {
      return []
    }

    try {
      const response = await axios.get<Payment[]>(`${baseURL}/payments/history`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      return response.data
    } catch (err) {
      console.error('Error getting payment history:', err)
      return []
    }
  },

  async verifyPayment(orderCode: string): Promise<{
    status: string
    completedAt: string | null
    isVip: boolean
    vipExpiresAt: string | null
  }> {
    const token = localStorage.getItem('auth_token')
    if (!token) {
      throw new Error('Not authenticated')
    }

    const response = await axios.get(`${baseURL}/payments/verify/${orderCode}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    return response.data
  }
}

