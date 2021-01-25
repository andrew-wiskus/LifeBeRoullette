import React from 'react';
import fs from 'fs';
import Papa from 'papaparse';
import robot from 'robotjs';
import { ms } from '../util/wait';
import { inject, observer } from 'mobx-react';
import { ApplicationStore } from '../stores/ApplicationStore';
import { Marker } from '../stores/dataFromServer';
import { Perlin } from '../util/perlin';

interface XY {
  x: number;
  y: number;
}

enum MouseAction {
  CLICK,
}

@inject('applicationStore')
@observer
export class MouseTesting extends React.Component<
  { applicationStore: ApplicationStore },
  {}
> {
  private mouseData = new MouseData();

  componentDidMount = async () => {
    document.addEventListener('keyup', (event) => {
      console.log(event.key);
      if (event.key == '1') {
        this.fletch();
      }
    });
  };

  private async fletch() {
    await this.clickMarker('fl_bank');
    await ms(this.noise() * 500 + 300);

    await this.clickMarker('fl_deposit');
    await ms(this.noise() * 500 + 300);

    await this.clickMarker('fl_withdraw_log');
    await ms(this.noise() * 500 + 300);

    await this.clickMarker('fl_close_bank');
    await ms(this.noise() * 500 + 300);

    await this.clickMarker('fl_knife');
    await ms(this.noise() * 500 + 300);

    await this.clickMarker('fl_deposit');
    await ms(this.noise() * 500 + 300);

    await this.clickMarker('fl_make_bow');
    await ms(this.noise() * 500 + 300);
  }

  private async moveMouse(pos: XY, pos2: XY, action?: MouseAction) {
    // move mouse from position to position over time!
    let mouseRecords = this.mouseData.clickToClick[
      Math.floor(Math.random() * 100)
    ].normalizeFor(pos, pos2);

    console.log(mouseRecords);

    mouseRecords.forEach(async (x, i) => {
      let thinner_index = 1;
      if (mouseRecords.length > 100) {
        thinner_index += 1;
      }
      if (mouseRecords.length > 200) {
        thinner_index += 1;
      }
      if (mouseRecords.length > 300) {
        thinner_index += 1;
      }
      if (mouseRecords.length > 400) {
        thinner_index += 1;
      }
      if (mouseRecords.length > 500) {
        thinner_index += 1;
      }

      if (i % thinner_index == 0 || i == mouseRecords.length - 1) {
        robot.moveMouse(x.x + pos.x, x.y - pos.y);
        await ms(x.ms);
      }
    });

    if (action == MouseAction.CLICK) {
      robot.mouseClick();
    }

    await ms(50 + this.noise() * 100);
    return Promise.resolve();
  }

  private pn = new Perlin(Math.random());
  private x = 0;
  private y = 0;

  private noise = () => {
    this.x += 0.21;
    this.y += 0.21;
    return this.pn.noise(this.x, this.y, 0);
  };

  private async clickMarker(markerName: string) {
    let marker = this.props.applicationStore!.markers.find(
      (x) => x.name == markerName
    );
    if (marker == undefined) {
      throw Error('couldnt find marker');
    }
    let width = marker.right - marker.left;
    let height = marker.bottom - marker.top;

    const rand_x = marker.left + width * this.noise();
    const rand_y = marker.top + height * this.noise();

    let TEST_X = 1.5 * rand_x;
    let TEST_Y = 1.5 * rand_y;

    let true_x = this.props.applicationStore!.screen_location_x + TEST_X;
    let true_y = this.props.applicationStore!.screen_location_y + TEST_Y;

    await this.moveMouse(
      { x: robot.getMousePos().x, y: -1 * robot.getMousePos().y },
      { x: true_x, y: true_y * -1 },
      MouseAction.CLICK
    );
  }

  public render(): JSX.Element {
    // console.log(robot.getMousePos().x + ',' + robot.getMousePos().y);
    return (
      <div style={styles.container}>
        <h1>hello osrs</h1>
        {this.props.applicationStore!.markers.map((marker: Marker) => {
          return (
            <button
              style={{ height: 200, width: 200 }}
              onClick={() => {
                this.clickMarker('fl_bank');
              }}
            >
              {marker.name}
            </button>
          );
        })}
      </div>
    );
  }
}

