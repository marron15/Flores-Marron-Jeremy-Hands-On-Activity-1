# Prisma ORM Activity 1

This project implements a database using Prisma ORM with Account, Profile, and Modules models.

## Project Structure

- `prisma/schema.prisma`: Defines the database schema
- `main.ts`: Implements the required actions

## Relationships

- One-to-One: Account to Profile
- One-to-Many: Account to Modules

## Setup

1. Install dependencies:
   ```
   npm install
   ```

2. Configure the database:
   - Ensure MySQL is running
   - Make sure the database connection in `.env` is correct

3. Apply database migrations:
   ```
   npx prisma migrate dev --name init
   ```

4. Run the application:
   ```
   npx tsx main.ts
   ```

## Features

1. Create an Account with a Profile simultaneously
2. Add Modules to an existing Account
3. Fetch Accounts with their associated Profiles and Modules