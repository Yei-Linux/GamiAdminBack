# Scripts

- npm run serve: Need to pass an stage parameter like this:

```
    npm run serve --stage=development
    npm run serve --stage=production
    npm run serve --stage=test
```

- npm run mongo:windows:create-migration-file: Script for windows user.Need to pass a filename parameter like this:

```
    npm run mongo:windows:create-migration-file -- filename
    npm run mongo:windows:create-migration-file -- create_tags
```

- npm run mongo:windows:run-migration-file: Script for windows user

```
    npm run mongo:windows:run-migration-file
    npm run mongo:windows:run-migration-file
```

# Tools:

- Cross-env: Passing environment variables by parameter with the goal to avoid conflicts across os
- Scripty: Passing variables by parameter with the goal to use with parameter in our commands.
