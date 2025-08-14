# BE_boilerplate

A clean and production-ready NestJS backend boilerplate with TypeORM and PostgreSQL integration.

## Features

- **NestJS Framework**: Modern Node.js framework for building efficient server-side applications
- **TypeORM Integration**: Powerful ORM for TypeScript and JavaScript
- **PostgreSQL Database**: Robust relational database support
- **Environment Configuration**: Secure environment-based configuration
- **Clean Architecture**: Well-structured codebase following NestJS best practices
- **Development Tools**: ESLint, Prettier, and Jest testing setup

## Installation

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- PostgreSQL database

### Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/DadonStyle/BE_boilerplate.git
   cd BE_boilerplate
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and provide your database credentials:
   ```env
   DB_HOST=localhost
   DB_PORT=5432
   DB_USERNAME=your_db_username
   DB_PASSWORD=your_db_password
   DB_NAME=your_database_name
   
   PORT=3000
   NODE_ENV=development
   ```

4. **Create PostgreSQL database**
   
   Create a new PostgreSQL database with the name you specified in `DB_NAME`.

5. **Start the application**
   ```bash
   # Development mode with hot reload
   npm run start:dev
   
   # Production mode
   npm run start:prod
   ```

## File Structure

```
src/
├── entities/           # Database entities
│   └── user.entity.ts  # User entity example
├── app.controller.ts   # Main application controller
├── app.service.ts      # Main application service
├── app.module.ts       # Root application module
└── main.ts            # Application entry point

test/                  # Test files
├── app.e2e-spec.ts   # End-to-end tests
└── jest-e2e.json     # E2E test configuration

Configuration files:
├── .env.example       # Environment variables template
├── .gitignore        # Git ignore rules
├── .eslintrc.js      # ESLint configuration
├── .prettierrc       # Prettier configuration
├── nest-cli.json     # NestJS CLI configuration
├── package.json      # Dependencies and scripts
├── tsconfig.json     # TypeScript configuration
└── tsconfig.build.json # Build-specific TypeScript config
```

## Available Scripts

- `npm run start` - Start the application
- `npm run start:dev` - Start in development mode with hot reload
- `npm run start:debug` - Start in debug mode
- `npm run start:prod` - Start in production mode
- `npm run build` - Build the application
- `npm run format` - Format code with Prettier
- `npm run lint` - Run ESLint
- `npm run test` - Run unit tests
- `npm run test:watch` - Run tests in watch mode
- `npm run test:cov` - Run tests with coverage
- `npm run test:e2e` - Run end-to-end tests

## Development

### Adding New Features

1. **Create a new module**
   ```bash
   nest generate module feature-name
   ```

2. **Create a controller**
   ```bash
   nest generate controller feature-name
   ```

3. **Create a service**
   ```bash
   nest generate service feature-name
   ```

4. **Create an entity**
   ```bash
   nest generate class entities/feature-name.entity --no-spec
   ```

### Database Migrations

TypeORM synchronization is enabled in development mode. For production, consider using migrations:

```bash
# Generate migration
npm run typeorm migration:generate -- -n MigrationName

# Run migrations
npm run typeorm migration:run
```

## API Endpoints

### Health Check
- `GET /` - Returns "Hello World!" (application health check)

### Example User Entity

The boilerplate includes a User entity with the following fields:
- `id`: Primary key (auto-generated)
- `email`: Unique email address
- `firstName`: User's first name
- `lastName`: User's last name
- `isActive`: Account status (default: true)
- `createdAt`: Creation timestamp
- `updatedAt`: Last update timestamp

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `DB_HOST` | Database host | `localhost` |
| `DB_PORT` | Database port | `5432` |
| `DB_USERNAME` | Database username | - |
| `DB_PASSWORD` | Database password | - |
| `DB_NAME` | Database name | - |
| `PORT` | Application port | `3000` |
| `NODE_ENV` | Environment mode | `development` |

## License

This project is [UNLICENSED](LICENSE).