# @bugpilot/next

Bugpilot bindings for Next.js.

Read more at [Bugpilot.io](https://bugpilot.io)

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
    // example call to identify, this can be called anywhere in your app to update the user's info as soon as it's available

    identify(user);
  }, [user.name]);

  const handleClick = useCallback(() => {
    saveBugReport();
  }, []);

  return (
    <Bugpilot workspaceId="your-bugpilot-workspace-id" user={user}>
      <div>
        {/* your app  here */}

        <button onClick={handleClick}>Report a Bug</button>
      </div>
    </Bugpilot>
  );
}
```

## License

MIT
