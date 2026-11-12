# Coding standard — NestJS (api)

> **Starter version.** The project's Tech Lead copies it, adapts it to the real versions and
> conventions, and declares its path in `apps[].standard` in `.claude/project.yml`.

## Structure

- One module per feature: `src/modules/<feature>/{<feature>.module.ts, .controller.ts, .service.ts, dto/, entities/}`.
- **Controllers only handle HTTP** (take the request, call the service, return the response). Business logic lives in services.
- Data access through Prisma in services or repositories; never call Prisma from a controller.

## DTOs, validation, documentation

- Every input has a DTO with `class-validator`; enable a global `ValidationPipe` with `whitelist: true`
  and `forbidNonWhitelisted: true`.
- DTOs carry Swagger decorators (`@ApiProperty`); every endpoint has `@ApiOperation` and a response type.
- Types shared with web/admin live in the shared contract (`packages/shared`), never defined twice.

## Errors

- Errors are normalised by a shared exception filter: `{ statusCode, error, message, details? }`.
- Use Nest exceptions (`NotFoundException`, `ForbiddenException`...) with the right HTTP status; never
  return 200 with `success: false`.
- Never expose stack traces, SQL or internal data in production responses.

## Backward compatibility (mandatory)

- Older mobile apps keep calling the new API for weeks. **Never remove, rename or retype** a response
  field that an older app (per `mobile.supported_app_versions`) still uses.
- Adding fields is safe. Breaking changes get a versioned endpoint (`/v2/...`) and the old one stays.
- New request fields need defaults, because older apps do not send them.

## Data and performance

- Lists are always paginated (`limit` with an upper bound, `cursor` or `page`).
- No queries inside loops; use `include`/`select` or a combined query.
- Prisma migrations are safe to re-run; never drop a column the old code still reads in the same release.
- Multi-step writes use a transaction.

## Security

- Authentication and authorisation guards on every non-public endpoint; check resource ownership (user
  A cannot read B's data by changing an id).
- Never log passwords, tokens or personal data.
- Secrets through environment variables and the config module; never hard-coded.

## Tests

- Unit tests for services (mock Prisma and external dependencies).
- e2e/integration tests for important endpoints (status code, response shape, authorisation).
- Bugs: a reproducing test that is red before the fix.
