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

export class Timer extends React.Component<Props, State> {
	public state: State = {
		mm: `00`,
		ss: `00`,
		ms: `00`,
		timerIsRunning: false,
		startTime: 0
	};

	public componentDidMount() {
		const step = (ms: number) => {
			var timestamp = Math.floor(ms);

			if (this.props.timerIsRunning == false) {
				if (this.state.startTime != 0) {
					this.setState({ startTime: 0 });
				}
				window.requestAnimationFrame(step);
				return;
			}

			if (this.state.startTime == 0) {
				this.setState({ startTime: timestamp }, () => {
					window.requestAnimationFrame(step);
				});
				return;
			}

			let elapsed = timestamp - this.state.startTime;

			let time = getTimeObj(elapsed);
			this.props.onAnimationFrame(time);
			this.setState({ mm: time.mm, ss: time.ss, ms: time.ms });
			window.requestAnimationFrame(step);
		};

		window.requestAnimationFrame(step);
	}

	public render() {
		return (
			<span>
				{this.state.mm}:{this.state.ss}:{this.state.ms}
			</span>
		);
	}
}

export const getTimeObj = (elapsed: number) => {
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
