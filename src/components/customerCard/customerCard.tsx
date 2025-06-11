import custCardCss from './customerCard.module.scss'
import { PiDotsThreeVertical } from 'react-icons/pi'
import type { CustomerCardType } from '../../types/types'

const CustomerCard = ({ customersData, updateStatus }: CustomerCardType) => {
    return (
        customersData?.customers?.map((customer: any, index: number) => {
            return (
                <div className={`${custCardCss['cust-dash__card']}`}>
                    {/* name & options */}
                    <div className={`${custCardCss['cust-dash__nameOpts']}`}>
                        {/* profile */}
                        <div className={`${custCardCss['cust-dash__profile']}`}>
                            {/* photo */}
                            <div className={`${custCardCss['cust-dash__photo']}`}>
                                <img src={`${customer?.avatar}`} className={`${custCardCss['cust-dash__user-image']}`} />
                                {customer?.status === 'Active' ? (
                                    <div className={`${custCardCss['cust-dash__active-dot']}`}></div>
                                ) : ''}
                            </div>
                            {/* name details */}
                            <div className={`${custCardCss['cust-dash__userDetails']}`}>
                                <p className={`${custCardCss['cust-dash__userName']}`}>{customer?.name}</p>
                                <p className={`${custCardCss['cust-dash__userLocation']}`}>{customer?.country}</p>
                            </div>
                        </div>
                        {/* button */}
                        <div className={`${custCardCss['cust-dash__userOpts']}`}>
                            <PiDotsThreeVertical />
                        </div>
                    </div>
                    <div className={`${custCardCss['cust-dash__num']}`}>{customer?.mobile}</div>
                    <div className={`${custCardCss['cust-dash__email']}`}>{customer?.email}</div>
                    <div className={`${custCardCss['cust-dash__statusCompany']}`}>
                        <p className={`${custCardCss['cust-dash__status']} ${custCardCss[`cust-dash__status--${customer?.status ? 'active' : 'inactive'}`]}`} onClick={() => updateStatus(customer, index)}>{customer?.status ? 'Active' : 'Inactive'}</p>
                        <p className={`${custCardCss['cust-dash__company']}`}>{customer?.company}</p>
                    </div>
                </div>
            )
        })
    )
}

export default CustomerCard