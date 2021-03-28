import { inject, observer } from 'mobx-react';
import React from 'react';
import { GameStore } from '../../stores/GameStore';
import { ActionBoardType } from '../../models/ActionBoardType';
import { ActionSquare } from "./ActionSquare";


@inject('gameStore')
@observer
export class ActionBoard extends React.Component<{ gameStore?: GameStore; type: ActionBoardType; }> {
  public render() {
    return <div style={{ display: 'flex', flexWrap: 'wrap' }}>
      {this.props.gameStore!.actionSquares[this.props.type].map((actionSquare, i) => {
        return <ActionSquare data={actionSquare} key={i} />;
      })}
    </div>;
  }
}
