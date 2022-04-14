# Yummi Partner Portal

## Initial

```bash
yarn && yarn dev
```

## Update BDS

```bash
yarn bds
```

## Commit rule

### Template

```
<JIRA_US_ID>: <YOUR_COMMIT_MESSAGE>
```

### Example

```
YS-123: Implement search function on order list
```

### Referennce

https://www.npmjs.com/package/commitlint-config-jira

## Git workflow

1. Create a new branch named by user story's ID on JIRA
2. Do your work, when done push to this branch
3. Create merge request, choose Reviewer is your project leader
4. Inform your project leader to review and merge your work

## Notes

Pull code every morning then run yarn install to make sure everything is fresh
