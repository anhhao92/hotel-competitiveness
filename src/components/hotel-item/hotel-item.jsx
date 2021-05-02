import { Button, List, Rate, Statistic, Tooltip } from 'antd'
import { LikeOutlined, InfoCircleFilled } from '@ant-design/icons'

import HotelCompetitor from '../hotel-competitor/hotel-competitor'

import styles from './style.module.css'

const HotelItem = (props) => {
  const { priceData, currency } = props
  const competitors = priceData?.competitorsWithUs?.map((competitor) => (
    <HotelCompetitor
      {...competitor}
      currency={currency}
      basePrice={priceData.price}
    />
  ))
  return (
    <List.Item
      actions={competitors}
      extra={
        <div className={styles.leftContainer}>
          <div className={styles.topLeftWrapper}>
            <Rate value={props.stars} />
            <Statistic value={props.rating} prefix={<LikeOutlined />} />
          </div>
          <div className={styles.price}>
            <div className={styles.priceValue}>
              <Statistic
                value={priceData ? `${priceData.price} ${currency} `: 'Rates unavailable'}
              />
              {priceData?.taxesAndFees && (
                <Tooltip title={`Taxes and fees included (Taxes: ${priceData.taxesAndFees.taxes}, Fees: ${priceData.taxesAndFees.fees})`}>
                  <InfoCircleFilled />
                </Tooltip>
              )}
            </div>
            {priceData?.costSaving && (
              <Statistic
                prefix="Saving"
                value={priceData.costSaving}
                valueStyle={{ color: '#3f8600' }}
                suffix="%"
              />
            )}
          </div>
          <img width={300} alt="logo" src={props.photo} />
          <Button type="primary" block>Book</Button>
        </div>
      }
    >
      <List.Item.Meta
        title={props.name}
        description={props.address}
      />
      <div className={styles.description} dangerouslySetInnerHTML={{__html: props.description}} />
    </List.Item>
  )
}

export default HotelItem
