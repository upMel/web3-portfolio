## What does this PR do?

<!-- Describe the contract change clearly. What was added, modified, or removed? -->

## Type of change

- [ ] New contract / function
- [ ] Modification to existing contract
- [ ] Bug fix
- [ ] Deploy script change
- [ ] Test only

## Contract checklist

- [ ] `npx hardhat test` passes with no failures
- [ ] New functions have corresponding unit tests
- [ ] No `console.log` left in Solidity files
- [ ] Access control is correct (`onlyOwner` or equivalent where needed)
- [ ] No hardcoded addresses or private keys
- [ ] Events emitted for all state-changing functions
- [ ] Follows checks-effects-interactions pattern (reentrancy safe)
- [ ] ABI changes are reflected in `backend/src/services/contractService.js`

## Gas considerations

<!-- Did this change increase gas cost significantly? If so, why is it justified? -->

## Security notes

<!-- Any security implications? If unsure, write "needs review". -->

## Related issues / PRs

<!-- Closes #issue_number -->
