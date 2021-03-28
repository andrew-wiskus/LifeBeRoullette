import React from 'react'
import { images } from '../../images/_images';

export const SlotNumberIndicator = (props: {index: number, isTop: boolean}) => {

    let val = ((props.index - 1) % 4) + 1;
    let verticle = props.isTop ? { top: `7%` } : { bottom: `12%` }

    let image = props.index < 5 ? images.slotNumber.triangle : props.index < 9 ? images.slotNumber.circle : images.slotNumber.square;

    return (
          <div style={{position: 'absolute', ...verticle, left: '20%', right: '20%', display: 'flex', justifyContent: 'space-around', flexDirection: 'row'}}>
            {new Array(val).fill('').map(() => {
              return <div style={{height: 10, width: 10,}}>
                  <img src={image} style={{height: `100%`, width: `100%`, objectFit: 'contain'}} />
                </div>
            })}
          </div>
    )
}
