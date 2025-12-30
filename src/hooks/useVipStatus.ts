import { useState, useEffect } from 'react'
import { vipService, VipStatus } from '../services/vipService'
import { useAuth } from '../contexts/AuthContext'

export const useVipStatus = () => {
  const { isAuthenticated, user } = useAuth()
  const [vipStatus, setVipStatus] = useState<VipStatus>({
    isVip: false,
    expiresAt: null,
    daysRemaining: null
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchVipStatus = async () => {
      if (!isAuthenticated) {
        setVipStatus({ isVip: false, expiresAt: null, daysRemaining: null })
        setLoading(false)
        return
      }

      try {
        // First check from user object (if available)
        if (user?.isVip) {
          setVipStatus({
            isVip: user.isVip,
            expiresAt: user.vipExpiresAt || null,
            daysRemaining: user.daysRemaining || null
          })
        }

        // Then fetch fresh status from API
        const status = await vipService.getVipStatus()
        setVipStatus(status)
      } catch (err) {
        console.error('Error fetching VIP status:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchVipStatus()

    // Refresh every 5 minutes
    const interval = setInterval(fetchVipStatus, 5 * 60 * 1000)
    return () => clearInterval(interval)
  }, [isAuthenticated, user])

  const refreshStatus = async () => {
    if (!isAuthenticated) return
    try {
      const status = await vipService.getVipStatus()
      setVipStatus(status)
    } catch (err) {
      console.error('Error refreshing VIP status:', err)
    }
  }

  return { vipStatus, loading, refreshStatus }
}



