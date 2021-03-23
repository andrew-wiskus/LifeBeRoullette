import React from 'react';
import { ColumnButtonRow } from './buttons/ColumnButtonRow';
import { LeftRightButtons } from './buttons/LeftRightButtons';
import { NumberButtons } from './buttons/NumberButtons';
import { RowButtonColumn } from './buttons/RowButtonColumn';
import { SelectFourButtons } from './buttons/SelectFourButtons';
import { TopBottomButtons } from './buttons/TopBottomButtons';
import { TwelvesButtonRow } from './buttons/TwelvesButtonRow';
import { ZeroButtonColumn } from './buttons/ZeroButtonColumn';

export class RoulleteBoard extends React.Component {
    public render(): JSX.Element {

        return <>
          <NumberButtons />
          <LeftRightButtons />
          <TopBottomButtons />
          <SelectFourButtons/>
          <ZeroButtonColumn/>
          <RowButtonColumn/>
          <ColumnButtonRow/>
          <TwelvesButtonRow/>
        </>
    }
}