import { useRouteError } from "react-router-dom";

export default function Error() {
  const error = useRouteError();
  return (
    <div>
      <h2>{error.message}</h2>
      <h2>{error.status}</h2>
    </div>
  );
}
