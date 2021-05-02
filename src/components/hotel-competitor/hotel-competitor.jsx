import classNames from 'classnames'
import styles from './style.module.css'

const HotelCompetitor = ({ competitor, price, currency, basePrice }) => {
  const shouldStrikeThrough = price > basePrice
  return (
    <div className={classNames(styles.container, { [styles.strikeThrough]: shouldStrikeThrough })}>
      <span>{competitor}</span>
      <span>{`${price} ${currency}`}</span>
    </div>
  )
}

export default HotelCompetitor