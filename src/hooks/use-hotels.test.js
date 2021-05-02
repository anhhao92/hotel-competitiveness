import { decoratePriceObject, decorateHotelList } from './use-hotels'

test('decoratePriceObject', () => {
  const sample = {
    competitors: { Traveloka: 190, Expedia: 163 },
    id: 1,
    price: 164,
    taxes_and_fees: { tax: 13.12, hotel_fees: 16.4 },
  }
  const result = decoratePriceObject(sample, 'USD')
  expect(result).toEqual({
    costSaving: '15.9',
    competitorsWithUs: [
      { competitor: 'Expedia', price: 163 },
      { competitor: 'Us', price: 164 },
      { competitor: 'Traveloka', price: 190 },
    ],
    id: 1,
    price: 164,
    taxesAndFees: { fees: 16.4, taxes: 13.12 },
  })
})

test('decoratePriceObject without competitors', () => {
  const sample = {
    id: 1,
    price: 164123.1,
    taxes_and_fees: { tax: 13.12, hotel_fees: 16.4 },
  }
  const result = decoratePriceObject(sample, 'KRW')
  expect(result).toEqual({
    id: 1,
    price: 164100,
    taxesAndFees: { fees: 16.4, taxes: 13.12 },
  })
})

test('decorateHotelList', async () => {
  const listHotel = [
    {
      id: 1,
      name: 'Shinagawa Prince Hotel',
      rating: 7.7,
      stars: 4,
      address: '108-8611 Tokyo Prefecture Japan',
      photo: 'https://d2ey9sqrvkqdfs.cloudfront.net/ZqSQ/i1_t.jpg',
      description: 'train ride away',
    },
  ]
  const listPrice = [
    {
      id: 1,
      price: 120,
      competitors: {
        'Booking.com': 125,
        'Hotels.com': 121,
        'AMOMA.com': 132.77,
      },
    },
  ]

  const result = await decorateHotelList(listHotel, listPrice, 'USD')
  expect(result).toEqual([
    {
      address: '108-8611 Tokyo Prefecture Japan',
      description: 'train ride away',
      id: 1,
      name: 'Shinagawa Prince Hotel',
      photo: 'https://d2ey9sqrvkqdfs.cloudfront.net/ZqSQ/i1_t.jpg',
      priceData: {
        competitorsWithUs: [
          { competitor: 'Us', price: 120 },
          { competitor: 'Hotels.com', price: 121 },
          { competitor: 'Booking.com', price: 125 },
          { competitor: 'AMOMA.com', price: 133 },
        ],
        costSaving: '10.8',
        price: 120,
      },
      rating: 7.7,
      stars: 4,
    },
  ])
})
