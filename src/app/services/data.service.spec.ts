import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { DataService } from './data.service';
import { User } from '../models/user.model';
import { Post } from '../models/post.model';

describe('DataService', () => {
  let service: DataService;
  let httpMock: HttpTestingController;
  const apiUrl = 'https://jsonplaceholder.typicode.com';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DataService]
    });
    service = TestBed.inject(DataService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('business', () => {
    it('should retrieve users from the API via GET', () => {
      const dummyUsers: User[] = [
        {
          id: 1, name: 'John Doe', email: 'john@example.com',
          username: '',
          address: {
            street: '',
            city: '',
            zipcode: ''
          }
        },
        {
          id: 2, name: 'Jane Doe', email: 'jane@example.com',
          username: '',
          address: {
            street: '',
            city: '',
            zipcode: ''
          }
        }
      ];

      service.getUsers().subscribe(users => {
        expect(users.length).toBe(2);
        expect(users).toEqual(dummyUsers);
      });

      const request = httpMock.expectOne(`${apiUrl}/users`);
      expect(request.request.method).toBe('GET');
      request.flush(dummyUsers);
    });

    it('should retrieve posts from the API via GET', () => {
      const dummyPosts: Post[] = [
        {
          id: 1, title: 'Post 1', body: 'This is the body of Post 1',
          userId: 0
        },
        {
          id: 2, title: 'Post 2', body: 'This is the body of Post 2',
          userId: 0
        }
      ];

      service.getPosts().subscribe(posts => {
        expect(posts.length).toBe(2);
        expect(posts).toEqual(dummyPosts);
      });

      const request = httpMock.expectOne(`${apiUrl}/posts`);
      expect(request.request.method).toBe('GET');
      request.flush(dummyPosts);
    });
  });
});
