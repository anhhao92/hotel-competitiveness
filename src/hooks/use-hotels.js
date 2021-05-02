import { useQuery } from 'react-query'
import _sortBy from 'lodash/sortBy'
import fetch from '../utils/fetch'
import { ROUND_UNIT } from '../constants/currencies'

const MAX_DISPLAY_COMPETITOR = 4

const roundToNearestUnit = (value, unit) => Math.round(value / unit) * unit

export const decoratePriceObject = (priceData, currency) => {
  const { competitors, taxes_and_fees, ...rest } = priceData
  const roundUnit = ROUND_UNIT[currency] ?? 1
  const price = roundToNearestUnit(priceData.price, roundUnit)
  const competiorList = Object.keys(competitors ?? {}).map(m => ({
    competitor: m,
    price: roundToNearestUnit(competitors[m], roundUnit),
  }))
  const sortedCompetitors = _sortBy(competiorList, 'price').slice(0, MAX_DISPLAY_COMPETITOR - 1)
  const costSaving = sortedCompetitors.reduce(
    (prev, cur) => price < cur.price ? ((cur.price * 100 / price) - 100).toFixed(1) : prev,
    undefined,
  )
  sortedCompetitors.push({
    competitor: 'Us',
    price,
  })
  return {
    ...rest,
    price,
    costSaving,
    competitorsWithUs: competitors ? _sortBy(sortedCompetitors, 'price') : undefined,
    taxesAndFees: taxes_and_fees ? {
      taxes: taxes_and_fees.tax,
      fees: taxes_and_fees.hotel_fees,
    } : undefined
  }
}

export const decorateHotelList = (listHotel, listPrice, currency) => {
  const priceDict = listPrice.reduce((result, { id, ...data}) => ({
    ...result,
    [id]: decoratePriceObject(data, currency),
  }), {})

  return listHotel.map((hotel) => ({
    ...hotel,
    priceData: priceDict[hotel.id],
  }))
}

const getHotels = async (currency) => {
  const [listHotel, listPrice] = await Promise.all([
    fetch('https://5df9cc6ce9f79e0014b6b3dc.mockapi.io/hotels/tokyo'),
    fetch(`http://5df9cc6ce9f79e0014b6b3dc.mockapi.io/hotels/tokyo/1/${currency}`)
  ])

  return decorateHotelList(listHotel, listPrice, currency)
}

const useHotels = (currency) => useQuery(["hotels", currency], () => getHotels(currency))

export default useHotels
