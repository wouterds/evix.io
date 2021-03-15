# @evix/web

![code-review](https://github.com/evixio/web/workflows/code-review/badge.svg?branch=main)
![build](https://github.com/evixio/web/workflows/build/badge.svg?branch=main)
![production](https://github.com/evixio/web/workflows/production/badge.svg?branch=main)

## Development

```bash
# switch node version
nvm install

# install dependencies
yarn

# create env defaults
cp .env.example .env

# start development environment
yarn dev
```

### VSCode

#### Plugins

- https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint
- https://marketplace.visualstudio.com/items?itemName=stylelint.vscode-stylelint
- https://marketplace.visualstudio.com/items?itemName=cpylua.language-postcss

#### Workspace settings

```javascript
{
  "eslint.validate": [
    "javascript",
    "javascriptreact",
    "typescript",
    "typescriptreact",
    "json",
  ],
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true,
    "source.fixAll.stylelint": true,
  },
  "files.associations": {
    "*.css": "postcss",
  },
}
```
