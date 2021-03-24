import React from 'react';
import { ColumnButtonRow } from './buttons_old/ColumnButtonRow';
import { LeftRightButtons } from './buttons_old/LeftRightButtons';
import { NumberButtons } from './buttons_old/NumberButtons';
import { RowButtonColumn } from './buttons_old/RowButtonColumn';
import { SelectFourButtons } from './buttons_old/SelectFourButtons';
import { TopBottomButtons } from './buttons_old/TopBottomButtons';
import { TwelvesButtonRow } from './buttons_old/TwelvesButtonRow';
import { ZeroButtonColumn } from './buttons_old/ZeroButtonColumn';

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