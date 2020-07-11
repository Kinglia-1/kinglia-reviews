## Server API

### TLDR
1. [GET Reviews (initial,all)](#get-initial-reviews-info)
1. [GET average scores](#get-average-scores-for-room)
1. [Add review](#add-review)
1. [Update review info](#update-review-info)
1. [Delete review](#delete-review)
---

### Get initial reviews info
(limited to 6)
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
        "_roomId": "Number",
        "_reviewId": "Unique Number",
        "_userId": "Number",
        "user_name": "String",
        "user_image": "String",
        "user_url": "String",
        "date": "DATE",
        "text": "String",
        "scores": {
          "cleanliness": "Number",
          "communication": "Number",
          "check_in": "Number",
          "accuracy": "Number",
          "location": "Number",
          "value": "Number"
        }
      }
      ...
    ]
```
---

### GET average scores for room
  * GET `/api/reviews/:roomId/scores`

**Path Parameters:**
  * `roomId` room id

**Success Status Code:** `200`
**Error Status Code:** `400`

**Returns:** Number average scores of room

```json
        {
          "cleanliness": "Number",
          "communication": "Number",
          "check_in": "Number",
          "accuracy": "Number",
          "location": "Number",
          "value": "Number"
        }

```
---

### Add review
  * POST `/api/reviews/:roomId/`

**Success Status Code:** `201`

**Request Body**: Expects JSON with the _roomId and _userId keys
text and scores keys are OPTIONAL

```json
      {
        "_roomId": "Number",
        "_userId": "Number",
        "text": "String",
        "scores": {
          "cleanliness": "Number",
          "communication": "Number",
          "check_in": "Number",
          "accuracy": "Number",
          "location": "Number",
          "value": "Number"
        }
      }
```
---


### Update review info
  * PATCH `/api/reviews/:reviewId/`

**Path Parameters:**
  * `reviewId` review id

**Success Status Code:** `204`

**Request Body**: Expects JSON with _reviewId and _roomId key
text and scores keys are OPTIONAL

```json
      {
        "_reviewId": "Unique Number",
        "text": "String",
        "scores": {
          "cleanliness": "Number",
          "communication": "Number",
          "check_in": "Number",
          "accuracy": "Number",
          "location": "Number",
          "value": "Number"
        }
      }
```
---

### Delete review
  * DELETE `/api/reviews/:roomId/:reviewId`

**Path Parameters:**
  * `roomId` room id
  * `reviewId` review id

**Success Status Code:** `204`