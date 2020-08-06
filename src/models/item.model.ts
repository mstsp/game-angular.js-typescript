export class ItemModel {
  private time: number;
  public active: boolean;
  public status: string;
  public clicked: boolean;
  public intervalId: number;
  public delta: number;
  constructor(
    ) {
      this.time = 0;
      this.active = false;
      this.status = '';
      this.clicked = false;
      this.intervalId = 0;
      this.delta = 0;
  }
    start(time) {
      this.time = time;
      this.delta = time / 100;
      this.active = true;
      this.intervalId = setInterval(this.update.bind(this), this.delta);
    }
    onClick() {
      this.stop();
      this.clicked = true;
      this.status = 'user';
    }
    stop() {
      this.active = false;
      clearInterval(this.intervalId);
    }
    update() {
      if (this.time > 0) {
          this.time -= this.delta;
      } else {
        this.stop();
        this.status = 'computer';
      }
    }
}

