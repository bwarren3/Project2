import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class RosterService {
  private contestants: string[];
  constructor() {
    this.contestants = [];
  }

  getContestants(): string[] {
    return this.contestants;
  }

  addContestant(player: string | null) {
    if (player === null || player === '') {
      throw new Error('Contestant cannot be registered');
    } else if (this.contestants.includes(player, 0)) {
      throw new Error('Contestant already exists');
    }

    try {
      this.contestants.push(player);
    } catch (exception) {
      console.error(exception);
    }
  }

  resetContestants() {
    this.contestants = [];
  }
}
