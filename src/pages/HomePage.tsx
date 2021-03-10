import React, { CSSProperties } from 'react';

const getColor = (i) => {
	return i % 2 == 1 ? `black` : `red`;
};

const tileHeight = 100;
const tileWidth = 70;
const boardHeight = tileHeight * 3;
const boardWidth = tileWidth * 12;

interface BetRegion {
  id: string;
  label: string;
  returnMultiplier: number;
  valuesEffected: number[];
}

export class HomePage extends React.Component<{}, { region: BetRegion | undefined }> {

  public state: { region: BetRegion | undefined } = {
    region: undefined
  }

  private onClickRegion = (region: BetRegion) => {
    this.setState({region: region})
  }

	public render(): JSX.Element {
		return (
	
    <div style={styles.container}>

{this.state.region != undefined &&
<>
      <h1 style={{fontFamily: 'courier', fontSize: 25}}>{this.state.region.id}</h1>
      <br/>
      <h1 style={{fontFamily: 'courier', fontSize: 25}}>{`label-- ` + this.state.region.label}</h1>
      <h1 style={{fontFamily: 'courier', fontSize: 25}}>{`multi-- ` + this.state.region.returnMultiplier}</h1>
      <h1 style={{fontFamily: 'courier', fontSize: 25}}>{`values- [` + this.state.region.valuesEffected.join(',') + ']'}</h1>
</>
}

          <NumberButtons onClickRegion={this.onClickRegion} />
          <LeftRightButtons onClickRegion={this.onClickRegion}/>
          <TopBottomButtons onClickRegion={this.onClickRegion}/>
          <SelectFourButtons onClickRegion={this.onClickRegion}/>
          <ZeroButtonColumn onClickRegion={this.onClickRegion}/>
          <RowButtonColumn onClickRegion={this.onClickRegion}/>
          <ColumnButtonRow onClickRegion={this.onClickRegion}/>
          <TwelvesButtonRow onClickRegion={this.onClickRegion}/>
          <FiftyFiftyButtonRow onClickRegion={this.onClickRegion} />

			</div>
		);
	}
}

interface RegionProps { 
  onClickRegion: (region: BetRegion) => void;
}
export class NumberButtons extends React.Component<RegionProps> {
  public render() {
    return (
      		<div style={styles.gameBoard}>
            {Array(36).fill(``).map((_, i) => {

              let topRow = (i + 1) % 3 == 0;
              let midRow = (i + 1) % 3 == 2;
              let botRow = (i + 1) % 3 == 1;
              let topPos = topRow ? 0 : midRow ? tileHeight : botRow ? tileHeight * 2 : -99;

              let leftIndex = Math.floor(((i + 1) - 0.1) / 3)

              let region: BetRegion = {
                id: `SINGLE_${i + 1}`,
                label: `${i + 1}`,
                valuesEffected: [i + 1],
                returnMultiplier: 36,
              }

              return (
                <div onClick={() => this.props.onClickRegion(region)} style={{ pointerEvents: `auto`, cursor: 'pointer', position: 'absolute', zIndex: 5, left: tileWidth * leftIndex, top: topPos, height: tileHeight, width: tileWidth, backgroundColor: getColor(i),  display: `flex`, justifyContent: `center`, alignItems: `center` }}>
                  <h1 style={{ fontSize: 36, color: `white`, fontFamily: `courier` }}>{i + 1}</h1>
                </div>
              );
            })}
          </div>
    )
  }
}

