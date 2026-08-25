# Build and release workflow

```mermaid
flowchart LR
    A[Source and public artwork] --> B[Push or pull request]
    B --> C[GitHub Actions: audit and code check]
    B -->|main| D[Netlify automatic build]
    D --> E[Audit, code check and static export]
    E --> F[Production deployment]
    F --> G[Portfolio visitor]
    G -->|optional contact form| H[Netlify Forms]
    H --> I[Private Netlify dashboard]
```

Source control contains only code, documentation and intentionally public images. Generated output, local deployment state, environment files and private data are ignored by Git.
