# my-new-action

[![Test & Lint](https://github.com/kachick/my-new-action/actions/workflows/ci.yml/badge.svg?branch=main)](https://github.com/kachick/my-new-action/actions/workflows/ci.yml?query=branch%3Amaster++)

There is a sin of omission as well as of commission.

<img src="./assets/actual-log-v1.1.1-passed.png?raw=true" alt="Example of actual log" width=700>

# Usage

Just requires `github-token` for minimum configuration.\
I recommend to use `timeout-minutes` together with as easy fool proof.

```yaml
jobs:
  with-waiting:
    runs-on: ubuntu-latest
    steps:
      - name: Wait other jobs are passed or failed
        uses: kachick/my-new-action@v1
        timeout-minutes: 15
        with:
          github-token: "${{ secrets.GITHUB_TOKEN }}"
```

You can adjust as below.

```yaml
with:
  github-token: "${{ secrets.GITHUB_TOKEN }}"
  early-exit: 'false' # default 'true'
```

Below is a typical usecase. Assume test jobs defined in another workflow.

```yaml
name: Auto merge dependabot PRs if passed other jobs
on: pull_request

permissions:
  contents: write
  pull-requests: write
  # checks: read # For private repositories
  # actions: read # For private repositories

jobs:
  example-of-my-new-action:
    runs-on: ubuntu-latest
    if: ${{ github.actor == 'dependabot[bot]' }}
    steps:
      - uses: actions/checkout@v3
      - uses: kachick/my-new-action@v1
        timeout-minutes: 15
        with:
          github-token: "${{ secrets.GITHUB_TOKEN }}"
```

# License

The scripts and documentation in this project are released under the [MIT License](LICENSE)

# NOTE - Motivation to create own template

[actions/typescript-action](https://github.com/actions/typescript-action) is an official template. However looks not frequency updated.
