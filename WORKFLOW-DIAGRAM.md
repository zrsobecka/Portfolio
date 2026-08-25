# Build and release workflow

```mermaid
flowchart LR
    A[Source and public artwork] --> B[npm run check]
    B --> C[Next.js static export]
    C --> D[out directory]
    D --> E[Netlify deployment]
    E --> F[Portfolio visitor]
    F -->|optional contact form| G[Netlify Forms]
    G --> H[Private Netlify dashboard]
```

Source control contains only code, documentation and intentionally public images. Generated output, local deployment state, environment files and private data are ignored by Git.
