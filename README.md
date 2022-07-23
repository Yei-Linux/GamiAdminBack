# Scripts

- npm run serve: Need to pass an stage parameter like this:

```
    npm run serve --stage=development
```

- npm run mongo:windows:create-migration-file: Scrip for windows user.Need to pass a filename parameter like this:

```
    npm run mongo:windows:create-migration-file -- filename
    npm run mongo:windows:create-migration-file -- add_tags
```

# Tools:

-Cross-env:
Passing environment variables by parameter with the goal to avoid conflicts across os
-Scripty:
Passing variables by parameter with the goal to use with parameter in our commands.
