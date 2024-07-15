import { Injectable } from '@angular/core';

export interface Workout {
  type: string;
  minutes: number;
}

export interface User {
  id: number;
  name: string;
  workouts: Workout[];
}

@Injectable({
  providedIn: 'root'
})
export class WorkoutService {
  private storageKey = 'workoutUsers';

  constructor() {
    if (!localStorage.getItem(this.storageKey)) {
      this.initializeUsers();
    }
  }

  getUsers(): User[] {
    const usersJson = localStorage.getItem(this.storageKey);
    return usersJson ? JSON.parse(usersJson) : [];
  }

  private initializeUsers(): void {
    const initialUsers: User[] = [
      {
        id: 1,
        name: 'John Doe',
        workouts: [
          { type: 'Running', minutes: 30 },
          { type: 'Cycling', minutes: 45 }
        ]
      },
      {
        id: 2,
        name: 'Jane Smith',
        workouts: [
          { type: 'Swimming', minutes: 60 },
          { type: 'Running', minutes: 20 }
        ]
      },
      {
        id: 3,
        name: 'Mike Johnson',
        workouts: [
          { type: 'Yoga', minutes: 50 },
          { type: 'Cycling', minutes: 40 }
        ]
      }
    ];

    localStorage.setItem(this.storageKey, JSON.stringify(initialUsers));
  }

  addUser(user: User): void {
    const users = this.getUsers();
    users.push(user);
    localStorage.setItem(this.storageKey, JSON.stringify(users));
  }

  updateUser(user: User): void {
    let users = this.getUsers();
    users = users.map(u => u.id === user.id ? user : u);
    localStorage.setItem(this.storageKey, JSON.stringify(users));
  }

  deleteUser(userId: number): void {
    let users = this.getUsers();
    users = users.filter(user => user.id !== userId);
    localStorage.setItem(this.storageKey, JSON.stringify(users));
  }
}