const styles = {
  container: {
    backgroundColor: 'black',
    fontFamily: 'courier',
    color: 'white',
    height: `100vh`,
    width: `100vw`,
    display: 'flex',
    padding: 20,
  },
};

class MouseData {
  private csvRecords: string[][] = [];
  public clickToClick: ClickToClickRecording[] = [];

  constructor() {
    fs.readFile('src/data/mouseMovement.csv', 'utf8', (err, data) => {
      if (err) {
        throw err;
      }
      Papa.parse(data, {
        complete: (results: any) => {
          this.csvRecords = results.data;
          this.setup();
        },
      });
    });
  }

  public setup = () => {
    let csvData: string[][] = this.csvRecords; // TODO
    let records: MouseRecord[] = [];
    let clickToClick: ClickToClickRecording[] = [];
    let temp: MouseRecord[] = [];

    // parses CSV data
    csvData.forEach((row) => {
      let x: number = parseInt(row[0]);
      let y: number = parseInt(row[1]);
      let ms: number = parseInt(row[2]);
      let button: number = parseInt(row[3]);

      let recording: MouseRecord = new MouseRecord(x, y, ms, button);
      records.push(recording);
    });

    // seperates records from 'left click' to 'left click' to get path
    records.forEach((record) => {
      if (record.isLeftClick()) {
        temp.push(record);
        let arrayListClone: MouseRecord[] = [...temp];
        let cc = new ClickToClickRecording(arrayListClone);

        if (
          cc.timeBetweenClicks() != 0 &&
          cc.timeBetweenClicks() > 100 &&
          cc.timeBetweenClicks() < 2000
        ) {
          clickToClick.push(cc);
        }

        temp = [];
        temp.push(record);
      } else {
        temp.push(record);
      }
    });

    this.clickToClick = clickToClick;
  };
}

class ClickToClickRecording {
  public records: MouseRecord[];
  public rotationAngle: number;

  public startClick(): MouseRecord {
    return this.records[0];
  }

  public endClick(): MouseRecord {
    return this.records[this.records.length - 1];
  }

  constructor(records: MouseRecord[]) {
    this.records = this.normalizeMs(records);
    let mouseDestination: MouseRecord = this.records[this.records.length - 1];
    this.rotationAngle = this.getRotationAngle({
      x: mouseDestination.x,
      y: mouseDestination.y,
    });
    this.records = this.normalizeXY(this.records);
  }

  private normalizeMs(recordings: MouseRecord[]): MouseRecord[] {
    let norm: MouseRecord[] = [];
    let initialMS: number = 0;

    recordings.forEach((record) => {
      if (initialMS == 0) {
        initialMS = record.ms;
      }
      let ms = record.ms - initialMS;

      let nx: number = record.x - recordings[0].x;
      let ny: number = record.y - recordings[0].y;

      let n: MouseRecord = new MouseRecord(nx, ny, ms, record.button);
      norm.push(n);
    });

    return norm;
  }

  private normalizeXY(recordings: MouseRecord[]): MouseRecord[] {
    let norm: MouseRecord[] = [];

    recordings.forEach((record) => {
      let p: XY = this.rotateByEndAngle(record.x, record.y, this.rotationAngle);
      let px: number = p.x;
      let py: number = p.y;
      let n: MouseRecord = new MouseRecord(px, py, record.ms, record.button);
      norm.push(n);
    });

    return norm;
  }

  public timeBetweenClicks(): number {
    let times: number[] = [];

    this.records.forEach((record) => {
      if (record.isLeftClick()) {
        times.push(record.ms);
      }
    });

    if (times.length > 2 || times.length < 2) {
      return 0;
    }

    return times[1] - times[0];
  }

