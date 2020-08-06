import {Component, OnInit} from '@angular/core';
import {ItemModel} from '../models/item.model';
import {MatDialog} from '@angular/material';
import {ResultDialogComponent} from './result-dialog/result-dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'test-game';
  public time: number = null;
  private readonly maxScore: number = 10;
  public userScore = 0;
  public computerScore = 0;
  public fieldsArray: ItemModel[] = [];
  public activeFieldsArray: number[] = [];
  private attempt = 0;
  private intervalId = 0;

  constructor(
    public dialog: MatDialog
  ) {
  }

  ngOnInit() {
    this.createAllFields();
    this.generateActiveFieldsArray(0, 99);
  }

  public startGame() {
    if (this.userScore !== 10 && this.computerScore !== 10) {
      this.attempt++;
      this.activateField();
      this.intervalId = setInterval(() => {
        if (this.checkStatus() === 'computer') {
          clearInterval(this.intervalId);
          this.upComputerScore();
          this.startGame();
        }
      }, this.time);
    } else {
      this.openDialog();
    }
  }

  private checkStatus() {
    const item = this.fieldsArray[this.activeFieldsArray[this.attempt]];
    return item.status;
  }

  public clickField(index) {
    const item = this.fieldsArray[index];
    if (item.active) {
      item.onClick();
      clearInterval(this.intervalId);
      this.upUserScore();
      this.startGame();
    }
  }

  private generateActiveFieldsArray(min, max) {
    const set = new Set([]);
    for (let i = 0; i < 20; i++) {
      set.add(Math.round(0.5 + Math.random() * 100));
    }
    this.activeFieldsArray = Array.from(set);
  }

  private activateField() {
    const item = this.fieldsArray[this.activeFieldsArray[this.attempt]];
    item.start(this.time);
  }

  private upUserScore() {
    this.userScore += 1;
  }

  private upComputerScore() {
    this.computerScore++;
  }
  private result() {
    return this.userScore > this.computerScore ? 'Поздравляем, Вы выиграли!' : 'К сожалению, Вы проиграли.';
  }

  private openDialog(): void {
    this.dialog.open(ResultDialogComponent, {
      height: '100px',
      width: '300px',
      data: {
        result: this.result()
      }
    });
  }

  private createAllFields() {
    console.log('component init');
    for (let i = 0; i < 100; i++) {
      this.fieldsArray[i] = new ItemModel();
    }
  }

}
