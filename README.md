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

## API Endpoints

### User Routes

### 1\. User Sign Up

**Endpoint:** **`/api/auth/signup`**

- **Method:** **POST**
- **Request Headers:**

```json
{
  "Authorization": "Bearer jwt_token"
}
```

**Request Body:**

```json
{
  "name": "Programming Hero",
  "email": "web@programming-hero.com",
  "password": "ph-password",
  "phone": "1234567890",
  "role": "admin", //role can be user or admin
  "address": "123 Main Street, City, Country"
}
```

**Response**:

```json
{
  "success": true,
  "statusCode": 200,
  "message": "User registered successfully",
  "data": {
    "_id": "60629b8e8cfcd926384b6e5e",
    "name": "Programming Hero",
    "email": "web@programming-hero.com",
    "phone": "1234567890",
    "role": "admin",
    "address": "123 Main Street, City, Country",
    "createdAt": "2024-06-15T12:00:00Z", // For this, ensure that your model includes the option to enable timestamps
    "updatedAt": "2024-06-15T12:00:00Z" // For this, ensure that your model includes the option to enable timestamps
  }
}
```

###

### 2\. User Login

**Endpoint:** **`/api/auth/signup`**

- **Method:** **POST**
- **Request Headers:**

```json
{
  "Authorization": "Bearer jwt_token"
}
```

**Request Body:**

```json
{
  "email": "web@programming-hero.com",
  "password": "ph-password"
}
```

**Response:**

```json
{
  "success": true,
  "statusCode": 200,
  "message": "User logged in successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MDYyOWI4ZThjZmNkOTI2Mzg0YjZlNWUiLCJuYW1lIjoiUHJvZ3JhbW1pbmcgSGVyb3MiLCJlbWFpbCI6IndlYkBwcm9ncmFtbWluZy1oZXJvLmNvbSIsInBob25lIjoiMTIzNDU2Nzg5MCIsInJvbGUiOiJhZG1pbiIsImFkZHJlc3MiOiIxMjMgTWFpbiBTdHJlZXQsIENpdHksIENvdW50cnkiLCJpYXQiOjE2MjQ1MTY2MTksImV4cCI6MTYyNDUyMDYxOX0.kWrEphO6lE9P5tvzrNBwx0sNogNuXpdyG-YoN9fB1W8",
  "data": {
    "_id": "60629b8e8cfcd926384b6e5e",
    "name": "Programming Hero",
    "email": "web@programming-hero.com",
    "phone": "1234567890",
    "role": "admin",
    "address": "123 Main Street, City, Country",
    "createdAt": "2024-06-15T12:00:00Z", // For this, ensure that your model includes the option to enable timestamps
    "updatedAt": "2024-06-15T12:00:00Z" // For this, ensure that your model includes the option to enable timestamps
  }
}
```

###

### **3\. Create Service (Only Accessible by Admin)**

**Endpoint:** **`/api/services`**

- **Method:** **POST**
- **Request Headers:**

```json
{
  "Authorization": "Bearer jwt_token"
}
```

**Request Body:**

```json
{
  "name": "Car Wash",
  "description": "Professional car washing service",
  "price": 50,
  "duration": 60, // Duration in minutes
  "isDeleted": false
}
```

**Response Body:**

```json
{
  "success": true,
  "statusCode": 200,
  "message": "Service created successfully",
  "data": {
    "_id": "60d9c4e4f3b4b544b8b8d1c5",
    "name": "Car Wash",
    "description": "Professional car washing service",
    "price": 50,
    "duration": 60,
    "isDeleted": false,
    "createdAt": "2024-06-15T12:00:00Z",
    "updatedAt": "2024-06-15T12:00:00Z"
  }
}
```

###

### **4\. Get a Service**

**Endpoint:** **`/api/services/:id`**

- **Method:** **GET**

**Response:**

```json
{
  "success": true,
  "statusCode": 200,
  "message": "Service retrieved successfully",
  "data": {
    "_id": "60d9c4e4f3b4b544b8b8d1c5",
    "name": "Car Wash",
    "description": "Professional car washing service",
    "price": 50,
    "duration": 60,
    "isDeleted": false,
    "createdAt": "2024-06-15T12:00:00Z",
    "updatedAt": "2024-06-15T12:00:00Z"
  }
}
```

### **5\. Get All Services**

**Endpoint:** **`/api/services`**

- **Method:** **GET**

**Response:**

