import 'reflect-metadata'
import {Repository} from '../resources/repository'
import {RepositoryBranchProtectionRule} from '../resources/repository-branch-protection-rule'
import {globToRegex} from '../utils'
import {doNotEnforceAdmins} from './do-not-enforce-admins'
import {addFileToAllRepos} from './shared/add-file-to-all-repos'
import {format} from './shared/format'

const uninitialisedRepositoryNames = [
  '2022.ipfs.camp',
  'go-data-transfer-bus',
  'lightning-storm',
  'helia-ipns'
]

addFileToAllRepos(
  '.github/workflows/stale.yml',
  '.github/workflows/stale.yml',
  (repository: Repository) =>
    !uninitialisedRepositoryNames.includes(repository.name)
)
doNotEnforceAdmins(
  (repository: Repository, rule: RepositoryBranchProtectionRule) =>
    repository.default_branch !== undefined &&
    globToRegex(rule.pattern).test(repository.default_branch)
)
format()
