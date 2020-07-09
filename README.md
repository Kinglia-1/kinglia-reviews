## Server API

1. [GET Reviews (initial,all)](#get-initial-reviews-info)
1. [GET average scores](#get-average-scores-for-room)
1. [Delete review](#delete-review)

### Get initial reviews info (limited to 6)
  * GET `/api/reviews/:roomId/main`

### Get all reviews info
  * GET `/api/reviews/:roomId/all`

**Path Parameters:**
  * `roomId` room id

**Success Status Code:** `200`

**Returns:** Array of JSON objects

```json
    [
      {
        "_roomId": Number,
        "_reviewId": Unique Number,
        "user_name": String,
        "user_image": String,
        "user_url": String,
        "date": Date,
        "text": String,
        "scores": {
          "cleanliness": Number,
          "communication": Number,
          "check_in": Number,
          "accuracy": Number,
          "location": Number,
          "value": Number
        }
      }
      ...
    ]
```

### GET average scores for room
  * GET `/api/reviews/:roomId/scores`

**Path Parameters:**
  * `roomId` room id

**Success Status Code:** `200`

**Request Body**: Expects JSON with any of the following keys

```json
    {
      "_roomId": Number
    }
```

### Add review
  * POST `/api/reviews/:roomId/`

**Success Status Code:** `201`

**Request Body**: Expects JSON with the following keys.

```json
      {
        "_roomId": Number,
        "_reviewId": {
          "type" : String,
          "unique" : true,
          "required" : true
          },
        "user_name": String,
        "user_image": String,
        "user_url": String,
        "date": Date,
        "text": String,
        "scores": {
          "cleanliness": Number,
          "communication": Number,
          "check_in": Number,
          "accuracy": Number,
          "location": Number,
          "value": Number
        }
      }
```


### Update review info
  * PATCH `/api/reviews/:roomId/:reviewId/`

**Path Parameters:**
  * `roomId` room id
  * `reviewId` review id

**Success Status Code:** `204`

**Request Body**: Expects JSON with any of the following keys (include only keys to be updated)

```json
    {
      "_roomId": Number,
      "_reviewId": {
          "type" : String,
          "unique" : true,
          "required" : true
          },
      "user_name": String,
      "user_image": String,
      "user_url": String,
      "date": Date,
      "text": String,
      "scores": {
        "cleanliness": Number,
        "communication": Number,
        "check_in": Number,
        "accuracy": Number,
        "location": Number,
        "value": Number
      }
    }
```

### Delete review
  * DELETE `/api/reviews/:roomId/:reviewId`

**Path Parameters:**
  * `roomId` room id
  * `reviewId` review id

**Success Status Code:** `204`