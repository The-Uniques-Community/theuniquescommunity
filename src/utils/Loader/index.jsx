import { Suspense } from "react";

import CustomLoader from "./CustomLoader";

const index = (Component) => (props) =>
  (
    <Suspense fallback={<CustomLoader />}>
      <Component {...props} />
    </Suspense>
  );

export default index;