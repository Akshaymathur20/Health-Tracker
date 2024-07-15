import { Component ,OnInit} from '@angular/core';
import { WorkoutService ,User} from '../workout.service';

@Component({
  selector: 'app-workout-list',
  standalone: true,
  imports: [],
  templateUrl: './workout-list.component.html',
  styleUrl: './workout-list.component.css'
})
export class WorkoutListComponent implements OnInit {
  users: User[] = [];
  filteredUsers: User[] = [];
  paginatedUsers: User[] = [];
  workoutTypes: string[] = [];
  searchName: string = '';
  filterType: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 5;
  totalPages: number = 1;

  constructor(private workoutService: WorkoutService) {}

  ngOnInit() {
    this.users = this.workoutService.getUsers();
    this.filteredUsers = [...this.users];
    this.workoutTypes = [...new Set(this.users.flatMap(user => user.workouts.map(workout => workout.type)))];
    this.totalPages = Math.ceil(this.filteredUsers.length / this.itemsPerPage);
    this.paginate();
  }

  search() {
    this.filteredUsers = this.users.filter(user =>
      user.name.toLowerCase().includes(this.searchName.toLowerCase())
    );
    this.filter();
  }

  filter() {
    if (this.filterType) {
      this.filteredUsers = this.filteredUsers.filter(user =>
        user.workouts.some(workout => workout.type.toLowerCase().includes(this.filterType.toLowerCase()))
      );
    }
    this.totalPages = Math.ceil(this.filteredUsers.length / this.itemsPerPage);
    this.currentPage = 1;
    this.paginate();
  }

  paginate() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.paginatedUsers = this.filteredUsers.slice(start, end);
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.paginate();
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.paginate();
    }
  }
}