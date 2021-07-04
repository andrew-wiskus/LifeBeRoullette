import React from 'react'
import { images } from '../images/_images';
import { StyleObject } from '../pages/MainMenu/MainMenu';

interface Props {
    value: number    
}
export class Tile extends React.Component<Props> {

    public render() {
        return (
            <div style={{...styles.container, ...{ opacity: this.props.value == 0 ? 0.2 : 1}}}>
              <h1
                style={styles.valueText}
              >
                {this.props.value}
              </h1>
              <img
                src={images.hex}
                style={styles.bgImage}
              />
            </div>
        );
    }
}

const styles: StyleObject = {
    container: { 
        width: 100, 
        height: 100, 
        position: 'relative' 
    },
  valueText: {
    position: 'absolute',
    top: 33,
    left: 0,
    right: 0,
    bottom: 0,
    objectFit: 'contain',
    zIndex: 99,
    fontSize: 40,
    textAlign: 'center',
  },
  bgImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    objectFit: 'contain',
  },
};