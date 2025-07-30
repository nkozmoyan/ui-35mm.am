# Authentication API Endpoints

## `POST /login`
Request body:
```json
{ "email": "user@example.com", "password": "secret" }
```
Response:
```json
{ "token": "<jwt>", "user": { /* user fields */ } }
```

## `HEAD /users/:username`
Checks if a username is available. A `404` status means the username is free.

## `POST /users`
Request body:
```json
{ "name": "John Doe", "username": "jdoe", "email": "user@example.com", "password": "secret" }
```
Creates a new user account.

## `POST /password/forgot`
Request body:
```json
{ "emailOrUsername": "user@example.com" }
```
Sends a password reset link to the user's email.

## `POST /password/reset`
Request body:
```json
{ "token": "<reset token>", "password": "newSecret" }
```
Resets the user's password using the provided token.

Include the header `Authorization: Bearer <token>` for requests requiring authentication.
