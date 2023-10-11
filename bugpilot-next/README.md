# @bugpilot/next

Bugpilot bindings for Next.js.
A Bugpilot account is required. Read more [Bugpilot.io](https://bugpilot.io) or [signup for a free account](https://dash.bugpilot.io/signup).

## Installation

```bash
npm i --save @bugpilot/next
pnpm i @bugpilot/next
yarn add @bugpilot/next
```

## Example Usage

```jsx

import { useEffect, useCallback } from "react";
import { Bugpilot, useBugpilot } from "@bugpilot/next";

const App = () => {
  const { saveBugReport, identify } = useBugpilot();

  const user = {
    id: "123",
    email: "jane@bugpilot.io",
    name: ""
  };

  useEffect(() => {
    // example call to identify, this can be called anywhere in your app
    // to update the user's info as soon as it's available or it changes.
    identify(user);
  }, [user.name]);

  const handleClick = useCallback(() => {
    saveBugReport();
  }, []);

  return (
    <Bugpilot
      // Workspace Id (from your Bugpilot Dashboard)
      workspaceId="00000000-0000-0000-0000-000000000000"
      // Optional: user info (you can call identify() anywhere in your app to update this)
      user={user}
      // Optional: pass false to disable Bugpilot (e.g., in staging environments)
      enabled={true}
    >
        {/* Your app code here; Bugpilot will record any unhandled error
            and generate a detailed bug report. Bug reports will be made
            available in your Bugpilot Dashboard under New Issues > Recommended */}

        {/* Optional: add an optional component for users to manually report bugs */}
        <button onClick={handleClick}>Report a Bug</button>
    </Bugpilot>
  );
}
```

## Provider Props

| Prop        | Type    | Required | Description                                                                 |
| ----------- | ------- | -------- | --------------------------------------------------------------------------- |
| workspaceId | string  | true     | Your Bugpilot workspace id.                                                 |
| user        | object  | true     | The user object to be sent to Bugpilot.                                     |
| enabled     | boolean | false    | Whether or not to enable Bugpilot. Defaults to true.                        |

**Note:** The `user` object must have an `id` and `email` property. You can update the user's info by calling the `identify` function from the `useBugpilot()` hook.

## License

MIT
