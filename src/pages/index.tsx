import React, { useState } from "react";
import { trpc } from "src/utils/trpc";

export default function Home() {
  const context = trpc.useContext();

  const query = trpc.test.getData.useQuery();


  const [data, setData] = useState(query.data);

  trpc.test.subData.useSubscription(undefined, {
    onData(data) {
      setData(data);
    },
    onError(error) {
      console.log(error);
    },
  })

  const mutate = trpc.test.setData.useMutation({
    onError() {
      query.refetch();
    },
  });

  const mutateAsync = async () => {
    mutate.mutateAsync({ text: (Math.random()*100).toFixed() + "$" });
  }
  return (
    <div>
      <h1>Hello World</h1>
      <h1>Data: {data}</h1>
      <button onClick={mutateAsync}>Mutate (Change Data)</button>
    </div>
  );
}