export class LeftRightButtons extends React.Component<RegionProps>{
  public render() {
    return (
					<div style={styles.gameBoard}>
						{Array(36).fill(``).map((_, i) => {
              let topRow = (i + 1) % 3 == 0;
              let midRow = (i + 1) % 3 == 2;
              let botRow = (i + 1) % 3 == 1;
              let topPos = topRow ? 0 : midRow ? tileHeight : botRow ? tileHeight * 2 : -99;

              let leftIndex = Math.floor(((i + 1) - 0.1) / 3) + 1;

              if(i + 1 >= 34 ) { return null }

              let region: BetRegion = {
                id: `LEFTRIGHT_${i + 1}_${i + 4}`,
                label: `${i + 1}&${i + 4}`,
                valuesEffected: [i + 1, i + 4],
                returnMultiplier: 18,
              }

							return <>
                <div onClick={() => this.props.onClickRegion(region)} style={{ pointerEvents: `auto`, cursor: 'pointer', position: `absolute`, top: topPos, left: tileWidth * leftIndex, transform: `translate(-50%, 0)`, height: tileHeight, width: 20, backgroundColor: `white`, border: `7px solid orange`, zIndex: 10 }} />
              </>						
            })}
					</div>
    ) 
  }
}


export class SelectFourButtons extends React.Component <RegionProps> {
  public render() {
    return (
					<div style={styles.gameBoard}>
						{Array(11).fill(``).map((_, i) => {

              let botIndex = (i * 3)+ 1;
              let topIndex = (i * 3) + 2;

              let botValue = [botIndex, botIndex + 1, botIndex + 3, botIndex + 4]
              let topValue = [topIndex, topIndex + 1, topIndex + 3, topIndex + 4]

              let botRowRegion: BetRegion = {
                id: `SELECTFOUR_${botValue.join('_')}`,
                label: botValue.join('&'),
                valuesEffected: botValue,
                returnMultiplier: 9,
              }

              let topRowRegion: BetRegion = {
                id: `SELECTFOUR_${topValue.join('_')}`,
                label: topValue.join('&'),
                valuesEffected: topValue,
                returnMultiplier: 9,
              }


							return <>
                <div onClick={() => this.props.onClickRegion(topRowRegion)} style={{ pointerEvents: 'auto', position: `absolute`, top: tileHeight, left: tileWidth * (i + 1), transform: `translate(-50%, -50%)`, height: 20, width: 20, backgroundColor: `white`, border: `7px solid blue`, zIndex: 30 }} />
                <div onClick={() => this.props.onClickRegion(botRowRegion)} style={{ pointerEvents: 'auto', position: `absolute`, top: tileHeight * 2, left: tileWidth * (i + 1), transform: `translate(-50%, -50%)`, height: 20, width: 20, backgroundColor: `white`, border: `7px solid blue`, zIndex: 30 }} />
              </>						
            })}
					</div>

    ) 
  }
}


export class TopBottomButtons extends React.Component<RegionProps> {
  public render() {
    	return (
        <div style={styles.gameBoard}>
          {Array(36).fill(``).map((_, i) => {
            let topRow = (i + 1) % 3 == 0;
            let midRow = (i + 1) % 3 == 2;
            let botRow = (i + 1) % 3 == 1;
            let topPos = topRow ? 0 : midRow ? tileHeight : botRow ? tileHeight * 2 : -99;
            let leftIndex = Math.floor(((i + 1) - 0.1) / 3);
  
            if(topRow) { return null }
  
            let region: BetRegion = {
              id: `TOPBOTTOM_${i + 1}_${i + 2}`,
              label: `${i + 1}&${i + 2}`,
              valuesEffected: [i + 1, i + 2],
              returnMultiplier: 18,
            }

            return <>
              <div onClick={() => this.props.onClickRegion(region)} style={{ pointerEvents: 'auto', cursor: 'pointer', position: `absolute`, top: topPos, left: tileWidth * leftIndex, transform: `translate(0, -50%)`, height: 20, width: tileWidth, backgroundColor: `white`, border: `7px solid green`, zIndex: 10 }} />
            </>
          })}
        </div>
      )
  }
}

