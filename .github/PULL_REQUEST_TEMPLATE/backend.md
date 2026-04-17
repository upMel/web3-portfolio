## What does this PR do?

<!-- Describe the backend change clearly. What endpoint, service, or config was changed? -->

## Type of change

- [ ] New API endpoint
- [ ] Modification to existing endpoint
- [ ] Bug fix
- [ ] Contract service update (ethers.js / ABI change)
- [ ] Config / dependency update

## Backend checklist

- [ ] `npm run dev` starts without errors
- [ ] New endpoints are tested manually (or via a tool like Postman / curl)
- [ ] Input validation is in place for all new route params
- [ ] No secrets or API keys hardcoded — using `.env` variables
- [ ] CORS is correctly configured for new routes
- [ ] Error responses use consistent format `{ error: "message" }`
- [ ] If ABI changed: `contractService.js` updated to match new contract interface

## Endpoints affected

<!-- List any new or changed API routes -->
| Method | Route | Change |
|---|---|---|
| | | |

## Related issues / PRs

<!-- Closes #issue_number -->
