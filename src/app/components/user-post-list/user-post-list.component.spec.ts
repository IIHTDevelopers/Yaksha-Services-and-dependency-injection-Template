import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';
import { UserPostListComponent } from './user-post-list.component';
import { DataService } from '../../services/data.service';
import { Post } from '../../models/post.model';
import { User } from '../../models/user.model';

class MockDataService {
  getPosts() {
    const posts: Post[] = [
      {
        id: 1, title: 'Post 1', body: 'This is the body of Post 1',
        userId: 0
      },
      {
        id: 2, title: 'Post 2', body: 'This is the body of Post 2',
        userId: 0
      }
    ];
    return of(posts);
  }

  getUsers() {
    const users: User[] = [
      {
        id: 1, name: 'User 1', email: 'user1@example.com',
        username: '',
        address: {
          street: '',
          city: '',
          zipcode: ''
        }
      },
      {
        id: 2, name: 'User 2', email: 'user2@example.com',
        username: '',
        address: {
          street: '',
          city: '',
          zipcode: ''
        }
      }
    ];
    return of(users);
  }
}

describe('UserPostListComponent', () => {
  let component: UserPostListComponent;
  let fixture: ComponentFixture<UserPostListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserPostListComponent],
      providers: [
        { provide: DataService, useClass: MockDataService }
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserPostListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('boundary', () => {
    it('should create the component', () => {
      expect(component).toBeTruthy();
    });

    it('should display the correct number of posts', () => {
      const postElements = fixture.debugElement.queryAll(By.css('ul:nth-of-type(1) li'));
      expect(postElements.length).toBe(2);
    });

    it('should display the correct post details', () => {
      const postElements = fixture.debugElement.queryAll(By.css('ul:nth-of-type(1) li'));
      expect(postElements[0].query(By.css('strong')).nativeElement.textContent).toBe('Post 1');
      expect(postElements[0].query(By.css('p:nth-of-type(2)')).nativeElement.textContent).toBe('This is the body of Post 1');
      expect(postElements[1].query(By.css('strong')).nativeElement.textContent).toBe('Post 2');
      expect(postElements[1].query(By.css('p:nth-of-type(2)')).nativeElement.textContent).toBe('This is the body of Post 2');
    });

    it('should display the correct number of users', () => {
      const userElements = fixture.debugElement.queryAll(By.css('ul:nth-of-type(2) li'));
      expect(userElements.length).toBe(2);
    });

    it('should display the correct user details', () => {
      const userElements = fixture.debugElement.queryAll(By.css('ul:nth-of-type(2) li'));
      expect(userElements[0].query(By.css('strong')).nativeElement.textContent).toBe('User 1');
      expect(userElements[0].query(By.css('p:nth-of-type(2)')).nativeElement.textContent).toBe('user1@example.com');
      expect(userElements[1].query(By.css('strong')).nativeElement.textContent).toBe('User 2');
      expect(userElements[1].query(By.css('p:nth-of-type(2)')).nativeElement.textContent).toBe('user2@example.com');
    });
  });
});
