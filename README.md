# deploy-yard-to-pages

[![CI](https://github.com/kachick/deploy-yard-to-pages/actions/workflows/validate.yml/badge.svg?branch=main)](https://github.com/kachick/deploy-yard-to-pages/actions/workflows/validate.yml?query=branch%3Amain++)

Deploy YARD generated documents to GitHub Pages with composite action

# Usage

For example of `.github/workflows/pages.yml`

```yaml
name: Deploy API docs to GitHub Pages
on:
  push:
    branches: ['main']
    paths:
      - '.github/workflows/pages.yml'
      - '.yardopts'
      - 'lib/**'
      - '**.gemspec'
      - 'Gemfile'
      - '**.md'
      - '**.txt'
    # Allows you to run this workflow manually from the Actions tab
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

# Allow one concurrent deployment
concurrency:
  group: 'pages'
  cancel-in-progress: true

jobs:
  deploy_yard:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    name: Build and deploy YARD
    steps:
      - uses: kachick/deploy-yard-to-pages@v1.1.0
        # with:
          # # default `doc` as default of `.yardopts`
          # output-dir: 'docs'
```

## Ruby version

| action | ruby  |
| ------ | ----- |
| v1.1.0 | 3.2.0 |
| v1.0.0 | 3.1.0 |

Planning to be able to specify the ruby-version

## Example

Deployed example is [here](https://kachick.github.io/deploy-yard-to-pages/). It has been generated from [example of this repo](lib/foobar.rb).