export class ZeroButtonColumn extends React.Component<RegionProps> {
  public render() {

    let singleZeroRegion: BetRegion = {
      id: `ZERO_SINGLE`,
      label: `${0}`,
      valuesEffected: [-1],
      returnMultiplier: 50,
    }

    let doubleZeroRegion: BetRegion = {
      id: `ZERO_DOUBLE`,
      label: `00`,
      valuesEffected: [-2],
      returnMultiplier: 50,
    }


    return (
					<div style={styles.gameBoard}>
              <div onClick={() => this.props.onClickRegion(singleZeroRegion)}style={{pointerEvents: 'auto', cursor: 'pointer', position: `absolute`, top: 0, left: -tileWidth, height: boardHeight  / 2, width: tileWidth, backgroundColor: `salmon`, border: `7px solid aqua`, justifyContent: 'center', alignItems: 'center', display: 'flex'}}>
                  <h1 style={{ fontSize: 36, color: `white`, fontFamily: `courier` }}>{`0`}</h1>
              </div>
              <div onClick={() => this.props.onClickRegion(doubleZeroRegion)}style={{pointerEvents: 'auto', cursor: 'pointer', position: `absolute`, top: boardHeight / 2, left: -tileWidth, height: boardHeight  / 2, width: tileWidth, backgroundColor: `salmon`, border: `7px solid aqua`, justifyContent: 'center', alignItems: 'center', display: 'flex'}}>
                  <h1 style={{ fontSize: 36, color: `white`, fontFamily: `courier` }}>{`00`}</h1>
              </div>
          </div>
    ) 
  }
}

   
export class RowButtonColumn extends React.Component <RegionProps> {
  public render() {

    let botRow: BetRegion = {
      id: `ROW_BOTTOM`,
      label: `Bottom Row`,
      valuesEffected: Array(12).fill('').map((_,i) => i * 3 + 1),
      returnMultiplier: 3,
    }

    let midRow: BetRegion = {
      id: `ROW_MID`,
      label: `Middle Row`,
      valuesEffected: Array(12).fill('').map((_,i) => i * 3 + 2),
      returnMultiplier: 3,
    }

    let topRow: BetRegion = {
      id: `ROW_TOP`,
      label: `Top Row`,
      valuesEffected: Array(12).fill('').map((_,i) => i * 3 + 3),
      returnMultiplier: 3,
    }

    return (
					<div style={styles.gameBoard}>
              <div onClick={() => this.props.onClickRegion(topRow)} style={{ cursor: 'pointer', pointerEvents: 'auto', position: `absolute`, top: tileHeight * 0, right: -tileWidth / 2, height: tileHeight, width: tileWidth / 2, backgroundColor: `purple`, border: `7px solid aqua`}} />
              <div onClick={() => this.props.onClickRegion(midRow)} style={{ cursor: 'pointer', pointerEvents: 'auto', position: `absolute`, top: tileHeight * 1, right: -tileWidth / 2, height: tileHeight, width: tileWidth / 2, backgroundColor: `purple`, border: `7px solid aqua`}} />
              <div onClick={() => this.props.onClickRegion(botRow)} style={{ cursor: 'pointer', pointerEvents: 'auto', position: `absolute`, top: tileHeight * 2, right: -tileWidth / 2, height: tileHeight, width: tileWidth / 2, backgroundColor: `purple`, border: `7px solid aqua`}} />
          </div>
    ) 
  }
}

export class ColumnButtonRow extends React.Component<RegionProps>{
  public render() {
    return (
          <div style={styles.gameBoard}>
            {Array(36).fill(``).map((_, i) => {
              let topRow = (i + 1) % 3 == 0;
              let midRow = (i + 1) % 3 == 2;

              let leftIndex = Math.floor(((i + 1) - 0.1) / 3);

              if(topRow || midRow) { return null }

              let region: BetRegion = {
                id: `COL_${Math.floor(i / 3)}`,
                label: `Column`,
                valuesEffected: [i + 1, i + 2, i + 3],
                returnMultiplier: 12,
              }

              return <>
                <div onClick={() => this.props.onClickRegion(region)} style={{cursor: 'pointer', pointerEvents: 'auto', position: `absolute`, top: tileHeight * 3, left: tileWidth * leftIndex, height: tileWidth / 2, width: tileWidth, backgroundColor: `grey`, border: `7px solid aqua`, zIndex: 10 }} />
              </>
            })}
          </div>
    ) 
  }
}