  public distanceBetweenClicks(): number {
    let p1: MouseRecord = this.startClick();
    let p2: MouseRecord = this.endClick();

    let a: number = p1.x - p2.x;
    let b: number = p1.y - p2.y;
    let x: number = Math.pow(a, 2) + Math.pow(b, 2);
    return Math.round(Math.sqrt(x));
  }

  private getRotationAngle(m2: XY): number {
    let a: number = m2.y;
    let c: number = m2.x;
    let b: number = Math.sqrt(
      Math.pow(a, 2) +
        Math.pow(c, 2) -
        2 * a * c * Math.cos(degrees_to_radians(90))
    );

    let angleA: number = Math.acos(
      (Math.pow(b, 2) + Math.pow(c, 2) - Math.pow(a, 2)) / (2 * b * c)
    );

    if (m2.x < 0 && m2.y < 0) {
      return angleA;
    } else if (m2.x < 0) {
      return (
        angleA +
        (degrees_to_radians(180) - angleA * 2) +
        degrees_to_radians(180)
      );
    } else if (m2.y < 0) {
      return angleA;
    } else {
      return degrees_to_radians(360) - angleA;
    }
  }

  private rotateByEndAngle(x: number, y: number, angle: number): XY {
    let xp: number = x * Math.cos(angle) - y * Math.sin(angle);
    let yp: number = x * Math.sin(angle) + y * Math.cos(angle);

    return { x: xp, y: yp };
  }

  private distance(xy1: XY, xy2: XY): number {
    let a: number = xy1.x - xy2.x;
    let b: number = xy1.y - xy2.y;
    let x: number = Math.pow(a, 2) + Math.pow(b, 2);

    let newDistance: number = Math.sqrt(x);

    return newDistance;
  }

  public normalizeFor(xy1: XY, xy2: XY): MouseRecord[] {
    let normAngle: MouseRecord[] = [];
    let normDistance: MouseRecord[] = [];
    let norm: MouseRecord[] = [];

    // shrink/expand to distance
    // find rotation
    // apply rotation
    // apply slope

    let normalizedXY2: XY = {
      x: xy2.x - xy1.x,
      y: xy2.y - xy1.y,
    };
    let angle: number = this.getRotationAngle(normalizedXY2);

    this.records.forEach((record) => {
      let p: XY = this.rotateByEndAngle(record.x, record.y, angle);
      let px: number = p.x;
      let py: number = p.y;

      let n: MouseRecord = new MouseRecord(px, py, record.ms, record.button);

      normAngle.push(n);
    });

    let oxy1: XY = {
      x: this.records[0].x,
      y: this.records[0].y,
    };
    let oxy2: XY = {
      x: this.records[this.records.length - 1].x,
      y: this.records[this.records.length - 1].y,
    };
    let oldDistance: number = this.distance(oxy1, oxy2);
    let newDistance: number = this.distance(xy1, xy2);
    let factor: number = newDistance / oldDistance;

    normAngle.forEach((record) => {
      let nx: number = factor * record.x;
      let ny: number = factor * record.y;
      normDistance.push(new MouseRecord(nx, ny, record.ms, record.button));
    });

    normDistance.forEach((record) => {
      let nx: number = record.x;
      let ny: number = record.y;
      norm.push(new MouseRecord(nx, ny, record.ms, record.button));
    });

    return norm;
  }
}

class MouseRecord {
  public x: number;
  public y: number;
  public ms: number;
  public button: number;

  constructor(x: number, y: number, ms: number, button: number) {
    this.x = x;
    this.y = y;
    this.ms = ms;
    this.button = button;
  }

  public isLeftClick(): boolean {
    return this.button == 1;
  }
}

function degrees_to_radians(degrees: number) {
  var pi = Math.PI;
  return degrees * (pi / 180);
}
