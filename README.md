# deploy-yard-to-pages

[![CI](https://github.com/kachick/deploy-yard-to-pages/actions/workflows/validate.yml/badge.svg?branch=main)](https://github.com/kachick/deploy-yard-to-pages/actions/workflows/validate.yml?query=branch%3Amain++)

- _**This repository is archived**_
- _**No longer maintained**_

---

Deploy YARD generated documents to GitHub Pages with composite action

**NOTE**
It performs simple tasks, and exists only as a note about how to deploy.\
[You can avoid to depend this action and manually set up the workflows yourself](https://github.com/kachick/ruby-ulid/commit/a88b4c7a14fdcf119950431abc515e0b34f629e7).

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
    # the deploy environment (not to be confused with env)
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-24.04
    name: Build and deploy YARD
    steps:
      - uses: kachick/deploy-yard-to-pages@v1.4.0
        id: deployment
        # with:
          # # default `doc` as default of `.yardopts`
          # output-dir: 'docs'
          # # default version is 3.3
          # ruby-version: 'head'
```

## Parameters

| name         | default | options                                             |
| ------------ | ------- | --------------------------------------------------- |
| output-dir   | doc     | Your YARD product dir                               |
| ruby-version | 3.3     | See options in <https://github.com/ruby/setup-ruby> |

### Ruby version

| action  | ruby                               |
| ------- | ---------------------------------- |
| v1.2.0+ | Specify with `ruby-version` option |
| v1.1.0  | 3.2                                |
| v1.0.0  | 3.1                                |

Since v1.2.0, we can specify the version. However .ruby-version is still ignored for now.

## Example

Deployed example is [here](https://kachick.github.io/deploy-yard-to-pages/). It has been generated from [example of this repo](lib/foobar.rb).