export class TwelvesButtonRow extends React.Component<RegionProps>{
  public render() {

    let firstRegion: BetRegion = {
      id: `TWELTH_1`,
      label: `First Twelth`,
      valuesEffected: Array(12).fill('').map((_, i) => i + 1),
      returnMultiplier: 3,
    }

    let secondRegion: BetRegion = {
      id: `TWELTH_2`,
      label: `Second Twelth`,
      valuesEffected: Array(12).fill('').map((_, i) => i + 13),
      returnMultiplier: 12,
    }

    let thirdRegion: BetRegion = {
      id: `TWELTH_3`,
      label: `Third Twelth`,
      valuesEffected: Array(12).fill('').map((_, i) => i + 25),
      returnMultiplier: 12,
    }

    return (
        <div style={styles.gameBoard}>
            <div onClick={() => this.props.onClickRegion(firstRegion)} style={{cursor: 'pointer', pointerEvents: 'auto', position: `absolute`, top: tileHeight * 3 + tileWidth / 2, left: (tileWidth * 4) * 0, height: tileWidth / 2, width: tileWidth * 4, backgroundColor: `skyblue`, border: `7px solid purple`, zIndex: 10 }} />
            <div onClick={() => this.props.onClickRegion(secondRegion)} style={{cursor: 'pointer', pointerEvents: 'auto', position: `absolute`, top: tileHeight * 3 + tileWidth / 2, left: (tileWidth * 4) * 1, height: tileWidth / 2, width: tileWidth * 4, backgroundColor: `skyblue`, border: `7px solid purple`, zIndex: 10 }} />
            <div onClick={() => this.props.onClickRegion(thirdRegion)} style={{cursor: 'pointer', pointerEvents: 'auto', position: `absolute`, top: tileHeight * 3 + tileWidth / 2, left: (tileWidth * 4) * 2, height: tileWidth / 2, width: tileWidth * 4, backgroundColor: `skyblue`, border: `7px solid purple`, zIndex: 10 }} />
        </div>
    ) 
  }
}

