import { useEffect, useState } from 'react'
import { useCartStore } from '../../../components/Cart'
import axios from 'axios'
import { Rate } from '../../../types/Rate'

export const useGetInitRates = () => {
    const [isError, setIsError] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const { setAllRates } = useCartStore()

    useEffect(() => {
        const getRates = async () => {
            setIsLoading(true)
            try {
                const res = await axios.get<Rate<true>[]>(__API__ + '/rate')
                if (res) {
                    setAllRates(res.data)
                } else {
                    setIsError(true)
                }
            } catch (e) {
                console.log(e)
            } finally {
                setIsLoading(false)
            }
        }
        getRates()
    }, [])

    return { isError, isLoading }
}
