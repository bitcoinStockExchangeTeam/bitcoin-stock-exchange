# Installation

To start you need to clone https://github.com/Mrozelek/bitcoin-stock-exchange git repository.

## Requirements

Application requires few tools installed on your system

* nodejs **>12.0.0**
* yarn **>2.0.0**

# Development

Each change in this repository should be made by pull request. At least one approval is required to merge. After merge process every temporary branch should be deleted (except develop branch). Commit messages should contain useful informations about what was done.

Branch types:
 - main/master - last stable version of app
 - develop - incoming changes to the next release, should be merged to main
 - feature - any new code, should be merged into develop, eg. `feature/integration-with-api`
 - bugfix - necessary fixes for non-production code, should be merged into feature or develop branch, eg. `bugfix/login-form-validation`
 - hotfix - necessary fixes for production code, should be merged into main branch, eg. `hotfix/missing-unauthorized-user-redirect`
 - build - changes for build/app setup, eg. `build/new-webpack-plugin`
 