import { Component ,OnInit} from '@angular/core';
import { WorkoutService,User,Workout } from '../workout.service';
@Component({
  selector: 'app-workout-form',
  standalone: true,
  imports: [],
  templateUrl: './workout-form.component.html',
  styleUrl: './workout-form.component.css'
})
export class WorkoutFormComponent {
  username: string = '';
  workoutType: string = '';
  workoutMinutes: number = 0;

  constructor(private workoutService: WorkoutService) {}

  addWorkout() {
    const newWorkout: Workout = {
      type: this.workoutType,
      minutes: this.workoutMinutes
    };
    let users = this.workoutService.getUsers();
    let user = users.find(u => u.name === this.username);
    if (user) {
      user.workouts.push(newWorkout);
      this.workoutService.updateUser(user);
    } else {
      const newUser: User = {
        id: users.length + 1,
        name: this.username,
        workouts: [newWorkout]
      };
      this.workoutService.addUser(newUser);
    }
    this.resetForm();
  }

  resetForm() {
    this.username = '';
    this.workoutType = '';
    this.workoutMinutes = 0;
  }
}