```json
{
    "success": true,
    "statusCode": 200,
    "message": "Services retrieved successfully",
    "data": [
        {
            "_id": "60d9c4e4f3b4b544b8b8d1c5",
            "name": "Car Wash",
            "description": "Professional car washing service",
            "price": 50,
            "duration": 60,
            "isDeleted": false,
            "createdAt": "2024-06-15T12:00:00Z",
            "updatedAt": "2024-06-15T12:00:00Z",
        },
        {
            "_id": "60d9c4e4f3b4b544b8b8d1c6",
            "name": "Oil Change",
            "description": "Regular engine oil change service",
            "price": 30,
            "duration": 30,
            "isDeleted": false,
            "createdAt": "2024-06-15T12:00:00Z",
            "updatedAt": "2024-06-15T12:00:00Z",
        },
        {
            "_id": "60d9c4e4f3b4b544b8b8d1c7",
            "name": "Tire Rotation",
            "description": "Rotation of vehicle tires",
            "price": 20,
            "duration": 45,
            "isDeleted": false,
            "createdAt": "2024-06-15T12:00:00Z",
            "updatedAt": "2024-06-15T12:00:00Z", s
        }
    ]
}
```

### **6\. Update Services (Only Accessible by Admin)**

**Endpoint:** **`/api/services/:id`**

- **Method:** **PUT**
- **Request Headers:**

```json
{
  "Authorization": "Bearer jwt_token"
}
```

**Request Body:**

```json
{
  "price": 700
}
```

**Response Body:**

```json
{
  "success": true,
  "statusCode": 200,
  "message": "Service updated successfully",
  "data": {
    "_id": "60d9c4e4f3b4b544b8b8d1c5",
    "name": "Car Wash",
    "description": "Professional car washing service",
    "price": 700,
    "duration": 60,
    "isDeleted": false,
    "createdAt": "2024-06-15T12:00:00Z",
    "updatedAt": "2024-06-15T12:00:00Z"
  }
}
```

### **7\. Delete a Service (Only Accessible by Admin)(soft delete)**

**Endpoint:** **`/api/services/:id`**

- **Method:** **DELETE**
- **Request Headers:**

```json
{
  "Authorization": "Bearer jwt_token"
}
```

**Response Body:**

```json
{
  "success": true,
  "statusCode": 200,
  "message": "Service deleted successfully",
  "data": {
    "_id": "60d9c4e4f3b4b544b8b8d1c5",
    "name": "Car Wash",
    "description": "Professional car washing service",
    "price": 50,
    "duration": 60,
    "isDeleted": true,
    "createdAt": "2024-06-15T12:00:00Z",
    "updatedAt": "2024-06-15T12:00:00Z"
  }
}
```

### 8.**Create Slot (Only Accessible by Admin)**

**Endpoint:** **`/api/services/slots`**

- **Method:** **POST**
- **Request Headers:**

```json
{
  "Authorization": "Bearer jwt_token"
}
```

**Request Body:**

```json
{
  "service": "60d9c4e4f3b4b544b8b8d1c5",
  "date": "2024-06-15",
  "startTime": "09:00",
  "endTime": "14:00"
}
```

**Response Body:**

```json
{
  "success": true,
  "statusCode": 200,
  "message": "Slots created successfully",
  "data": [
    {
      "_id": "60d9c4e4f3b4b544b8b8d1c6",
      "service": "60d9c4e4f3b4b544b8b8d1c5",
      "date": "2024-06-15",
      "startTime": "09:00",
      "endTime": "10:00",
      "isBooked": "available",
      "createdAt": "2024-06-15T12:00:00Z",
      "updatedAt": "2024-06-15T12:00:00Z"
    },
    {
      "_id": "60d9c4e4f3b4b544b8b8d1c7",
      "service": "60d9c4e4f3b4b544b8b8d1c5",
      "date": "2024-06-15",
      "startTime": "10:00",
      "endTime": "11:00",
      "isBooked": "available",
      "createdAt": "2024-06-15T12:00:00Z",
      "updatedAt": "2024-06-15T12:00:00Z"
    },
    {
      "_id": "60d9c4e4f3b4b544b8b8d1c7",
      "service": "60d9c4e4f3b4b544b8b8d1c5",
      "date": "2024-06-15",
      "startTime": "11:00",
      "endTime": "12:00",
      "isBooked": "available",
      "createdAt": "2024-06-15T12:00:00Z",
      "updatedAt": "2024-06-15T12:00:00Z"
    },
    {
      "_id": "60d9c4e4f3b4b544b8b8d1c7",
      "service": "60d9c4e4f3b4b544b8b8d1c5",
      "date": "2024-06-15",
      "startTime": "12:00",
      "endTime": "13:00",
      "isBooked": "available",
      "createdAt": "2024-06-15T12:00:00Z",
      "updatedAt": "2024-06-15T12:00:00Z"
    },
    {
      "_id": "60d9c4e4f3b4b544b8b8d1c7",
      "service": "60d9c4e4f3b4b544b8b8d1c5",
      "date": "2024-06-15",
      "startTime": "13:00",
      "endTime": "14:00",
      "isBooked": "available",
      "createdAt": "2024-06-15T12:00:00Z",
      "updatedAt": "2024-06-15T12:00:00Z"
    }
  ]
}
```

