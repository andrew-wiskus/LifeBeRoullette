import React from 'react'

interface Props {
    onClick: () => void;
    text: string;
    percent: number
}

export class Button extends React.Component<Props> {


    public render():JSX.Element {
        let percent = (this.props.percent == 0 ? 1 : this.props.percent) * 100

        return (
            <button onClick={this.props.onClick} style={{width: 200, height: 45, position: 'relative'}}>
                <span style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}>{this.props.text}</span>
                <div style={{ backgroundColor: 'red', position: 'absolute', top: 0, left: 0, right: `${(percent)}%`, bottom: 0 }} />
            </button>
        )
    }
}