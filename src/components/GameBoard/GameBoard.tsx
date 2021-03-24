import React, { CSSProperties } from 'react';


export class GameBoard extends React.Component {

  public render(): JSX.Element {
    return (
      <div style={styles.container}>

        
        <div style={styles.leftBoardContainer} />
        <div style={styles.centerBoardContainer} />
        <div style={styles.rightBoardContainer} />

        <div style={styles.leftBasicContainer} />
        <div style={styles.rightBasicContainer} />
        <div style={styles.centerBasicContainer} />

        <div style={styles.gameBoardBackground} />

        <div style={styles.topLeftContainer} />
        <div style={styles.topCenterContainer} />
        <div style={styles.infoContainer} />
      </div>
    );
  }
}



export interface RegionProps {}

export const styles = {
  container: {
    width: window.innerWidth,
    height: window.innerHeight,
    position: 'relative',
    backgroundColor: 'white',
    display: 'grid',
    gridTemplateColumns: 'repeat(30, 1fr)',
    gridTemplateRows: `repeat(16, 1fr) `
  } as CSSProperties,
  leftBoardContainer: { zIndex: 99, display: 'grid', gridColumn: '3 / span 8', gridRow: '8 / span 6', backgroundColor: 'red' } as CSSProperties,
  centerBoardContainer: { zIndex: 99, display: 'grid', gridColumn: '12 / span 8', gridRow: '8 / span 6', backgroundColor: 'blue' } as CSSProperties,
  rightBoardContainer: { zIndex: 99, display: 'grid', gridColumn: '21 / span 8', gridRow: '8 / span 6', backgroundColor: 'green' } as CSSProperties,

  leftBasicContainer: { zIndex: 99, display: 'grid', gridColumn: '3 / span 8', gridRow: '14 / span 2', marginTop: 10, marginBottom: -10,  backgroundColor: 'red' } as CSSProperties,
  rightBasicContainer: { zIndex: 99, display: 'grid', gridColumn: '12 / span 8', gridRow: '14 / span 2', marginTop: 10, marginBottom: -10,  backgroundColor: 'blue' } as CSSProperties,
  centerBasicContainer: { zIndex: 99, display: 'grid', gridColumn: '21 / span 8', gridRow: '14 / span 2', marginTop: 10, marginBottom: -10,  backgroundColor: 'green' } as CSSProperties,


  gameBoardBackground: { zIndex: 90, display: 'grid', gridColumn: '1 / span 30', gridRow: `7 / span 10`, backgroundColor: '#EEDEDE' },

  topLeftContainer: { zIndex: 90, display: 'grid', gridColumn: `1 / span 5`, gridRow: `1 / span 6`, backgroundColor: '#C4C4C4'},
  topCenterContainer: { zIndex: 90, display: 'grid', gridColumn: `6 / span 20`, gridRow: `1 / span 6`, backgroundColor: '#908C8C'},
  infoContainer: { zIndex: 90, display: 'grid', gridColumn: `26 / span 5`, gridRow: `1 / span 6`, backgroundColor: '#C4C4C4'},
};
