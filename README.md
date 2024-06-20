# react-use-fake-progress

Inspired by fake-progress, but using fake-progress in React requires retrieving progress values in real-time, I simplified the operation process by directly obtaining the progress value through React Hooks.

> **Note**: Please use a version higher than `React 16.8` which support react hook feature

## Installation

```sh
npm i react-use-fake-progress --save
```

Recommend you use `pnpm`:

```sh
pnpm add react-use-fake-progress
```

## Usage

- Request api and get fake progress from react-use-fake-progress

  ```javascript
  import { useFakeProgress } from "react-use-fake-progress";
  import { axios } from "axios";

  const App = () => {
    const [progress, start, done, stop] = useFakeProgress(
      3000 /* timeconstant value */
    );

    const asyncAction = () => {
      start();
      axios
        .get("/user?ID=12345")
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
          stop();
        })
        .finally(function () {
          done();
        });
    };

    return (
      <div className="App">
        {progress}
        <button onClick={asyncAction}>trigger async action</button>
      </div>
    );
  };

  export default App;
  ```
