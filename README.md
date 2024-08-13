##### live-hosting: <https://car-washing-system-server.vercel.app/>

##### postman-document: <https://documenter.getpostman.com/view/29627960/2sA2r3amLL>

# Getting started

To get the Node server running locally:

- Clone this repo
- `npm install` to install all required dependencies
- create .env file in root directory. with the given variable.
  ```env
    NODE_ENV=development
    PORT= 5000
    DATABASE_URL= //your_database_url
    BCRYPT_SALT_ROUNDS=//enter a number
    JWT_ACCESS_SECRET=//enter your jwt access secret
    JWT_ACCESS_EXPIRES_IN=//for example: 2d
  ```
- `npm run start:dev` to start the local server

# Code Overview

## Dependencies

- [expressjs](https://github.com/expressjs/express) - The server for handling and routing HTTP requests
- [mongoose](https://github.com/Automattic/mongoose) - For modeling and mapping MongoDB data to javascript
- [zod](https://github.com/Automattic/mongoose) - For schema validation
- [cors](https://github.com/Automattic/mongoose) - For handling cross origin request
- [dotenv](https://github.com/Automattic/mongoose) - To secure environment variable
- [bcrypt](https://github.com/Automattic/mongoose) - To secure environment variable
- [jsonwebtoken](https://github.com/Automattic/mongoose) - To secure environment variable

## Application Structure

- `app.js` - This file defines our app.Here we setup our application middlewares. It also requires the routes.
- `server.js` - The entry point to our application. This file defines our express server and connects it to MongoDB using mongoose.
- `config/` - This folder contains configuration for configuration/environment variables.
- `modules/` - This folder contains modules. Here we followed the modulers software design pattern.
- `middleware/` - This folder contains application all middleware.
- `utils/` - This folder contains utilities functions.
- `error/` - This folder contains error handling related functions.
- `interface/` - This folder contains global interfaces.
- `types/` - This folder contains global types.
- `error/` - This folder contains error related operations.

## Entity-Relationship Diagram

### Entities

#### User

- Fields:
  - \_id (PK)
  - title
  - price
  - author
  - releaseDate
  - isbn
  - genre
  - publisher
  - series
  - language
  - pageCount
  - quantity
- bookFormat

#### Service

- Fields:
  - \_id (PK)
  - productId (FK
  - quantity
  - buyerName
  - dateOfSale
  - totalPrice

#### Slot

- Fields:
  - \_id (PK)
  - email
  - password
  - role

#### Booking

- Fields:
  - \_id (PK)
  - email
  - password
  - role

![ER Diagram](./er-diagram.png)

## Routes

### Register a new User

**Endpoint:** \*_`/api/v1/users/register`_

- **Method:** **POST**
- **Request Headers:**

```json
{
  "Authorization": "token"
}
```

- **Request Body:**

```json
{
  "email": "arifusls@gmail.com",
  "password": "ariful",
  "role": "user"
}
```

- **Response:**

```json
{
  "success": true,
  "statusCode": 201,
  "message": "User registered succesfully"
  "data": {
        "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFyaWZ1c2xzc3NAZ21haWwuY29tIiwicm9sZSI6InVzZXIiLCJpYXQiOjE3MDc3NTQyMzIsImV4cCI6MTcwNzg0MDYzMn0.D5OksSLheihG8twbQK_2xpZY7gBTxI4iuR5hmnwaqWc"
    }
}
```

### Login User

**Endpoint:** \*_`/api/v1/auth/login`_

- **Method:** **POST**
- **Request Headers:**

```json
{
  "Authorization": "jwt_token"
}
```

- **Request Body:**

```json
{
  "email": "arifusls@gmail.com",
  "password": "ariful"
}
```

- **Response:**

```json
{
  "success": true,
  "statusCode": 201,
  "message": "User  login succesfully"
  "data": {
        "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFyaWZ1c2xzc3NAZ21haWwuY29tIiwicm9sZSI6InVzZXIiLCJpYXQiOjE3MDc3NTQyMzIsImV4cCI6MTcwNzg0MDYzMn0.D5OksSLheihG8twbQK_2xpZY7gBTxI4iuR5hmnwaqWc"
    }
}
```

### Create a new book

**Endpoint:** **`/api/v1/books`**

- **Method:** **POST**
- **Request Headers:**

```json
{
  "Authorization": "jwt_token"
}
```

- **Request Body:**

```json
{
  "title": "Harry Potter and the Philosopher's Stone",
  "price": 13.99,
  "author": "J.K. Rowling",
  "releaseDate": "June 26, 1997",
  "isbn": 9780590353427,
  "genre": "Fantasy",
  "publisher": "Bloomsbury",
  "series": "Harry Potter",
  "language": "English",
  "pageCount": 352,
  "quantity": 200,
  "bookFormat": "paperback"
}
```

- **Response:**

```json
{
  "success": true,
  "message": "Book added successfully",
  "data": {
    "title": "Harry Potter and the Philosopher's Stone",
    "price": 13.99,
    "author": "J.K. Rowling",
    "releaseDate": "June 26, 1997",
    "isbn": 9780590353427,
    "genre": "Fantasy",
    "publisher": "Bloomsbury",
    "series": "Harry Potter",
    "language": "English",
    "pageCount": 352,
    "quantity": 200,
    "bookFormat": "paperback",
    "_id": "65ca5d621bd5549dd8156a2b",
    "__v": 0
  }
}
```

### Update book

**Endpoint:** **`/api/v1/books/id`**

- **Method:** **PUT**
- **Request Headers:**

```json
{
  "Authorization": "jwt_token"
}
```

- **Request Body:**

```json
{
  "quantity": 100,
  "price": 50.22
}
```

- **Response:**

```json
{
  "success": true,
  "message": "Book updated successfully",
  "data": {
    "_id": "65ca5d621bd5549dd8156a2b",
    "title": "Harry Potter and the Philosopher's Stone",
    "price": 50.22,
    "author": "J.K. Rowling",
    "releaseDate": "June 26, 1997",
    "isbn": 9780590353427,
    "genre": "Fantasy",
    "publisher": "Bloomsbury",
    "series": "Harry Potter",
    "language": "English",
    "pageCount": 352,
    "quantity": 100,
    "bookFormat": "paperback",
    "__v": 0
  }
}
```

### Get single book data

**Endpoint:** **`/api/v1/books/id`**

- **Method:** **GET**
- **Request Headers:**

```json
{
  "Authorization": "jwt_token"
}
```

- **Response:**

```json
{
  "success": true,
  "message": "Book data retrieve successfully",
  "data": {
    "_id": "65ca5d621bd5549dd8156a2b",
    "title": "Harry Potter and the Philosopher's Stone",
    "price": 50.22,
    "author": "J.K. Rowling",
    "releaseDate": "June 26, 1997",
    "isbn": 9780590353427,
    "genre": "Fantasy",
    "publisher": "Bloomsbury",
    "series": "Harry Potter",
    "language": "English",
    "pageCount": 352,
    "quantity": 100,
    "bookFormat": "paperback",
    "__v": 0
  }
}
```

### Get all books data

**Endpoint:** **`/api/v1/books?query`**

- **Method:** **GET**
- **Request Headers:**

```json
{
  "Authorization": "jwt_token"
}
```

- **Response:**

```json
{
    "success": true,
    "message": "All books data retrieve successfully",
    "data": [
        {
            "_id": "65c8b8f98448d8839803680d",
            "title": "1984",
            "price": 10.49,
            "author": "George Orwell",
            "releaseDate": "2024-02-11",
            "isbn": 9780451524935,
            "genre": "Science Fiction",
            "publisher": "Signet Classic",
            "language": "English",
            "pageCount": 328,
            "quantity": 150,
            "bookFormat": "paperback"
        },
		....rest data
    ]
}
```

### Get Books fitering value

**Endpoint:** **`/api/v1/books/categories`**

- **Method:** **GET**
- **Request Headers:**

```json
{
  "Authorization": "jwt_token"
}
```

- **Response:**

```json
{
  "success": true,
  "message": "All books data retrieve successfully",
  "data": {
    "publishers": [
      "Bloomsbury",
      "Penguin Classics",
      "Scribner",
      "Signet Classic"
    ],
    "genre": ["Fantasy", "Fiction", "Horror", "Science Fiction"],
    "series": ["Harry Potter"],
    "language": ["English"]
  }
}
```

### Delete single book

**Endpoint:** **`/api/v1/books/:id`**

- **Method:** **GET**
- **Request Headers:**

```json
{
  "Authorization": "jwt_token"
}
```

- **Response:**

```json
{
  "success": true,
  "message": "Book deleted successfully",
  "data": null
}
```

### Delete multiple books

**Endpoint:** **`/api/v1/books/bulk-delete`**

- **Method:** **DELETE**
- **Request Body:**
- **Request Headers:**

```json
{
  "Authorization": "jwt_token"
}
```

```json
[
    "65c8b9418448d8839803681c",
    "65c8b9068448d88398036810"
]
`
```

- **Response:**

```json
{
  "success": true,
  "message": "Books are deleted successfully",
  "data": null
}
```

### Add new sale

**Endpoint:** **`/api/v1/sales`**

- **Method:** **POST**
- **Request Headers:**

```json
{
  "Authorization": "jwt_token"
}
```

- **Request Body:**

```json
{
    "productId":"65c8b8f98448d8839803680d",
    "quantity":10,
    "buyerName":"Ariful Islam",
    "dateOfSale":"2024-01-01"
}
`
```

- **Response:**

```json
{
  "success": true,
  "message": "sale added successfully",
  "data": null
}
```

### Get daily sales statistics

**Endpoint:** **`/api/v1/sales/daily?date=2024-02-09`**

- **Method:** **GET**
- **Request Headers:**

```json
{
  "Authorization": "jwt_token"
}
```

- **Response:**

```json
{
  "success": true,
  "message": "daily sales statics retrieve successfully",
  "data": {
    "date": "2024-02-09",
    "totalSoldAmount": 0,
    "totalSoldProduct": 0
  }
}
```

### Get weekly sales data

**Endpoint:** **`/api/v1/sales/daily?date=2024-02-09`**

- **Method:** **GET**
- **Request Headers:**

```json
{
  "Authorization": "jwt_token"
}
```

- **Response:**

```json
{
  "success": true,
  "message": "weekly sales statics retrieve successfully",
  "data": {
    "averageSales": {
      "totalSoldAmount": 0,
      "totalSoldProduct": 0
    },
    "dailySales": [
      {
        "date": "2024-02-18",
        "totalSoldAmount": 0,
        "totalSoldProduct": 0
      },
      {
        "date": "2024-02-19",
        "totalSoldAmount": 0,
        "totalSoldProduct": 0
      },
      {
        "date": "2024-02-20",
        "totalSoldAmount": 0,
        "totalSoldProduct": 0
      },
      {
        "date": "2024-02-21",
        "totalSoldAmount": 0,
        "totalSoldProduct": 0
      },
      {
        "date": "2024-02-22",
        "totalSoldAmount": 0,
        "totalSoldProduct": 0
      },
      {
        "date": "2024-02-23",
        "totalSoldAmount": 0,
        "totalSoldProduct": 0
      },
      {
        "date": "2024-02-24",
        "totalSoldAmount": 0,
        "totalSoldProduct": 0
      }
    ]
  }
}
```

### Get monthly sales data

**Endpoint:** **`/api/v1/sales/daily?date=2024-02-09`**

- **Method:** **GET**
- **Request Headers:**

```json
{
  "Authorization": "jwt_token"
}
```

- **Response:**

```json
{
  "success": true,
  "message": "month sales statics retrieve successfully",
  "data": {
    "averageSales": {
      "totalSoldAmount": 0,
      "totalSoldProduct": 0
    },
    "dailySales": [
      {
        "date": "2024-08-01",
        "totalSoldAmount": 0,
        "totalSoldProduct": 0
      },
      {
        "date": "2024-08-02",
        "totalSoldAmount": 0,
        "totalSoldProduct": 0
      },
      {
        "date": "2024-08-03",
        "totalSoldAmount": 0,
        "totalSoldProduct": 0
      },
      {
        "date": "2024-08-04",
        "totalSoldAmount": 0,
        "totalSoldProduct": 0
      },
      {
        "date": "2024-08-05",
        "totalSoldAmount": 0,
        "totalSoldProduct": 0
      },
      {
        "date": "2024-08-06",
        "totalSoldAmount": 0,
        "totalSoldProduct": 0
      },
      {
        "date": "2024-08-07",
        "totalSoldAmount": 0,
        "totalSoldProduct": 0
      },
      {
        "date": "2024-08-08",
        "totalSoldAmount": 0,
        "totalSoldProduct": 0
      },
      {
        "date": "2024-08-09",
        "totalSoldAmount": 0,
        "totalSoldProduct": 0
      },
      {
        "date": "2024-08-10",
        "totalSoldAmount": 0,
        "totalSoldProduct": 0
      },
      {
        "date": "2024-08-11",
        "totalSoldAmount": 0,
        "totalSoldProduct": 0
      },
      {
        "date": "2024-08-12",
        "totalSoldAmount": 0,
        "totalSoldProduct": 0
      },
      {
        "date": "2024-08-13",
        "totalSoldAmount": 0,
        "totalSoldProduct": 0
      },
      {
        "date": "2024-08-14",
        "totalSoldAmount": 0,
        "totalSoldProduct": 0
      },
      {
        "date": "2024-08-15",
        "totalSoldAmount": 0,
        "totalSoldProduct": 0
      },
      {
        "date": "2024-08-16",
        "totalSoldAmount": 0,
        "totalSoldProduct": 0
      },
      {
        "date": "2024-08-17",
        "totalSoldAmount": 0,
        "totalSoldProduct": 0
      },
      {
        "date": "2024-08-18",
        "totalSoldAmount": 0,
        "totalSoldProduct": 0
      },
      {
        "date": "2024-08-19",
        "totalSoldAmount": 0,
        "totalSoldProduct": 0
      },
      {
        "date": "2024-08-20",
        "totalSoldAmount": 0,
        "totalSoldProduct": 0
      },
      {
        "date": "2024-08-21",
        "totalSoldAmount": 0,
        "totalSoldProduct": 0
      },
      {
        "date": "2024-08-22",
        "totalSoldAmount": 0,
        "totalSoldProduct": 0
      },
      {
        "date": "2024-08-23",
        "totalSoldAmount": 0,
        "totalSoldProduct": 0
      },
      {
        "date": "2024-08-24",
        "totalSoldAmount": 0,
        "totalSoldProduct": 0
      },
      {
        "date": "2024-08-25",
        "totalSoldAmount": 0,
        "totalSoldProduct": 0
      },
      {
        "date": "2024-08-26",
        "totalSoldAmount": 0,
        "totalSoldProduct": 0
      },
      {
        "date": "2024-08-27",
        "totalSoldAmount": 0,
        "totalSoldProduct": 0
      },
      {
        "date": "2024-08-28",
        "totalSoldAmount": 0,
        "totalSoldProduct": 0
      },
      {
        "date": "2024-08-29",
        "totalSoldAmount": 0,
        "totalSoldProduct": 0
      },
      {
        "date": "2024-08-30",
        "totalSoldAmount": 0,
        "totalSoldProduct": 0
      },
      {
        "date": "2024-08-31",
        "totalSoldAmount": 0,
        "totalSoldProduct": 0
      }
    ]
  }
}
```

### Get yearly sales data

**Endpoint:** **`/api/v1/sales/daily?date=2024-02-09`**

- **Method:** **GET**
- **Request Headers:**

```json
{
  "Authorization": "jwt_token"
}
```

- **Response:**

```json
{
  "success": true,
  "message": "yearly sales statics retrieve successfully",
  "data": {
    "averageSales": {
      "totalSoldAmount": 0,
      "totalSoldProduct": 0
    },
    "monthlySales": [
      {
        "date": "2023-01-01",
        "totalSoldAmount": 0,
        "totalSoldProduct": 0
      },
      {
        "date": "2023-02-01",
        "totalSoldAmount": 0,
        "totalSoldProduct": 0
      },
      {
        "date": "2023-03-01",
        "totalSoldAmount": 0,
        "totalSoldProduct": 0
      },
      {
        "date": "2023-04-01",
        "totalSoldAmount": 0,
        "totalSoldProduct": 0
      },
      {
        "date": "2023-05-01",
        "totalSoldAmount": 0,
        "totalSoldProduct": 0
      },
      {
        "date": "2023-06-01",
        "totalSoldAmount": 0,
        "totalSoldProduct": 0
      },
      {
        "date": "2023-07-01",
        "totalSoldAmount": 0,
        "totalSoldProduct": 0
      },
      {
        "date": "2023-08-01",
        "totalSoldAmount": 0,
        "totalSoldProduct": 0
      },
      {
        "date": "2023-09-01",
        "totalSoldAmount": 0,
        "totalSoldProduct": 0
      },
      {
        "date": "2023-10-01",
        "totalSoldAmount": 0,
        "totalSoldProduct": 0
      },
      {
        "date": "2023-11-01",
        "totalSoldAmount": 0,
        "totalSoldProduct": 0
      },
      {
        "date": "2023-12-01",
        "totalSoldAmount": 0,
        "totalSoldProduct": 0
      }
    ]
  }
}
```
