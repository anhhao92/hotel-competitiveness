import { useState } from 'react'
import { Select, Skeleton, List } from 'antd'

import { CURRENCIES, SESSION_STORAGE_CURRENCY_KEY } from '../../constants/currencies'
import HotelItem from '../hotel-item/hotel-item'
import useHotels from '../../hooks/use-hotels'

import styles from './style.module.css'

const HotelList = () => {
  const [currency, setCurrency] = useState(sessionStorage.getItem(SESSION_STORAGE_CURRENCY_KEY) ?? 'USD')
  const { data, isFetching } = useHotels(currency)
  const handleCurrencyChange = (value) => {
    setCurrency(value)
    sessionStorage.setItem(SESSION_STORAGE_CURRENCY_KEY, value)
  }

  return (
    <div className={styles.container}>
      <Select
        size="large"
        value={currency}
        onChange={handleCurrencyChange}
        options={CURRENCIES}
      />
      <Skeleton loading={isFetching} active>
        <List
          bordered
          itemLayout="vertical"
          size="large"
          dataSource={data}
          renderItem={(item) => <HotelItem currency={currency} {...item} />}
        />
      </Skeleton>
    </div>
  )
}

export default HotelList