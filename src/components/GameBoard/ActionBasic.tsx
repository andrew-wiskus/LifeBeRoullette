import React from 'react';
import { ActionBoardType } from '../../models/ActionBoardType';
import { images } from '../../images/_images';


export class ActionBasic extends React.Component<{ type: ActionBoardType; }> {
  public render() {
    let image = images[`basic${this.props.type}` as keyof typeof images];
    return <div style={{ width: `100%`, height: `100%` }}>
      <img src={image} style={{ width: `100%`, height: `100%`, objectFit: 'cover' }} />
    </div>;
  }
}