### **9\. Get available slots**

**Endpoint:** **`/api/slots/availability`**

- **Method:** **POST**
- **Query Parameters:**
  - `date`: (Optional) The specific date for which available slots are requested (format: YYYY-MM-DD).
  - `serviceId`: (Optional) ID of the service for which available slots are requested.

**Request Example:**

```plain
  GET /api/slots/availability?date=2024-06-15&serviceId=60d9c4e4f3b4b544b8b8d1c5
```

**Response:**

```json
{
  "success": true,
  "statusCode": 200,
  "message": "Available slots retrieved successfully",
  "data": [
    {
      "_id": "60d9c4e4f3b4b544b8b8d1c6",
      "service": {
        "_id": "60d9c4e4f3b4b544b8b8d1c5",
        "name": "Car Wash",
        "description": "Professional car washing service",
        "price": 700,
        "duration": 60,
        "isDeleted": false,
        "createdAt": "2024-06-15T12:00:00Z",
        "updatedAt": "2024-06-15T12:00:00Z"
      },
      "date": "2024-06-15",
      "startTime": "09:00",
      "endTime": "10:00",
      "isBooked": "available",
      "createdAt": "2024-06-15T12:00:00Z",
      "updatedAt": "2024-06-15T12:00:00Z"
    },
    {
      "_id": "60d9c4e4f3b4b544b8b8d1c9",
      "service": {
        "_id": "60d9c4e4f3b4b544b8b8d1c5",
        "name": "Car Wash",
        "description": "Professional car washing service",
        "price": 700,
        "duration": 60,
        "isDeleted": false,
        "createdAt": "2024-06-15T12:00:00Z",
        "updatedAt": "2024-06-15T12:00:00Z"
      },
      "date": "2024-06-15",
      "startTime": "10:00",
      "endTime": "11:00",
      "isBooked": "canceled",
      "createdAt": "2024-06-15T12:00:00Z",
      "updatedAt": "2024-06-15T12:00:00Z"
    }
  ]
}
```

### **10\. Book a Service (Only Accessible by User)**

**Endpoint:** **`/api/bookings`**

- **Method:** **POST**
- **Request Headers:**

```json
{
  "Authorization": "Bearer jwt_token"
}
```

**Request Body:**

```json
{
  "serviceId": "60d9c4e4f3b4b544b8b8d1c5",
  "slotId": "60d9c4e4f3b4b544b8b8d1c6",
  "vehicleType": "car",
  "vehicleBrand": "Toyota",
  "vehicleModel": "Camry",
  "manufacturingYear": 2020,
  "registrationPlate": "ABC123"
}
```

**Response Body:**

```json
{
  "success": true,
  "statusCode": 200,
  "message": "Booking successful",
  "data": {
    "_id": "60d9c4e4f3b4b544b8b8d1c7",
    "customer": {
      "_id": "123456789012345678901234",
      "name": "John Doe",
      "email": "johndoe@example.com",
      "phone": "1234567890",
      "address": "123 Main Street, City, Country"
    },
    "service": {
      "_id": "60d9c4e4f3b4b544b8b8d1c5",
      "name": "Car Wash",
      "description": "Exterior and interior car cleaning",
      "price": 50,
      "duration": 30,
      "isDeleted": false
    },
    "slot": {
      "_id": "60d9c4e4f3b4b544b8b8d1c6",
      "service": "60d9c4e4f3b4b544b8b8d1c5",
      "date": "2024-06-15",
      "startTime": "09:00",
      "endTime": "10:00",
      "isBooked": "booked" // Updated to "booked"
    },
    "vehicleType": "car",
    "vehicleBrand": "Toyota",
    "vehicleModel": "Camry",
    "manufacturingYear": 2020,
    "registrationPlate": "ABC123",
    "createdAt": "2024-06-15T12:00:00Z",
    "updatedAt": "2024-06-15T12:00:00Z"
  }
}
```

