import React from 'react';

interface Props {
	timerIsRunning: boolean;
	onAnimationFrame: (timeObj: any) => void;
}

interface State {
	mm: string;
	ss: string;
	ms: string;
	timerIsRunning: boolean;
	startTime: number;
}

export interface TimeObj {
	mm: string, 
	ss: string, 
	ms: string, 
	string: string, 
	fullMS: number
}

export class Timer extends React.Component<Props, State> {
	public state: State = {
		mm: `00`,
		ss: `00`,
		ms: `00`,
		timerIsRunning: false,
		startTime: 0
	};

	public componentDidMount() {

	}

	public render() {
		return (
			<span>
				{this.state.mm}:{this.state.ss}:{this.state.ms}
			</span>
		);
	}
}

export const getTimeObj = (elapsed: number): TimeObj => {
	let mm: any = Math.floor(elapsed / 1000 / 60);
	let ss: any = Math.floor((elapsed / 1000) % 60);
	let ms: any = Math.floor((elapsed % 1000) / 10);

	mm = mm < 10 ? '0' + mm : '' + mm;
	ss = ss < 10 ? '0' + ss : '' + ss;
	ms = ms < 10 ? '0' + ms : '' + ms;

	let string = `${mm}:${ss}:${ms}`;
	let fullMS = elapsed;

	return { mm, ss, ms, string, fullMS };
};
