# Build and release workflow

```mermaid
flowchart LR
    A[Source and public artwork] --> B[Push or pull request]
    B --> C[GitHub Actions: audit and code check]
    B -->|release| D[Cloudflare deployment]
    D --> E[Audit, tests and static export]
    E --> F[Worker + Static Assets]
    F --> G[Portfolio visitor]
    G -->|optional contact form| H[Validated Worker endpoint]
    H --> I[Private Cloudflare D1 database]
    H --> J[Resend email API]
    J --> K[Private recipient inbox]
```

Source control contains only code, documentation and intentionally public images. Generated output, local deployment state, environment files and private data are ignored by Git.