### **11\. Get All Bookings (Only Accessible by Admin)**

**Endpoint:** **`/api/bookings`**

- **Method:** **GET**
- **Request Headers:**

```json
{
  "Authorization": "Bearer jwt_token"
}
```

**Response Body:**

```json
{
  "success": true,
  "statusCode": 200,
  "message": "All bookings retrieved successfully",
  "data": [
    {
      "_id": "60d9c4e4f3b4b544b8b8d1c7",
      "customer": {
        "_id": "123456789012345678901234",
        "name": "John Doe",
        "email": "johndoe@example.com",
        "phone": "1234567890",
        "address": "123 Main Street, City, Country"
      },
      "service": {
        "_id": "60d9c4e4f3b4b544b8b8d1c5",
        "name": "Car Wash",
        "description": "Exterior and interior car cleaning",
        "price": 50,
        "duration": 30,
        "isDeleted": false
      },
      "slot": {
        "_id": "60d9c4e4f3b4b544b8b8d1c6",
        "service": "60d9c4e4f3b4b544b8b8d1c5",
        "date": "2024-06-15",
        "startTime": "09:00",
        "endTime": "09:30",
        "isBooked": "booked"
      },
      "vehicleType": "car",
      "vehicleBrand": "Toyota",
      "vehicleModel": "Camry",
      "manufacturingYear": 2020,
      "registrationPlate": "ABC123",
      "createdAt": "2024-06-15T12:00:00Z",
      "updatedAt": "2024-06-15T12:00:00Z"
    },
    {
      "_id": "60d9c4e4f3b4b544b8b8d1c8",
      "customer": {
        "_id": "234567890123456789012345",
        "name": "Jane Smith",
        "email": "janesmith@example.com",
        "phone": "0987654321",
        "address": "456 Oak Street, City, Country"
      },
      "service": {
        "_id": "60d9c4e4f3b4b544b8b8d1c5",
        "name": "Car Wash",
        "description": "Exterior and interior car cleaning",
        "price": 50,
        "duration": 30,
        "isDeleted": false
      },
      "slot": {
        "_id": "60d9c4e4f3b4b544b8b8d1c9",
        "service": "60d9c4e4f3b4b544b8b8d1c5",
        "date": "2024-06-15",
        "startTime": "10:00",
        "endTime": "10:30",
        "isBooked": "canceled"
      },
      "vehicleType": "car",
      "vehicleBrand": "Honda",
      "vehicleModel": "Accord",
      "manufacturingYear": 2018,
      "registrationPlate": "XYZ456",
      "createdAt": "2024-06-15T13:00:00Z",
      "updatedAt": "2024-06-15T13:30:00Z"
    }
  ]

  // aditional bookings
}
```

### **12\. Get User's Bookings (Only Accessible by User)**

**Endpoint:** **`/api/my-bookings`**

- **Method:** **GET**
- **Request Headers:**

```json
{
  "Authorization": "Bearer jwt_token"
}
```

**Response Body:**

```json
{
  "success": true,
  "statusCode": 200,
  "message": "User bookings retrieved successfully",
  "data": [
    {
      "_id": "60d9c4e4f3b4b544b8b8d1c7",
      "service": {
        "_id": "60d9c4e4f3b4b544b8b8d1c5",
        "name": "Car Wash",
        "description": "Exterior and interior car cleaning",
        "price": 50,
        "duration": 30,
        "isDeleted": false
      },
      "slot": {
        "_id": "60d9c4e4f3b4b544b8b8d1c6",
        "service": "60d9c4e4f3b4b544b8b8d1c5",
        "date": "2024-06-15",
        "startTime": "09:00",
        "endTime": "09:30",
        "isBooked": "booked"
      },
      "vehicleType": "car",
      "vehicleBrand": "Toyota",
      "vehicleModel": "Camry",
      "manufacturingYear": 2020,
      "registrationPlate": "ABC123",
      "createdAt": "2024-06-15T12:00:00Z",
      "updatedAt": "2024-06-15T12:00:00Z"
    }
  ]
}
```

##
