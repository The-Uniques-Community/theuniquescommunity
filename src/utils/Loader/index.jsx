import { Suspense } from "react";

import CustomLoader from "./customLoader";

const index = (Component) => (props) =>
  (
    <Suspense fallback={<CustomLoader />}>
      <Component {...props} />
    </Suspense>
  );

export default index;