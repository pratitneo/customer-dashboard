import React from 'react'
import overlayCss from './overlay.module.scss'
import type { OverlayType } from '../../types/types'

const Overlay = ({ getModalCloseFn, children }: OverlayType) => {
    const handleModalClose = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        const target = event.target as HTMLElement;
        if (!target.closest('.cust-dash__modal')) {
            getModalCloseFn();
        }
    }
    return (
        <div className={`${overlayCss['cust-dash__overlay']}`} onClick={handleModalClose}>
            {children}
        </div>
    )
}

export default Overlay