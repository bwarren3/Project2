import { Component, OnInit } from '@angular/core';
import { RosterService } from '../../services/rosterservice.service';

@Component({
  selector: 'app-brackets',
  templateUrl: './brackets.component.html',
  styleUrls: ['./brackets.component.css'],
})
export class BracketsComponent implements OnInit {
  public currentPlayers: string[];
  public roundWinners: string[];
  public roundNumber: number;
  public matches: number[];
  public message: string;

  constructor(private rosterService: RosterService) {
    this.currentPlayers = this.rosterService.getContestants();
    this.roundNumber = 1;
    this.matches = [];
    this.roundWinners = [];
    this.message = '';
  }

  setMatches() {
    if (this.currentPlayers.length <= 1) {
      throw new Error('Not enough players registered for a match');
    } else if (this.currentPlayers.length === 2) {
      this.rosterService.resetContestants();
      this.matches.pop();
    } else if (this.currentPlayers.length === 4) {
      this.matches.pop();
      this.roundNumber++;
    } else {
      this.matches.pop();
      this.matches.pop();
      this.roundNumber++;
    }
  }

  onSubmit() {
    this.message = '';

    //validate
    let modifiedWinners = this.roundWinners.filter((winner) => winner !== '');
    if (modifiedWinners.length != this.matches.length) {
      this.message = 'Please select a winner for each match';
      throw new Error('Please select a winner for each match');
      return;
    }

    this.setMatches();

    //keep track of winners
    this.currentPlayers = [];
    for (let index = 0; index < this.roundWinners.length; index++) {
      this.currentPlayers[index] = this.roundWinners[index];
    }

    //declare winner and/or reset for another round
    if (this.roundWinners.length === 1) {
      this.message = 'Winner: ' + this.roundWinners[0];
      this.roundWinners = [];
    } else {
      this.roundWinners = [];
    }
  }

  addMatches() {
    for (var index = 1; index < this.currentPlayers.length / 2 + 1; index++)
      this.matches.push(index);
  }

  trackByFn(index: any, item: any) {
    return index;
  }

  ngOnInit(): void {
    this.addMatches();
  }
}
