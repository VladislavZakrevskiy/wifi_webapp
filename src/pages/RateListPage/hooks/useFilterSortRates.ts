import { useEffect, useState } from 'react'
import { useCartStore } from '../../../components/Cart'
import { Rate } from '../../../types/Rate'
import { SortType } from '../../../components/Rate'

export const useFilterSortRates = () => {
    const [currentRates, setCurrentRates] = useState<Rate<true>[]>([])
    const [searchString, setSearchString] = useState<string>('')
    const [sortType, setSortStype] = useState<SortType>('high_price')
    const { allRates } = useCartStore()

    useEffect(() => {
        let newAllRates = [...allRates]
        if (searchString !== '') {
            newAllRates = newAllRates.filter(
                ({ description, name }) => name.includes(searchString) || description.includes(searchString)
            )
        }
        switch (sortType) {
            case 'high_popularity':
                newAllRates.sort((a, b) => a.users.length - b.users.length)
                break
            case 'low_popularity':
                newAllRates.sort((a, b) => b.users.length - a.users.length)
                break
            case 'high_price':
                newAllRates.sort((a, b) => a.price - b.price)
                break
            case 'low_price':
                newAllRates.sort((a, b) => b.price - a.price)
                break
        }

        setCurrentRates(newAllRates)
    }, [allRates, searchString, sortType])

    return { searchString, setSearchString, setCurrentRates, currentRates, setSortStype, sortType }
}