export class FiftyFiftyButtonRow extends React.Component<RegionProps>{
  public render() {

    let lowRegion: BetRegion = {
      id: `LOWER_EIGHTEEN`,
      label: `1-18`,
      valuesEffected: Array(18).fill('').map((_, i) => i + 1),
      returnMultiplier: 2,
    }    
    
    let highRegion: BetRegion = {
      id: `UPPER_EIGHTEEN`,
      label: `19-36`,
      valuesEffected: Array(18).fill('').map((_, i) => i + 19),
      returnMultiplier: 2,
    }

    let evenRegion: BetRegion = {
      id: `EVEN`,
      label: `EVEN`,
      valuesEffected: Array(18).fill('').map((_, i) => (i + 1) * 2),
      returnMultiplier: 2,
    }
    
    let oddRegion: BetRegion = {
      id: `ODD`,
      label: `ODD`,
      valuesEffected: Array(18).fill('').map((_, i) => ((i + 1) * 2) - 1),
      returnMultiplier: 2,
    } 

    let blackRegion: BetRegion = {
      id: `BLACK`,
      label: `BLACK`,
      valuesEffected: Array(18).fill('').map((_, i) => (i + 1) * 2),
      returnMultiplier: 2,
    }
    
    let redRegion: BetRegion = {
      id: `RED`,
      label: `RED`,
      valuesEffected: Array(18).fill('').map((_, i) => ((i + 1) * 2) - 1),
      returnMultiplier: 2,
    } 

    return (
        <div style={styles.gameBoard}>

           <div onClick={() => this.props.onClickRegion(lowRegion)} style={{cursor: 'pointer', pointerEvents: 'auto', display: 'flex', justifyContent: 'center', alignItems: 'center', position: `absolute`, top: tileHeight * 3 + tileWidth, left: (tileWidth * 2) * 0, height: tileWidth, width: tileWidth * 2, backgroundColor: `orange`, border: `7px solid brown`, zIndex: 10 }} >
                  <h1 style={{ fontSize: 36, color: `white`, fontFamily: `courier` }}>{lowRegion.label}</h1>
          </div>


           <div onClick={() => this.props.onClickRegion(evenRegion)} style={{cursor: 'pointer', pointerEvents: 'auto', display: 'flex', justifyContent: 'center', alignItems: 'center', position: `absolute`, top: tileHeight * 3 + tileWidth, left: (tileWidth * 2) * 1, height: tileWidth, width: tileWidth * 2, backgroundColor: `orange`, border: `7px solid brown`, zIndex: 10 }} >
                  <h1 style={{ fontSize: 36, color: `white`, fontFamily: `courier` }}>{evenRegion.label}</h1>
          </div>


           <div onClick={() => this.props.onClickRegion(redRegion)} style={{cursor: 'pointer', pointerEvents: 'auto', display: 'flex', justifyContent: 'center', alignItems: 'center', position: `absolute`, top: tileHeight * 3 + tileWidth, left: (tileWidth * 2) * 2, height: tileWidth, width: tileWidth * 2, backgroundColor: `orange`, border: `7px solid brown`, zIndex: 10 }} >
                  <h1 style={{ fontSize: 36, color: `white`, fontFamily: `courier` }}>{redRegion.label}</h1>
          </div>


           <div onClick={() => this.props.onClickRegion(blackRegion)} style={{cursor: 'pointer', pointerEvents: 'auto', display: 'flex', justifyContent: 'center', alignItems: 'center', position: `absolute`, top: tileHeight * 3 + tileWidth, left: (tileWidth * 2) * 3, height: tileWidth, width: tileWidth * 2, backgroundColor: `orange`, border: `7px solid brown`, zIndex: 10 }} >
                  <h1 style={{ fontSize: 36, color: `white`, fontFamily: `courier` }}>{blackRegion.label}</h1>
          </div>


           <div onClick={() => this.props.onClickRegion(oddRegion)} style={{cursor: 'pointer', pointerEvents: 'auto', display: 'flex', justifyContent: 'center', alignItems: 'center', position: `absolute`, top: tileHeight * 3 + tileWidth, left: (tileWidth * 2) * 4, height: tileWidth, width: tileWidth * 2, backgroundColor: `orange`, border: `7px solid brown`, zIndex: 10 }} >
                  <h1 style={{ fontSize: 36, color: `white`, fontFamily: `courier` }}>{oddRegion.label}</h1>
          </div>


           <div onClick={() => this.props.onClickRegion(highRegion)} style={{cursor: 'pointer', pointerEvents: 'auto', display: 'flex', justifyContent: 'center', alignItems: 'center', position: `absolute`, top: tileHeight * 3 + tileWidth, left: (tileWidth * 2) * 5, height: tileWidth, width: tileWidth * 2, backgroundColor: `orange`, border: `7px solid brown`, zIndex: 10 }} >
                  <h1 style={{ fontSize: 36, color: `white`, fontFamily: `courier` }}>{highRegion.label}</h1>
          </div>

       </div>
    ) 
  }
}

let border = 20;
const styles = {
	container: {
		border: `${border}px solid red`,
		width: window.innerWidth - border * 2,
		height: window.innerHeight - border * 2,
    position: 'relative',
    pointerEvents: `none`
	} as CSSProperties,
  gameBoard: {
    position: `absolute`,  width: boardWidth, height: boardHeight, bottom: tileWidth * 2 + 20, left: `calc(50% - ${boardWidth / 2}px)`, zIndex: 0, pointerEvents: `none`
  } as CSSProperties
};
